import React, { useEffect, useRef, useState } from "react";
import { Box, CloseButton, IconButton, Image, Skeleton } from "@chakra-ui/react";
import { gray200, red200 } from "@/constants/colors";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";

interface OverlayProps {
    media: string;
    onClose: (time: number) => void;
    onPrev: (time: number) => void;
    onNext: (time: number) => void;
    canPrev: boolean;
    canNext: boolean;
    isWideScreen: boolean;
    isZoomed: boolean;
    setIsZoomed: (isZoomed: boolean) => void;
    playbackTime?: number;
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
    playbackTime,
}: OverlayProps) => {
    const [zoomOrigin, setZoomOrigin] = useState("center center");
    const [highQualityMedia, setHighQualityMedia] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement | null>(null);

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
            onClose(getCurrentTime());
        }
    };

    const getCurrentTime = () => videoRef.current?.currentTime || 0;
    const handleCloseClick = () => {
        onClose(getCurrentTime());
    };
    const handleNextClick = () => {
        onNext(getCurrentTime());
    };
    const handlePrevClick = () => {
        onPrev(getCurrentTime());
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose(getCurrentTime());
            }
            if (event.key === "ArrowLeft" && canPrev) {
                onPrev(getCurrentTime());
            }
            if (event.key === "ArrowRight" && canNext) {
                onNext(getCurrentTime());
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, onPrev, onNext, canPrev, canNext]);

    useEffect(() => {
        const highQualityMediaPath = media.replace("/thumbnails/", "/high-quality/");
        setHighQualityMedia(highQualityMediaPath);
        setIsLoading(true);
    }, [media]);

    useEffect(() => {
        if (media.endsWith(".mp4")) {
            const videoElement = videoRef.current;
            if (videoElement && playbackTime !== undefined) {
                videoElement.currentTime = playbackTime;
            }
        }
    }, [media, playbackTime]);

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            w="100vw"
            h="100vh"
            bg="rgba(0, 0, 0, 0.8)"
            backdropFilter="blur(5px)"
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
                userSelect="none"
            >
                {highQualityMedia ? (
                    media.endsWith(".mp4") ? (
                        <video
                            ref={videoRef}
                            src={highQualityMedia}
                            controls
                            autoPlay={true}
                            onLoadedMetadata={(e) => {
                                const video = e.currentTarget;
                                if (video.readyState >= 1) {
                                    video.currentTime = playbackTime ?? 0;
                                    const playAfterSeek = () => {
                                        video.play().catch(() => {});
                                        video.removeEventListener("seeked", playAfterSeek);
                                    };
                                    video.addEventListener("seeked", playAfterSeek);
                                }
                            }}
                            loop
                            onClick={handleZoomToggle}
                            style={{
                                maxWidth: "90%",
                                maxHeight: "90%",
                                borderRadius: "18px",
                            }}
                            controlsList="nodownload"
                            disablePictureInPicture
                            draggable={false}
                        />
                    ) : (
                        <>
                            {isLoading && <Skeleton width="90%" height="90%" borderRadius={18} bg={gray200} />}
                            <Image
                                src={highQualityMedia}
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
                                onLoad={() => setIsLoading(false)}
                                display={isLoading ? "none" : "block"}
                                draggable={false}
                            />
                        </>
                    )
                ) : null}

                <CloseButton
                    position="absolute"
                    top={isWideScreen ? 2 : 0}
                    right={isWideScreen ? 2 : 0}
                    size="lg"
                    color="black"
                    onClick={handleCloseClick}
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
                        onClick={handlePrevClick}
                        bg="transparent"
                        _hover={{
                            background: red200,
                        }}
                    >
                        <RiArrowLeftDoubleFill color="black" size={20} />
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
                        onClick={handleNextClick}
                        bg="transparent"
                        _hover={{
                            background: red200,
                        }}
                    >
                        <RiArrowRightDoubleFill color="black" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default Overlay;
