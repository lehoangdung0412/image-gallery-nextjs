import { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { Box, Text, Image, Center } from "@chakra-ui/react";
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
    const [posterUrls, setPosterUrls] = useState<{ [key: number]: string }>({});
    const [videoPlayTimes, setVideoPlayTimes] = useState<{ [key: number]: number }>({});
    const [lastPlayedIndex, setLastPlayedIndex] = useState<number | null>(null);
    const mediaList = currentTab === imagesTab ? images : videos;

    const savePlaybackTime = (index: number | null, time?: number) => {
        if (index !== null && time !== undefined) {
            setVideoPlayTimes((prev) => ({ ...prev, [index]: time }));
        }
    };

    const handleOpen = (index: number) => {
        setSelectedIndex(index);
    };
    const handleClose = (time?: number) => {
        if (selectedIndex !== null) {
            savePlaybackTime(selectedIndex, time);
            setLastPlayedIndex(selectedIndex);
        }
        setIsZoomed(false);
        setSelectedIndex(null);
    };
    const handlePrev = (time?: number) => {
        if (selectedIndex !== null) {
            savePlaybackTime(selectedIndex, time);
            setLastPlayedIndex(selectedIndex);
        }
        setIsZoomed(false);
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    };
    const handleNext = (time?: number) => {
        if (selectedIndex !== null) {
            savePlaybackTime(selectedIndex, time);
            setLastPlayedIndex(selectedIndex);
        }
        setIsZoomed(false);
        setSelectedIndex((prev) => (prev !== null && prev < mediaList.length - 1 ? prev + 1 : prev));
    };

    const handleVideoHover = (index: number) => {
        setHoveredIndex(index);
        setIsHovering(true);
        // Only pause the previously playing video if it is different from the hovered one
        if (playingIndex !== null && playingIndex !== index) {
            videoRefs.current[playingIndex]?.pause();
        }
        videoRefs.current[index]?.play().catch(() => {});
    };

    const handleVideoMouseLeave = () => {
        setHoveredIndex(null);
        setIsHovering(false);
        // Pause the video when mouse leaves
        if (playingIndex !== null) {
            videoRefs.current[playingIndex]?.pause();
        }
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
        const delayFetch = setTimeout(async () => {
            if (currentTab === imagesTab) {
                await fetchImages(page);
            } else if (currentTab === videosTab) {
                await fetchVideos(page);
            }
        }, 200);

        return () => clearTimeout(delayFetch);
    }, [page, currentTab, fetchImages, fetchVideos]);

    useEffect(() => {
        if (videos.length > 0 && playingIndex === null) {
            setPlayingIndex(0);
        }
    }, [videos.length, playingIndex]);

    useEffect(() => {
        const generatePosters = async () => {
            const posters: { [key: number]: string } = {};
            await Promise.all(
                videos.map(async (video, index) => {
                    const videoElement = document.createElement("video");
                    videoElement.src = video;
                    videoElement.crossOrigin = "anonymous";
                    videoElement.preload = "auto";

                    await new Promise((resolve) => {
                        videoElement.addEventListener("loadeddata", () => {
                            videoElement.currentTime = 1;
                        });

                        videoElement.addEventListener("seeked", () => {
                            const canvas = document.createElement("canvas");
                            const ctx = canvas.getContext("2d");

                            canvas.width = videoElement.videoWidth;
                            canvas.height = videoElement.videoHeight;

                            ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                            posters[index] = canvas.toDataURL("image/jpeg");
                            resolve(null);
                        });
                    });
                }),
            );
            setPosterUrls(posters);
        };

        if (currentTab === videosTab) {
            generatePosters()
                .then(() => {
                    console.log("Posters generated successfully");
                })
                .catch((error) => {
                    console.error("Error in generating posters:", error);
                });
        }
    }, [videos, currentTab]);

    useEffect(() => {
        if (selectedIndex === null && currentTab === videosTab && lastPlayedIndex !== null) {
            const index = lastPlayedIndex;
            const videoEl = videoRefs.current[index];
            const time = videoPlayTimes[index];

            if (videoEl && time !== undefined) {
                videoEl.currentTime = time;
                videoEl.play().catch(() => {});
            }
        }
    }, [selectedIndex, currentTab, videoPlayTimes, lastPlayedIndex]);

    useEffect(() => {
        const disableContextMenu = (e: MouseEvent) => e.preventDefault();
        document.addEventListener("contextmenu", disableContextMenu);
        return () => document.removeEventListener("contextmenu", disableContextMenu);
    }, []);

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
                    playbackTime={videoPlayTimes[selectedIndex] || 0}
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
                                  userSelect="none"
                              >
                                  <Image
                                      src={image}
                                      alt={`Image ${index}`}
                                      width="100%"
                                      height="auto"
                                      borderRadius={10}
                                      draggable={false}
                                      pointerEvents="none"
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
                                            const video = videoRefs.current[index];
                                            if (video) {
                                                const currentTime = video.currentTime;
                                                setVideoPlayTimes((prev) => ({ ...prev, [index]: currentTime }));
                                                setLastPlayedIndex(index);
                                                video.pause();
                                            }
                                            setSelectedIndex(index);
                                        }
                                    }}
                                    onMouseEnter={() => handleVideoHover(index)}
                                    onMouseLeave={() => handleVideoMouseLeave()}
                                >
                                    <video
                                        ref={(el) => {
                                            videoRefs.current[index] = el;
                                        }}
                                        src={video}
                                        poster={posterUrls[index] || ""}
                                        preload="auto"
                                        muted
                                        controls={isWideScreen ? undefined : true}
                                        loop
                                        style={{ width: "100%", borderRadius: "10px" }}
                                        controlsList="nodownload"
                                        disablePictureInPicture
                                    />
                                </Box>
                            ))
                          : undefined}
                </Masonry>
            </InfiniteScroll>
        </Box>
    );
};
