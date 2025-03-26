import { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { Box, Text, Image, Center } from "@chakra-ui/react";
import { imagesTab, videosTab } from "@/constants";

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
    default: 3,
    1100: 2,
    700: 2,
};

export const ImageGallery = ({
    category,
    currentTab,
    isWideScreen,
}: {
    category: string;
    currentTab: string;
    isWideScreen: boolean;
}) => {
    const [images, setImages] = useState<string[]>([]);
    const [videos, setVideos] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const loadMore = () => setPage((prev) => prev + 1);

    const fetchImages = useCallback(
        async (pageNum: number) => {
            if (loading) return;
            setLoading(true);

            try {
                if (currentTab !== imagesTab) return;

                const response = await fetch("/images.json");
                if (!response.ok) return;

                const data = await response.json();
                const allImages = data[category] || [];
                const imagesPerPage = 20;
                const paginatedImages = allImages.slice((pageNum - 1) * imagesPerPage, pageNum * imagesPerPage);

                setImages((prev) => [...prev, ...paginatedImages]);
                setHasMore(paginatedImages.length === imagesPerPage);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        },
        [category, currentTab],
    );

    const fetchVideos = useCallback(
        async (pageNum: number) => {
            if (loading) return;
            setLoading(true);

            try {
                if (currentTab !== videosTab) return;

                const response = await fetch("/videos.json");
                if (!response.ok) return;

                const data = await response.json();
                const allVideos = data[category] || [];
                const videosPerPage = 10;
                const paginatedVideos = allVideos.slice((pageNum - 1) * videosPerPage, pageNum * videosPerPage);

                setVideos((prev) => [...prev, ...paginatedVideos]);
                // Set hasMore to false if we got fewer items than the page size
                setHasMore(paginatedVideos.length === videosPerPage);
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
                setLoading(false);
            }
        },
        [category, currentTab],
    );

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

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                const index = getTopMostVideoIndex();
                if (index !== null) {
                    setPlayingIndex(index);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [getTopMostVideoIndex]);

    useEffect(() => {
        if (videos.length > 0 && playingIndex === null) {
            setPlayingIndex(0);
        }
    }, [videos.length, playingIndex]);

    useEffect(() => {
        if (isHovering) return;

        videoRefs.current.forEach((video, index) => {
            if (!video) return;
            if (index === hoveredIndex || index === playingIndex) {
                // video.muted = true;
                video.play().catch((err) => {
                    console.error("Error playing video:", err);
                });
            } else {
                video.pause();
            }
        });
    }, [hoveredIndex, playingIndex, videos.length, isHovering]);

    return (
        <Box w="100%" h="100%" mx="15px">
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
                style={{ overflow: "unset" }}
                scrollThreshold={0.95}
            >
                <Masonry
                    breakpointCols={isWideScreen || currentTab === imagesTab ? breakpointColumnsObj : 1}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {currentTab === imagesTab
                        ? images.map((image, index) => (
                              <Box key={`${image}-${index}`} borderRadius={18} overflow="hidden" mb="15px">
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
