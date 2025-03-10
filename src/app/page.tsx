"use client";
import { useEffect, useState } from "react";
import SplashPage from "@/components/ui/splash-page";
import { VideoPage } from "@/app/video/page";
import Sidebar from "@/components/ui/sidebar";
import { Box, Text } from "@chakra-ui/react";
import Header from "@/components/ui/header";

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
                return <Text>Wedding in Maison 10/01/2024</Text>;
            case "groom-07012024-wedding":
                return <Text>Wedding 07/01/2024 (Groom's family)</Text>;
            case "bride-07012024-wedding":
                return <Text>Wedding 07/01/2024 (Bride's family)</Text>;
            case "06012024-wedding":
                return <Text>Wedding 06/01/2024</Text>;
            case "engagement-ceremony-wedding":
                return <Text>Engagement Ceremony</Text>;
            case "pre-wedding":
                return <Text>Pre-Wedding</Text>;
            case "2025-traveling":
                return <Text>Traveling in 2025</Text>;
            case "2024-traveling":
                return <Text>Traveling in 2024</Text>;
            case "2023-traveling":
                return <Text>Traveling in 2023</Text>;
            case "2022-traveling":
                return <Text>Traveling in 2022</Text>;
            case "2021-traveling":
                return <Text>Traveling in 2021</Text>;
            case "settings":
                return <Text>This is Settings demo</Text>;
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
                w="calc(100% - 72px)"
                h="calc(100% - 80px)"
                position="absolute"
                bg="white"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                {renderContent()}
            </Box>
        </Box>
    );
}
