import React, { useEffect, useState } from "react";
import { Box, CloseButton, IconButton, Image } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { red200 } from "@/constants/colors";

interface OverlayProps {
    media: string;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    canPrev: boolean;
    canNext: boolean;
    isWideScreen: boolean;
    isZoomed: boolean;
    setIsZoomed: (isZoomed: boolean) => void;
}

const Overlay = ({
    media,
    onClose,
    onPrev,
    onNext,
    canPrev,
    canNext,
    isWideScreen,
    isZoomed,
    setIsZoomed,
}: OverlayProps) => {
    const [zoomOrigin, setZoomOrigin] = useState("center center");

    const handleZoomToggle = (event: React.MouseEvent<HTMLImageElement | HTMLVideoElement>) => {
        if (isZoomed) {
            setIsZoomed(false);
        } else {
            const rect = event.currentTarget.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;
            const percentX = (clickX / rect.width) * 100;
            const percentY = (clickY / rect.height) * 100;

            setZoomOrigin(`${percentX}% ${percentY}%`);
            setIsZoomed(true);
        }
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
            if (event.key === "ArrowLeft" && canPrev) {
                onPrev();
            }
            if (event.key === "ArrowRight" && canNext) {
                onNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, onPrev, onNext, canPrev, canNext]);

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            w="100vw"
            h="100vh"
            bg="rgba(0, 0, 0, 0.8)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={4}
            onClick={handleOverlayClick}
        >
            <Box
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={isWideScreen ? "70%" : "95%"}
                height={isWideScreen ? "88%" : "auto"}
                bg="white"
                borderRadius="18px"
                overflow="hidden"
                m={isWideScreen ? "10%" : "3%"}
                p={isWideScreen ? "0" : "5%"}
            >
                {media.endsWith(".mp4") || media.endsWith(".webm") ? (
                    <video
                        src={media}
                        controls
                        autoPlay={true}
                        onClick={handleZoomToggle}
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "18px",
                        }}
                    />
                ) : (
                    <Image
                        src={media}
                        onClick={handleZoomToggle}
                        maxWidth="90%"
                        maxHeight="90%"
                        borderRadius={18}
                        style={{
                            transform: isZoomed ? "scale(3)" : "scale(1)",
                            transformOrigin: zoomOrigin,
                            cursor: isZoomed ? "zoom-out" : "zoom-in",
                            transition: "transform 0.3s ease-in-out",
                        }}
                    />
                )}

                <CloseButton
                    position="absolute"
                    top={isWideScreen ? 2 : 0}
                    right={isWideScreen ? 2 : 0}
                    size="lg"
                    color="black"
                    onClick={onClose}
                    _hover={{
                        background: red200,
                    }}
                />

                {canPrev && (
                    <IconButton
                        aria-label="Previous"
                        position="absolute"
                        left="0"
                        top="50%"
                        transform="translateY(-50%)"
                        colorScheme="whiteAlpha"
                        onClick={onPrev}
                        bg="white"
                        _hover={{
                            background: red200,
                        }}
                    >
                        <ArrowLeftIcon color="black" />
                    </IconButton>
                )}

                {canNext && (
                    <IconButton
                        aria-label="Next"
                        position="absolute"
                        right="0"
                        top="50%"
                        transform="translateY(-50%)"
                        colorScheme="whiteAlpha"
                        onClick={onNext}
                        bg="white"
                        _hover={{
                            background: red200,
                        }}
                    >
                        <ArrowRightIcon color="black" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default Overlay;
