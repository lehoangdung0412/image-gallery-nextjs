"use client";
import { useEffect, useState } from "react";

export const useScrollPosition = (threshold: number) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        // Ensure this only runs on the client side
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                const currentScrollY = window.scrollY;
                setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > threshold));
                setLastScrollY(currentScrollY);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [lastScrollY, threshold]);

    return { isVisible, lastScrollY };
};
