"use client";
import { useState, useEffect, useCallback } from "react";
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

    const loadMore = useCallback(() => {
        setPage((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (currentTab === imagesTab) {
            fetchImages(page);
        } else if (currentTab === videosTab) {
            fetchVideos(page);
        }
    }, [page, currentTab, fetchImages, fetchVideos]);

    useEffect(() => {
        setImages([]);
        setVideos([]);
        setPage(1);
        setHasMore(true);
        // The fetch will be handled by the first useEffect when page/currentTab changes
    }, [category, currentTab]);

    return (
        <Box w="100%" h="100%" mx="15px">
            <InfiniteScroll
                dataLength={currentTab === imagesTab ? images.length : videos.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<Loader />}
                endMessage={
                    <Text textAlign="center" pb="5px" color="black">
                        Thank you for your watching!!!
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
                                <Box key={`${video}-${index}`} borderRadius={18} overflow="hidden" mb="15px">
                                    <video src={video} controls style={{ width: "100%", borderRadius: "10px" }} />
                                </Box>
                            ))
                          : undefined}
                </Masonry>
            </InfiniteScroll>
        </Box>
    );
};
