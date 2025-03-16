"use client";
import { useEffect, useState } from "react";
import SplashPage from "@/components/ui/splash-page";
import VideoPage from "@/components/ui/video";
import Sidebar from "@/components/ui/sidebar";
import { Box, Text } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import { ImageGallery } from "@/components/ui/image-gallery";
import HamburgerMenu from "@/components/ui/hamburger-menu";

export default function HomePage() {
    const [showSplash, setShowSplash] = useState(true);
    const [isWideScreen, setIsWideScreen] = useState(true);
    const [currentPage, setCurrentPage] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeItem, setActiveItem] = useState<string | null>("home");
    const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
    const [isOpenHamburgerMenu, setIsOpenHamburgerMenu] = useState(false);

    // Function to handle the click event and update the active menu item
    const onMenuItemClick = (item: string) => {
        handleMenuItemClick(item); // Call the passed function from the parent
        // Update active item for color change
        // Determine the base category for wedding or traveling
        const baseCategory = item.includes("-wedding") ? "wedding" : item.includes("-traveling") ? "traveling" : item;
        // Update active item for color change
        setActiveItem(baseCategory);
        // Update sub menu for color change
        setActiveSubItem(item);
    };

    const handleMenuItemClick = (menu: string) => {
        setCurrentPage(menu);
    };

    const handleHamburgerMenuClick = () => {
        setIsOpenHamburgerMenu(!isOpenHamburgerMenu);
    };

    useEffect(() => {
        setTimeout(() => setShowSplash(false), 3500);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 500);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const renderContent = (isWideScreen: boolean) => {
        switch (currentPage) {
            case "home":
                return <VideoPage isWideScreen={isWideScreen} onMenuItemClick={onMenuItemClick} />;
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
                return <VideoPage isWideScreen={isWideScreen} onMenuItemClick={onMenuItemClick} />;
        }
    };

    return showSplash ? (
        <SplashPage />
    ) : isWideScreen ? (
        <Box display="flex">
            <Sidebar onMenuItemClick={onMenuItemClick} activeItem={activeItem} activeSubItem={activeSubItem} />
            <Header isVisible={true} isWideScreen={isWideScreen} />
            <Box
                ml="72px"
                mt="80px"
                w="calc(100% - 72px)"
                h="calc(100% - 80px)"
                position="absolute"
                display="flex"
                justifyContent="center"
            >
                {renderContent(isWideScreen)}
            </Box>
        </Box>
    ) : (
        <Box display="flex">
            {isOpenHamburgerMenu ? (
                <Box mt="80px" w="100%" h="100%" position="fixed" display="flex" bg="white" zIndex={2}>
                    <HamburgerMenu
                        isVisible={true}
                        onHamburgerMenuClick={handleHamburgerMenuClick}
                        isOpenHamburgerMenu={isOpenHamburgerMenu}
                    />
                    <Header isVisible={true} isWideScreen={isWideScreen} />
                    <Text>This is a text</Text>
                </Box>
            ) : (
                <Box>
                    <HamburgerMenu
                        isVisible={isVisible}
                        onHamburgerMenuClick={handleHamburgerMenuClick}
                        isOpenHamburgerMenu={isOpenHamburgerMenu}
                    />
                    <Header isVisible={isVisible} isWideScreen={isWideScreen} />
                </Box>
            )}
            <Box mt="80px" w="100%" h="calc(100% - 80px)" position="absolute" display="flex" justifyContent="center">
                {renderContent(isWideScreen)}
            </Box>
        </Box>
    );
}
