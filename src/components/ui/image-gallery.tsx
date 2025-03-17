"use client";
import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { Box, Text, Image, Center } from "@chakra-ui/react";

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

export const ImageGallery = ({ category }: { category: string }) => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchImages = useCallback(
        async (pageNum: number) => {
            if (loading) return;
            setLoading(true);

            try {
                const response = await fetch("/images.json");
                if (!response.ok) return;

                const data = await response.json();
                const allImages = data[category] || [];
                const imagesPerPage = 10;
                const paginatedImages = allImages.slice((pageNum - 1) * imagesPerPage, pageNum * imagesPerPage);

                setImages((prev) => [...prev, ...paginatedImages]);
                setHasMore(paginatedImages.length > 0);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        },
        [category, loading],
    );

    const loadMore = useCallback(() => {
        setPage((prev) => prev + 1);
    }, []);

    useEffect(() => {
        fetchImages(page);
    }, [page]);

    useEffect(() => {
        setImages([]); // Reset images when category changes
        setPage(1);
        setHasMore(true);
        fetchImages(1);
    }, [category]); // Only re-run when category changes

    return (
        <Box w="100%" h="100%" mx="15px">
            <InfiniteScroll
                dataLength={images.length}
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
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {images.map((image, index) => (
                        <Box key={`${image}-${index}`} borderRadius={18} overflow="hidden" mb="15px">
                            <Image src={image} alt={`Image ${index}`} width="100%" height="auto" borderRadius={10} />
                        </Box>
                    ))}
                </Masonry>
            </InfiniteScroll>
        </Box>
    );
};
