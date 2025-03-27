import React, { useCallback } from "react";
import { imagesTab } from "@/constants";

export const useFetchImages = (
    category: string,
    currentTab: string,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setImages: React.Dispatch<React.SetStateAction<string[]>>,
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
) => {
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

    return { fetchImages };
};
