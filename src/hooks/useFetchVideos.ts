import React, { useCallback } from "react";
import { videosTab } from "@/constants";

export const useFetchVideos = (
    category: string,
    currentTab: string,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setVideos: React.Dispatch<React.SetStateAction<string[]>>,
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
) => {
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

    return { fetchVideos };
};
