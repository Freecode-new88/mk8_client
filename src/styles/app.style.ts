import { SxProps, Theme } from "@mui/material";
import bg from '../assets/img/bg2.webp';

// Define the boxStyles type
export const boxStyles: SxProps<Theme> = {
  position: "relative",
  background: `url(${bg})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "100vh",
  width: "100vw",
  overflow: "hidden",

  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
    animation: "shine 6s linear infinite",
  },

  "@keyframes shine": {
    "0%": { transform: "translate(-50%, -50%)" },
    "50%": { transform: "translate(0%, 0%)" },
    "100%": { transform: "translate(-50%, -50%)" },
  },
};



export const buttonStyles: SxProps<Theme> = {
  zIndex: 1000,
  display: { xs: 'none', sm: 'none', md: 'block' },
  position: 'absolute',
  top: { xs: 20, sm: 30, md: 50 },
  right: { xs: 20, sm: 30, md: 50 },
  // NEW88-like gradient (FF8B00 → FF4237)
  background: 'linear-gradient(270deg, #f9c924 0%, #fdeeb9 100%)',
  color: '#FFFFFF',
  fontSize: { xs: '14px', sm: '16px', md: '20px' },
  fontWeight: 'bold',
  textTransform: 'none',
  padding: { xs: '10px 20px', sm: '12px 30px', md: '15px 40px' },
  border: 'none',
  borderRadius: 2,
  cursor: 'pointer',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  textAlign: 'center',
  '&:hover': {
    // slightly brighter/orange-forward hover (FF9E00 → FF521A)
    background: 'linear-gradient(270deg, #fdeeb9 0%, #f9c924 100%)',
    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.25)',
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.25)',
  },
  '&:focus-visible': {
    outline: '3px solid rgba(255, 139, 0, 0.4)', // #FF8B00 focus ring
    outlineOffset: 2,
  },
};

export const readStyles: SxProps<Theme> = {
  color: "#ffffff",
  background: '#38415480',
  borderColor: '#FF8B00',
  fontSize: { xs: 14, sm: 14, md: 13 } ,
  display: 'flex', // Ensures button contents are flexible
  justifyContent: 'space-between', // Centers text horizontally
  alignItems: 'center', // Centers icon and text vertically
  gap: '10px', // Creates space between text and icon
}