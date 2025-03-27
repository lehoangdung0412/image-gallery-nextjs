import { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { Box, Text, Image, Center, Button, CloseButton, IconButton } from "@chakra-ui/react";
import { imagesTab, videosTab } from "@/constants";
import { useFetchImages } from "@/hooks/useFetchImages";
import { useFetchVideos } from "@/hooks/useFetchVideos";
import { useScrollHandler } from "@/hooks/useScrollHandler";
import { useVideoControl } from "@/hooks/useVideoControl";
import Overlay from "@/components/ui/overlay";

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
    const [isZoomed, setIsZoomed] = useState(false);
    const mediaList = currentTab === imagesTab ? images : videos;

    const handleOpen = (index: number) => setSelectedIndex(index);
    const handleClose = () => {
        setIsZoomed(false);
        setSelectedIndex(null);
    };
    const handlePrev = () => {
        setIsZoomed(false);
        setSelectedIndex((prev) => (prev && prev > 0 ? prev - 1 : prev));
    };
    const handleNext = () => {
        setIsZoomed(false);
        setSelectedIndex((prev) => (prev !== null && prev < mediaList.length - 1 ? prev + 1 : prev));
    };

    const canGoPrev = selectedIndex !== null && selectedIndex > 0;
    const canGoNext = selectedIndex !== null && selectedIndex < mediaList.length - 1;

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
                    canPrev={canGoPrev}
                    canNext={canGoNext}
                    isWideScreen={isWideScreen}
                    setIsZoomed={setIsZoomed}
                    isZoomed={isZoomed}
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
                                        if (isWideScreen) {
                                            setHoveredIndex(null);
                                            setIsHovering(false);
                                            videoRefs.current[index]?.pause();
                                            setSelectedIndex(index);
                                        }
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
                                        controls={isWideScreen ? undefined : true}
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
