import React, { useEffect } from "react";

export const useVideoControl = (
    videos: string[],
    hoveredIndex: number | null,
    playingIndex: number | null,
    isHovering: boolean,
    videoRefs: React.RefObject<(HTMLVideoElement | null)[]>,
) => {
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
};
