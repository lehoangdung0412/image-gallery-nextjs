import React, { useEffect } from "react";

export const useScrollHandler = (
    getTopMostVideoIndex: () => number | null,
    setPlayingIndex: React.Dispatch<React.SetStateAction<number | null>>,
) => {
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
};
