"use client";
import { useEffect, useState } from "react";

export const useWindowSize = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setWidth(window.innerWidth);
            };

            // Set the initial size after the component mounts
            handleResize();

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return width;
};
