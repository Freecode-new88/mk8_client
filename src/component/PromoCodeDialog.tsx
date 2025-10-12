import { FC, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField, } from '@mui/material';
import CheckMarkIcon from './icon/CheckMarkIcon';
import { CodeModel } from '../model/code.model';



export interface PromoCodeProps {
  opent: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  codeGet: CodeModel | null;
  setUser: React.Dispatch<React.SetStateAction<string>>
  handleConfirm: (point: number) => void;
  user: string
}

const PromoCodeDialog: FC<PromoCodeProps> = ({ opent, setOpen, codeGet, setUser, handleConfirm, user }) => {
  const [error, setError] = useState(false);
  const [loding, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false); // Close dialog when clicked outside or on cancel
  };

  return (
    <Dialog open={opent} onClose={handleClose} maxWidth="xs" fullWidth sx={{
      '& .MuiPaper-root': {
        borderRadius: 2,
      },
    }}>
      <DialogTitle
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CheckMarkIcon />
        <Typography variant="h6" sx={{ mt: 1 }}>
          โค้ดโปรโมชั่นสามารถใช้ได้
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: { xs: 0, sm: 0, md: 2 }
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography >โค้ดโปรโมชั่น:</Typography>
            <Typography fontWeight="bold">{codeGet?.promo_code}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography >รางวัล:</Typography>
            <Typography fontWeight="bold" color="success.main">
              {`${codeGet?.min_point} ~ ${codeGet?.max_point} `} คะแนน
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography >ระยะเวลาหมดอายุ:</Typography>
            <Typography >{new Date(codeGet?.time ?? "").toLocaleString()}</Typography>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            กรุณากรอกยูสเซอร์เพื่อรับรางวัล
          </Typography>
          <TextField
            placeholder="ใส่ยูสเซอร์"
            label="ยูสเซอร์"
            variant="outlined"
            size="small"
            slotProps={{
              formHelperText: {
                sx: {
                  color: error ? "red" : "green", // ปรับสีที่นี่
                },
              },
            }}
            helperText={error ? "กรุณากรอกยูสเซอร์" : ""}
            onChange={(e) => {
              setUser(e.target.value);
              if (e.target.value.trim() !== "") {
                setError(false); // reset error ถ้ามีการพิมพ์
              }
            }}
            sx={{
              borderRadius: '4px',
            }}
            fullWidth
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', px: 3, gap: 10 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ px: 3, background: `#A7A7A7`, color: 'white' }}>
              ยกเลิก
            </Button>
            <Button
              onClick={() => {
                if (!user || user.trim() === "") {
                  setError(true); // ❌ show error
                  return;
                }
                setLoading(true)
                setTimeout(() => {
                  handleConfirm(codeGet?.point ?? 0);
                  setLoading(false)
                }, 2000);
              }}
              loading={loding}
              variant="contained"
              sx={{
                px: 3,
                background: "linear-gradient(270deg, #ff7f00 0%, #ff9900 100%)",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(270deg, #e66d00 0%, #ff8000 100%)",
                },
              }}
            >
              ยืนยัน
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', px: 3, borderTop: '1px solid #D9D9D9' }}>
        <Box p={1} color={'#BA3D1F'} >ติดต่อฝ่ายบริการลูกค้า 24/7</Box>
      </DialogActions>
    </Dialog>

  );
};


export default PromoCodeDialog;
