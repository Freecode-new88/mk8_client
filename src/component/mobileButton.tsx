import { Home } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { FC } from 'react';
export interface MobileButtonProps {}
const MobileButton: FC<MobileButtonProps> = () => {
    return (
        <Box
            sx={{
                zIndex: 1000,
                position: 'absolute',
                top: { xs: 20, sm: 30, md: 50 }, // Adjust top margin based on screen size
                right: { xs: 20, sm: 30, md: 50 }, // Adjust right margin based on screen size
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #FF8B00 0%, #FF4237 100%)', // CHANGED
                borderRadius: '50%', // Circular background
                padding: 2,
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)', // Shadow effect
                width: 18, // Adjust size of the circle
                height: 18,
            }}
        >
            <IconButton
                sx={{
                    borderRadius: '50%',
                    padding: 1,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 139, 0, 0.15)', // CHANGED
                    },
                }}
            >
                <Home sx={{ color: '#FFFEFE', fontSize: 30 }} />
            </IconButton>
        </Box>
    );
};

export default MobileButton;