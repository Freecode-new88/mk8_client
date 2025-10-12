import { Box, Grid2, keyframes } from '@mui/material';
import { FC } from 'react';
import Gifbox_code2_1 from '../assets/left/Gifbox-code2 1.png';
// Define keyframes for the animation
const moveBottomToTop = keyframes`
  0% {
    transform: translateY(200px) rotate(-9.36deg); /* Start position */
    opacity: 0; /* Fully transparent */
  }
  50% {
    opacity: 0.5; /* Semi-transparent */
  }
  100% {
    transform: translateY(0) rotate(-9.36deg); /* End position */
    opacity: 1; /* Fully visible */
  }
`;


export interface LeftGridProps { keyboardActive: boolean }

const LeftGrid: FC<LeftGridProps> = () => {
    
    return (
        <Grid2
            size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }} // All screen sizes: xs, sm, md, lg, xl
            sx={{
                order: { xs: 2, sm: 2,  md: 2, lg: 1 }, // Order for mobile (xs, sm) and larger (md)
                position: 'relative',
                height: { xs: '50%', sm: '50%', md: '50%', lg: '100%', xl: '100%'}, // Height adjustment for different screen sizes
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Model Image */}
            <Box
                component="img"
                draggable={false}
                src={"/images/0H6A8362-1.webp"}
                alt="Model"
                sx={{
                    display: { xs: "block", md: "none" },
                    position: 'absolute',
                    bottom: { xs: -110, sm: -250, md: -310, lg: -100 }, // Adjust bottom positioning for mobile, iPad, and PC
                    right: { xs: 25, sm: 70, md: 80,  lg: -20 }, // Adjust right positioning for mobile, iPad, and PC
                    maxWidth: { xs: '80%', sm: '65%', md: '65%', lg: '80%'}, // Adjust maxWidth for mobile, iPad, and PC
                    zIndex: 1,
                    transform: "scale(1.2)", // ✅ zoom in 10%
                    transformOrigin: "center", 
                }}
            />
            {/* Model casino */}
            {/* <Box
                component="img"
                src={casino}
                alt="Model"
                draggable={false}
                sx={{
                    opacity: '15%',
                    position: 'absolute',
                    bottom: { xs: -50, sm: -120, md: -200,  lg: -100 }, // Adjust bottom positioning for mobile, iPad, and PC
                    right: { xs: 40, sm: 100, md: -60 }, // Adjust right positioning for mobile, iPad, and PC
                    maxWidth: { xs: '90%', sm: '65%', md: '95%' }, // Adjust maxWidth for mobile, iPad, and PC
                    zIndex: 9,
                }}
            /> */}
            {/* Model Gifbox-code2 1 */}
            <Box
                component="img"
                draggable={false}
                src={Gifbox_code2_1}
                alt="Model"
                sx={{
                    transform: 'rotate(-9.36deg)',
                    position: 'absolute',
                    display: { xs: 'none', sm: 'none', md: 'none', lg: "block"},
                    bottom: { xs: -50, sm: -100, md: 0 }, // Adjust bottom positioning for mobile, iPad, and PC
                    right: { xs: 40, sm: 100, md: -60 }, // Adjust right positioning for mobile, iPad, and PC
                    maxWidth: { xs: '90%', sm: '65%', md: '100%' }, // Adjust maxWidth for mobile, iPad, and PC
                    zIndex: 10,
                    animation: `${moveBottomToTop} 5s ease-in-out`, // Apply the animation
                }}
            />
            {/* Model Gifbox-code4 1 */}
            {/* <Box
                component="img"
                src={Gifbox_code4_1}
                draggable={false}
                alt="Model"
                sx={{
                    position: 'absolute',
                    bottom: { xs: -50, sm: -100, md: -100,  lg: -100 }, // Adjust bottom positioning for mobile, iPad, and PC
                    left: { xs: -60, sm: -80, md: -90,  lg: -100 }, // Adjust right positioning for mobile, iPad, and PC
                    maxWidth: { xs: '60%', sm: '60%', md: '60%', lg: '70%'}, // Adjust maxWidth for mobile, iPad, and PC
                    zIndex: 11,
                }}
            /> */}
            {/* Gifbox-code4-1 1 */}
            {/* <Box
                component="img"
                src={Gifbox_code4_1_1}
                draggable={false}
                alt="Model"
                sx={{
                    position: 'absolute',
                    bottom: { xs: -50, sm: -100, md: -140 }, // Adjust bottom positioning for mobile, iPad, and PC
                    right: { xs: -10, sm: -30, md: -40 }, // Adjust right positioning for mobile, iPad, and PC
                    maxWidth: { xs: '50%', sm: '50%', md: '50%' }, // Adjust maxWidth for mobile, iPad, and PC
                    zIndex: 11,
                }}
            /> */}
        </Grid2>
    );
};


export default LeftGrid;
