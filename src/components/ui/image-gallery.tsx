import { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { Box, Text, Image, Center, Button, CloseButton, IconButton } from "@chakra-ui/react";
import { imagesTab, videosTab } from "@/constants";
import { useFetchImages } from "@/hooks/useFetchImages";
import { useFetchVideos } from "@/hooks/useFetchVideos";
import { useScrollHandler } from "@/hooks/useScrollHandler";
import { useVideoControl } from "@/hooks/useVideoControl";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { red200 } from "@/constants/colors";

// Loader Component (3 dots)
const Loader = () => (
    <Center mt={6} pb="20px">
        <Box className="dots-loader">
            <Box className="dot"></Box>
            <Box className="dot"></Box>
            <Box className="dot"></Box>
        </Box>
    </Center>
);

interface OverlayProps {
    media: string;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    isWideScreen: boolean;
}

// Overlay Component
const Overlay = ({ media, onClose, onPrev, onNext, isWideScreen }: OverlayProps) => {
    if (!media) return null;

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="rgba(0, 0, 0, 0.8)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={1000}
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
                <IconButton
                    aria-label="Previous"
                    position="absolute"
                    left="0"
                    top="50%"
                    transform="translateY(-50%)"
                    colorScheme="whiteAlpha"
                    onClick={onPrev}
                    bg="white"
                    style={{
                        transform: "scale(0.8)",
                        transformOrigin: "center",
                    }}
                    _hover={{
                        background: red200,
                    }}
                >
                    <ArrowLeftIcon color="black" />
                </IconButton>
                {media.endsWith(".mp4") || media.endsWith(".webm") ? (
                    <video
                        src={media}
                        controls
                        autoPlay={true}
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "18px",
                        }}
                    />
                ) : (
                    <Image src={media} maxWidth="90%" maxHeight="90%" borderRadius={18} />
                )}
                <IconButton
                    aria-label="Next"
                    position="absolute"
                    right="0"
                    top="50%"
                    transform="translateY(-50%)"
                    colorScheme="whiteAlpha"
                    onClick={onNext}
                    bg="white"
                    style={{
                        transform: "scale(0.8)",
                        transformOrigin: "center",
                    }}
                    _hover={{
                        background: red200,
                    }}
                >
                    <ArrowRightIcon color="black" />
                </IconButton>
            </Box>
        </Box>
    );
};

const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1100: 2,
    700: 2,
};

interface ImageGalleryProps {
    category: string;
    currentTab: string;
    isWideScreen: boolean;
}

export const ImageGallery = ({ category, currentTab, isWideScreen }: ImageGalleryProps) => {
    const [images, setImages] = useState<string[]>([]);
    const [videos, setVideos] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const mediaList = currentTab === imagesTab ? images : videos;

    const handleOpen = (index: number) => setSelectedIndex(index);
    const handleClose = () => setSelectedIndex(null);
    const handlePrev = () => setSelectedIndex((prev) => (prev && prev > 0 ? prev - 1 : prev));
    const handleNext = () =>
        setSelectedIndex((prev) => (prev !== null && prev < mediaList.length - 1 ? prev + 1 : prev));

    const { fetchImages } = useFetchImages(category, currentTab, loading, setLoading, setImages, setHasMore);
    const { fetchVideos } = useFetchVideos(category, currentTab, loading, setLoading, setVideos, setHasMore);

    const getTopMostVideoIndex = useCallback(() => {
        let closestIndex: number | null = null;
        let minTop = Infinity;

        videoRefs.current.forEach((video, index) => {
            if (!video) return;
            const rect = video.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < minTop) {
                minTop = rect.top;
                closestIndex = index;
            }
        });

        return closestIndex;
    }, []);

    useScrollHandler(getTopMostVideoIndex, setPlayingIndex);
    useVideoControl(videos, hoveredIndex, playingIndex, isHovering, videoRefs);

    const loadMore = () => setPage((prev) => prev + 1);

    useEffect(() => {
        setImages([]);
        setVideos([]);
        setPage(1);
        setHasMore(true);
    }, [category, currentTab]);

    useEffect(() => {
        if (currentTab === imagesTab) {
            fetchImages(page);
        } else if (currentTab === videosTab) {
            fetchVideos(page);
        }
    }, [page, currentTab, fetchImages, fetchVideos]);

    useEffect(() => {
        if (videos.length > 0 && playingIndex === null) {
            setPlayingIndex(0);
        }
    }, [videos.length, playingIndex]);

    return (
        <Box w="100%" h="100%">
            {selectedIndex !== null && (
                <Overlay
                    media={mediaList[selectedIndex]}
                    onClose={handleClose}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    isWideScreen={isWideScreen}
                />
            )}
            <InfiniteScroll
                dataLength={currentTab === imagesTab ? images.length : videos.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<Loader />}
                endMessage={
                    <Text textAlign="center" pb="5px" color="black">
                        Thank you for watching!!!
                    </Text>
                }
                style={{ overflow: "unset", marginLeft: "15px", marginRight: "15px" }}
                scrollThreshold={0.8}
            >
                <Masonry
                    breakpointCols={isWideScreen || currentTab === imagesTab ? breakpointColumnsObj : 1}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {currentTab === imagesTab
                        ? images.map((image, index) => (
                              <Box
                                  key={`${image}-${index}`}
                                  borderRadius={18}
                                  overflow="hidden"
                                  mb="15px"
                                  onClick={() => handleOpen(index)}
                              >
                                  <Image
                                      src={image}
                                      alt={`Image ${index}`}
                                      width="100%"
                                      height="auto"
                                      borderRadius={10}
                                  />
                              </Box>
                          ))
                        : currentTab === videosTab
                          ? videos.map((video, index) => (
                                <Box
                                    key={index}
                                    borderRadius={18}
                                    overflow="hidden"
                                    mb="15px"
                                    onClick={() => {
                                        setHoveredIndex(null);
                                        setIsHovering(false);
                                        videoRefs.current[index]?.pause();
                                        setSelectedIndex(index);
                                    }}
                                    onMouseEnter={() => {
                                        setHoveredIndex(index);
                                        setIsHovering(true);
                                        if (playingIndex !== null && playingIndex !== index) {
                                            videoRefs.current[playingIndex]?.pause();
                                        }
                                        videoRefs.current[index]?.play().catch(() => {});
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredIndex(null);
                                        setIsHovering(false);
                                        if (playingIndex !== null && playingIndex !== index) {
                                            videoRefs.current[playingIndex]?.play().catch(() => {});
                                        }
                                        videoRefs.current[index]?.pause();
                                    }}
                                >
                                    <video
                                        ref={(el) => {
                                            videoRefs.current[index] = el;
                                        }}
                                        src={video}
                                        preload="auto"
                                        // controls
                                        loop
                                        style={{ width: "100%", borderRadius: "10px" }}
                                    />
                                </Box>
                            ))
                          : undefined}
                </Masonry>
            </InfiniteScroll>
        </Box>
    );
};
