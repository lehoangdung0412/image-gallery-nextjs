"use client";
import { Box, Button, Icon } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import { TimelineComponent } from "@/components/ui/timeline";

export default function VideoPage({
    isWideScreen,
    onMenuItemClick,
}: {
    isWideScreen: boolean;
    onMenuItemClick: (menu: string) => void;
}) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [muted, _setMuted] = useState(true); // Start with muted
    const [buttonVisible, setButtonVisible] = useState(true); // Track button visibility

    const handleMuteClick = () => {
        // Check if videoRef.current is not null before accessing its properties
        if (videoRef.current) {
            // Unmute and gradually increase the volume from 0 to 70%
            videoRef.current.muted = false;
            let volume = 0;
            videoRef.current.volume = volume;

            // Gradually increase the volume to 70% over 2 seconds
            const interval = setInterval(() => {
                if (volume < 0.7) {
                    volume += 0.01; // Increase volume by 1% each interval
                    if (videoRef.current) {
                        videoRef.current.volume = volume;
                    }
                } else {
                    clearInterval(interval); // Stop increasing when 70% is reached
                }
            }, 100); // Increase every 100ms

            // Hide the button after clicking
            setButtonVisible(false);
        }
    };

    return (
        <Box mx="15px" aspectRatio="16/9" maxWidth="100%">
            <Box position="relative" mx="15px">
                <video
                    ref={videoRef}
                    src="/videos/intro.mp4"
                    autoPlay
                    muted={muted} // Start muted for autoPlay
                    controls
                    style={{
                        borderRadius: "15px",
                        display: "block",
                    }}
                />
                {buttonVisible && (
                    <Button
                        onClick={handleMuteClick}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        borderRadius="full"
                        px={6}
                        py={4}
                        display="flex"
                        alignItems="center"
                        gap={2} // Adds some space between icon and text
                        _hover={{ bg: "gray.700" }} // Change color on hover
                        boxShadow="lg"
                        bg="gray.500"
                    >
                        <Icon as={FaVolumeUp} w={5} h={5} color="white" />
                    </Button>
                )}
            </Box>
            {!isWideScreen && <TimelineComponent onMenuItemClick={onMenuItemClick} />}
        </Box>
    );
}
