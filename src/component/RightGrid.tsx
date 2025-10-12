import { Box, Grid2, Typography, TextField, Button, useMediaQuery } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import NEW88_3 from '../assets/MK8.png';
import { ArrowCircleRight, LocalOfferOutlined } from '@mui/icons-material';
import { readStyles } from '../styles/app.style';
import { getcaptcha } from '../service/captcha.api';
import Swal from 'sweetalert2';
import { getCodeClient } from '../service/client.api';
import { CodeModel } from '../model/code.model';

export interface RightGridProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCodeGet: React.Dispatch<React.SetStateAction<CodeModel | null>>
  setCode: React.Dispatch<React.SetStateAction<string>>
  code: string
  keyboardActive: boolean;
  setKeyboardActive: React.Dispatch<React.SetStateAction<boolean>>
}


const RightGrid: FC<RightGridProps> = ({ setOpen, setCodeGet, code, setCode, setKeyboardActive }) => {
  const isIPhoneSE = useMediaQuery('(max-height: 740px)');

  const [errMass, seterrMass] = useState<String>("")

  //console.log("isIPhoneSE", isIPhoneSE);

  const handleCheckCode = async () => {
    if (!code) {
      return seterrMass("กรุณากรอกรหัสโปรโมชั่น")
    } else {
      const res = await getcaptcha();
      if (res.valid) {
        seterrMass("")
        // Daolog input captcha
        // Show SweetAlert2 dialog for captcha input
        const { value: userCaptcha, isConfirmed } = await Swal.fire({
          title: "การตรวจสอบ Captcha",
          html: `
            <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
              <img 
                id="refresh-captcha" 
                src="${res?.captchaUrl}" 
                alt="captcha" 
                style="margin-bottom: 10px; cursor: pointer;" 
              />
              <input
                id="captcha-input"
                type="text"
                placeholder="กรอกรหัส captcha"
                style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"
              />
              <input
                value="${res?.token}"
                id="captcha-token"
                type="hidden"
              />
            </div>
          `,
          confirmButtonText: "ยืนยัน",
          showCancelButton: true,
          cancelButtonText: "ยกเลิก",
          focusConfirm: false,
          confirmButtonColor: "#F9C924",   // 🔥 MK8 fold
          cancelButtonColor: "#010202ff",   // เทา
          preConfirm: () => {
            const captchaInput = (document.getElementById("captcha-input") as HTMLInputElement)?.value.trim();
            if (!captchaInput) {
              Swal.showValidationMessage("กรุณากรอก captcha");
              return false;
            }
            const token = (document.getElementById("captcha-token") as HTMLInputElement)?.value.trim();
            return { captchaCode: captchaInput, token: token };
          },
          didOpen: () => {
            // Add click event to refresh captcha image
            const captchaImage = document.getElementById("refresh-captcha");
            if (captchaImage) {
              captchaImage.addEventListener("click", async () => {
                const res = await getcaptcha(); // Fetch new captcha
                if (res.valid) {
                  // Update captcha image and token
                  captchaImage.setAttribute("src", res?.captchaUrl ?? "");
                  (document.getElementById("captcha-token") as HTMLInputElement).value = res?.token ?? "";
                }
              });
            }
          },
        });
        // Handle the user's input
        //console.log(isConfirmed, code, userCaptcha);

        if (isConfirmed && userCaptcha) {
          try {
            // Verify the captcha and get code 
            //setOpen(true)
            const getCode = await getCodeClient(code, userCaptcha)
            //console.log(getCode);
            if (getCode.valid) {
              setCodeGet(getCode.detail as CodeModel)
              setOpen(true)
            } else {
              setCode("")
              // show Swal.fire err 
              // ❌ show error
              await Swal.fire({
                icon: "error",
                title: "การตรวจสอบล้มเหลว",
                text: getCode?.message || "Captcha ไม่ถูกต้อง หรือโค้ดไม่ถูกต้อง",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#F9C924", // mk8 color
              });
            }
          } catch (error) {
            setCode("")
          }
          finally { }
        }
      }
    }
  }
  useEffect(() => {
    if (code) {
      seterrMass("")
    }
  }, [code])

  return (
    <>
      <Grid2
        size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }} // Adjust grid size across all breakpoints
        sx={{
          order: { xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }, // Order for xs, sm, md, lg, xl
          height: { xs: '50%', sm: '50%', md: '50%', lg: '100%', xl: '100%' }, // Adjust height for different screen sizes
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.0)', // Transparent background
        }}
      >
        <Box sx={{
          mt: { xs: 5, sm: 2, md: 10 },  // Margin-top for mobile (xs), iPad/tablet (sm), and PC (md)
          p: { xs: 0, sm: 0, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',

        }}>
          <Box component={'img'} draggable={false} src={NEW88_3} sx={{ width: { xs: isIPhoneSE ? '50%' : '60%', sm: isIPhoneSE ? '30%' : '60%', md: '50%' } }} />
          <Box sx={{
            mt: { xs: 5, sm: 3, md: 5 },
            p: 2,
            pt: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: "#FFFFFF",
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: "85%", sm: "60%", md: "70%", }
          }}>
            {/* Title */}
            <Typography variant="h4" sx={{
              pt: 0,
              fontWeight: 'bold',
              backgroundColor: 'rgba(84, 56, 56, 0.3)',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
              <Box sx={{ p: { xs: 2, sm: 2, md: 1, }, fontSize: { xs: isIPhoneSE ? 14 : 18, sm: isIPhoneSE ? 14 : 18, md: '30px', } }}>กรอกโค้ดโปรโมชั่น</Box>

            </Typography>

            {/* Form */}
            <Box
              component="form"
              sx={{
                width: { xs: '90%', sm: '90%', md: '95%' },
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                mt: 2,
                mb: isIPhoneSE ? 3 : 5
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#F9C924' }}>
                <LocalOfferOutlined sx={{ color: '##c7a11b' }} />
                <Box sx={{ ml: 1, color: '#c7a11b', fontWeight: 'bold' }}>
                  โค้ดโปรโมชั่น
                </Box>
              </Box>

              {/* Input Field */}
              <TextField
                size={isIPhoneSE ? 'small' : 'medium'}
                value={code}
                helperText={errMass}
                required
                onChange={(value) => setCode(value.target.value)}
                variant="outlined"
                slotProps={{
                  formHelperText: {
                    sx: {
                      color: "red", // Customize the helper text color
                      fontSize: "0.875rem", // Optional: Adjust the font size
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '5px',
                    border: '1px solid #FFFFFF4D', // Semi-transparent white border
                    '&:hover fieldset': {
                      borderColor: '#FFFFFF', // Optional hover effect for border
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#F9C924', // Gold border when focused
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#c7a11b', // Input value color (white)
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#FFFFFF4D', // Gray placeholder color
                    opacity: 1, // Ensure the color is fully visible
                  },
                  '& .MuiInputBase-input::input': {
                    color: '#FFFFFF4D', // Gray placeholder color
                    opacity: 1, // Ensure the color is fully visible
                  },
                }}
                fullWidth
              />
              {/* Check Button */}
              <Button
                onClick={handleCheckCode}
                size="small"
                variant="contained"
                sx={{
                  background: `linear-gradient(270deg, #F9C924 0%, #FF4237 100%)`, // MK8 gradient
                  border: 1,
                  color: '#fff',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  fontSize: { xs: isIPhoneSE ? 12 : 15, sm: isIPhoneSE ? 13 : 15, md: 18 },
                  '&:hover': {
                    background: `linear-gradient(270deg, #FF4237 0%, #F9C924 100%)`, // reversed for hover
                  },
                }}
                fullWidth
              >
                ตรวจสอบโค้ด
              </Button>
              {/* Details Button */}
              <Box
                sx={{
                  display: { xs: 'block', sm: 'block', md: 'flex' }, // Flex on medium screens and above
                  gap: { xs: '15px', sm: '15px', md: '10px 10px' }, // Gap between buttons
                }}
              >
                {/* <Button

                  variant="outlined"
                  sx={{ ...readStyles, mb: 1 }}
                  fullWidth
                  endIcon={<ArrowCircleRight sx={{ color: '#FF8B00' }} />}
                >
                  รายละเอียดโปรโมชั่น
                </Button> */}

                <Button
                  variant="outlined"
                  sx={{ 
                    ...readStyles, 
                    mb: 1,
                    background: `linear-gradient(270deg, #FF4237 0%, #F9C924 100%)`,
                    color: `black`
                  }}
                  fullWidth
                  endIcon={<ArrowCircleRight sx={{ color: '#F9C924' }} />}
                >
                  เข้าร่วมกลุ่มรับโปรโมชั่น
                </Button>
              </Box>

            </Box>
          </Box>
        </Box>
      </Grid2>
    </>
  );
};



export default RightGrid;
