"use client";
import { useEffect, useState } from "react";
import SplashPage from "@/components/ui/splash-page";
import VideoPage from "@/components/ui/video";
import Sidebar from "@/components/ui/sidebar";
import { Box } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import { ImageGallery } from "@/components/ui/image-gallery";

export default function HomePage() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        setTimeout(() => setShowSplash(false), 3500);
    }, []);

    const [currentPage, setCurrentPage] = useState("");

    const handleMenuItemClick = (menu: string) => {
        setCurrentPage(menu);
    };

    const renderContent = () => {
        switch (currentPage) {
            case "home":
                return <VideoPage />;
            case "maison-10012024-wedding":
                return <ImageGallery category="maison-10012024-wedding" />;
            case "groom-07012024-wedding":
                return <ImageGallery category="groom-07012024-wedding" />;
            case "bride-07012024-wedding":
                return <ImageGallery category="bride-07012024-wedding" />;
            case "06012024-wedding":
                return <ImageGallery category="06012024-wedding" />;
            case "engagement-ceremony-wedding":
                return <ImageGallery category="engagement-ceremony-wedding" />;
            case "pre-wedding":
                return <ImageGallery category="pre-wedding" />;
            case "2025-traveling":
                return <ImageGallery category="2025-traveling" />;
            case "2024-traveling":
                return <ImageGallery category="2024-traveling" />;
            case "2023-traveling":
                return <ImageGallery category="2023-traveling" />;
            case "2022-traveling":
                return <ImageGallery category="2022-traveling" />;
            case "2021-traveling":
                return <ImageGallery category="2021-traveling" />;
            case "settings":
                return <ImageGallery category="settings" />;
            default:
                return <VideoPage />;
        }
    };

    return showSplash ? (
        <SplashPage />
    ) : (
        <Box display="flex">
            {/* Sidebar */}
            <Sidebar onMenuItemClick={handleMenuItemClick} />
            {/* Header */}
            <Header />
            {/* Main content */}
            <Box
                ml="72px"
                mt="80px"
                pb="15px"
                w="calc(100% - 72px)"
                h="calc(100% - 80px)"
                position="absolute"
                bg="white"
                display="flex"
                overflow="auto"
                justifyContent="center"
                // alignItems="center"
            >
                {renderContent()}
            </Box>
        </Box>
    );
}
