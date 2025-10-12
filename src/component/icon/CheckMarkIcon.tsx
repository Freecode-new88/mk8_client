
import { Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'; // Check icon

const CheckMarkIcon = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100, // Circle size
        height: 100,
        backgroundColor: 'rgba(144, 238, 144, 0.5)', // Light green background
        borderRadius: '50%', // Makes the background circular
        border: '2px solidrgb(255, 255, 255)', // Border for the circle
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 50, // Circle size
          height: 50,
          backgroundColor: 'rgba(144, 238, 144, 0.5)', // Light green background
          borderRadius: '50%', // Makes the background circular
          border: '5px solid #FFFFFF', // White border for the circle
        }}
      >
        <CheckIcon
          sx={{
            color: '#4caf50', // Green color for the check mark
            fontSize: 40, // Icon size
          }}
        />
      </Box>
    </Box >
  );
};

export default CheckMarkIcon;
