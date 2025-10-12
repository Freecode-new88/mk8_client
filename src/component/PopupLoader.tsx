// component/PopupLoader.tsx
import { Box } from "@mui/material";
import { RotateLoader } from "react-spinners";

interface PopupLoaderProps {
  open: boolean;
}

const PopupLoader = ({ open }: PopupLoaderProps) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.0)",
        zIndex: 2000,
      }}
    >
      <RotateLoader color="#ff8000" />
    </Box>
  );
};

export default PopupLoader;