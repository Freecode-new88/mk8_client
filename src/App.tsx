import './App.css';
import { useEffect, useState } from 'react';
import { Box, Button, Grid2 } from '@mui/material';
import confetti from "canvas-confetti"
import { boxStyles, buttonStyles } from './styles/app.style';
import LeftGrid from './component/LeftGrid';
import RightGrid from './component/RightGrid';
import MobileButton from './component/mobileButton';
import PromoCodeDialog from './component/PromoCodeDialog';
import { CodeModel } from './model/code.model';
import { showSuccessDialog } from './component/SuccessDialog';
import { addCodeClient } from './service/client.api';
import ParticleCanvas from './component/ParticleCanvas';
import { homeLink } from './configs/url.config';
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import PopupLoader from './component/PopupLoader';


function App() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeGet, setCodeGet] = useState<CodeModel | null>(null)
  const [user, setUser] = useState("")
  const [code, setCode] = useState<string>("")
  const [fp, setFp] = useState<string>("");
  const [keyboardActive, setKeyboardActive] = useState(false);

  useEffect(() => {
    FingerprintJS.load()
      .then(fpAgent => fpAgent.get())
      .then(result => {
        setFp(result.visitorId);
      });
  }, []);

  const handleConfirm = async (_point: number) => {
    try {
      setLoading(true)
      setOpen(false);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await addCodeClient(codeGet?.promo_code, user, fp)
      if (res?.success) {
        setLoading(false)
        showSuccessDialog({ setOpen, point: _point.toString() });
        setCodeGet(null)
        setCode("")
        setUser("")
        handleConfetti()
      }
    } finally {
      setOpen(false);
    }
  };
  const handleConfetti = () => {
    const duration = 5 * 1000; // 5 วินาที
    const animationEnd = Date.now() + duration;

    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const playSound = () => {
      const audio = new Audio("/sounds/confetti-pop.mp3");
      audio.currentTime = 0;
      audio.play();
    };

    let timeLeft = 0;
    const interval = window.setInterval(() => {
      timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 100 * (timeLeft / duration);

      // ยิงฝั่งซ้ายทันที
      playSound();
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });

      // ยิงฝั่งขวาดีเลย์ 1000ms
      setTimeout(() => {
        playSound();
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 1300);
    },  1000); // ยิงรอบใหม่ทุก 900ms
  };
  return (
    <>
      {/* Box 
      {openSuccess && <Box sx={{ display: "flex", justifyContent: "space-between", zIndex: 1000 }}>
        <ConfettiExplosion duration={10000} zIndex={1000} onComplete={() => setOpenSuccess(false)} />
        <ConfettiExplosion duration={10000} zIndex={1000} onComplete={() => { }} />
        <ConfettiExplosion duration={10000} zIndex={1000} onComplete={() => { }} />
      </Box>
      }*/}
      <Box sx={boxStyles}>
        {/* Particle Background */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none", // ให้คลิกทะลุได้
          }}
        >
          <ParticleCanvas />
        </Box>

        {/* Foreground Content */}
        <Button onClick={() => window.open(homeLink, "_blank")} variant="contained" sx={{ ...buttonStyles, zIndex: 1000 }}>
          หน้าหลัก
        </Button>

        <Box onClick={() => window.open(homeLink, "_blank")} sx={{ display: { xs: "contents", sm: "contents", md: "none" }, zIndex: 1 }}>
          <MobileButton />
        </Box>

        <Grid2
          container
          spacing={2}
          sx={{
            zIndex: 1,
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
          }}
        >
          <LeftGrid keyboardActive={keyboardActive} />
          <RightGrid
            setOpen={setOpen}
            setCodeGet={setCodeGet}
            code={code}
            setCode={setCode}
            keyboardActive={keyboardActive}
            setKeyboardActive={setKeyboardActive}
          />
        </Grid2>
      </Box>

      <Box>
        <PromoCodeDialog opent={open && codeGet !== null} setOpen={setOpen} codeGet={codeGet} setUser={setUser} handleConfirm={handleConfirm} user={user} />
        {/* <showSuccessDialog opent={openSuccess} setOpen={setOpenSuccess} point={"100"} /> */}
      </Box>
      <PopupLoader open={loading} />
    </>
  );
}

export default App;
