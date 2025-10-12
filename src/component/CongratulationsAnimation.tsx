
import { Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import CelebrationIcon from "@mui/icons-material/Celebration";

const CongratulationsAnimation = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="linear-gradient(to bottom, #6dd5fa, #ffffff)"
      sx={{ overflow: "hidden" }}
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <CelebrationIcon
          sx={{ fontSize: 100, color: "#FFD700", mb: 2 }}
        />
      </motion.div>

      {/* Animated Text */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ color: "#1D3557", fontWeight: "bold" }}
        >
          ขอแสดงความยินดี!
        </Typography>
      </motion.div>

      {/* Subtext */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "#457B9D", mt: 2 }}
        >
          คุณทำสำเร็จแล้ว!
        </Typography>
      </motion.div>

      {/* Button with Animation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
      >
        <Button
          variant="contained"
          sx={{ mt: 4, bgcolor: "#A8DADC", color: "#1D3557", fontWeight: "bold" }}
        >
          กลับสู่หน้าแรก
        </Button>
      </motion.div>
    </Box>
  );
};

export default CongratulationsAnimation;
