"use client";
import { useCallback, useEffect, useState } from "react";
import SplashPage from "@/components/ui/splash-page";
import VideoPage from "@/components/ui/video";
import { ImageGallery } from "@/components/ui/image-gallery";
import {
    bride,
    departure,
    engagement,
    groom,
    home,
    imagesTab,
    maison,
    preWedding,
    settings,
    traveling2021,
    traveling2022,
    traveling2023,
    traveling2024,
    traveling2025,
} from "@/constants";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { SCREEN_BREAKPOINT, SPLASH_DURATION } from "@/constants/layout";
import { DesktopLayout } from "@/layout/DesktopLayout";
import { MobileLayout } from "@/layout/MobileLayout";

interface PageState {
    showSplash: boolean;
    isWideScreen: boolean;
    currentPage: string;
    currentTab: string;
    isVisible: boolean;
    activeItem: string | null;
    activeSubItem: string | null;
    isOpenHamburgerMenu: boolean;
}

export default function HomePage() {
    const [pageState, setPageState] = useState<PageState>({
        showSplash: true,
        isWideScreen: true,
        currentPage: "",
        currentTab: imagesTab,
        isVisible: true,
        activeItem: home,
        activeSubItem: null,
        isOpenHamburgerMenu: false,
    });

    const width = useWindowSize();
    const { isVisible } = useScrollPosition(80);

    const handleMenuItemClick = (item: string) => {
        const baseCategory = item.includes("-wedding") ? "wedding" : item.includes("-traveling") ? "traveling" : item;

        setPageState((prev) => ({
            ...prev,
            currentPage: item,
            activeItem: baseCategory,
            activeSubItem: item,
        }));
    };

    const handleCurrentTab = (tab: string) => {
        setPageState((prev) => ({
            ...prev,
            currentTab: tab,
        }));
    };

    const toggleHamburgerMenu = () => {
        setPageState((prev) => ({
            ...prev,
            isOpenHamburgerMenu: !prev.isOpenHamburgerMenu,
        }));
    };

    const renderContent = useCallback(() => {
        const props = {
            isWideScreen: pageState.isWideScreen,
            onMenuItemClickAction: handleMenuItemClick,
        };
        if (pageState.currentPage === home) {
            return <VideoPage {...props} />;
        }
        const pages = [
            maison,
            groom,
            bride,
            departure,
            engagement,
            preWedding,
            traveling2025,
            traveling2024,
            traveling2023,
            traveling2022,
            traveling2021,
            settings,
        ];
        const isPage = pages.includes(pageState.currentPage);

        return isPage ? (
            <ImageGallery
                category={pageState.currentPage}
                currentTab={pageState.currentTab}
                isWideScreen={pageState.isWideScreen}
            />
        ) : (
            <VideoPage {...props} />
        );
    }, [pageState.currentPage, pageState.isWideScreen, pageState.currentTab]);

    // Update wide screen state based on window width
    useEffect(() => {
        setPageState((prev) => ({
            ...prev,
            isWideScreen: width > SCREEN_BREAKPOINT,
        }));
    }, [width]);

    // Handle splash screen
    useEffect(() => {
        const timer = setTimeout(() => {
            setPageState((prev) => ({ ...prev, showSplash: false }));
        }, SPLASH_DURATION);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageState.currentPage]);

    if (pageState.showSplash) {
        return <SplashPage />;
    }

    return pageState.isWideScreen ? (
        <DesktopLayout
            activeItem={pageState.activeItem}
            activeSubItem={pageState.activeSubItem}
            onMenuItemClick={handleMenuItemClick}
            currentTab={pageState.currentTab}
            onCurrentTab={handleCurrentTab}
        >
            {renderContent()}
        </DesktopLayout>
    ) : (
        <MobileLayout
            isVisible={isVisible}
            isOpenHamburgerMenu={pageState.isOpenHamburgerMenu}
            onHamburgerMenuClick={toggleHamburgerMenu}
            onMenuItemClick={handleMenuItemClick}
            activeItem={pageState.activeItem}
            activeSubItem={pageState.activeSubItem}
            currentTab={pageState.currentTab}
            onCurrentTab={handleCurrentTab}
        >
            {renderContent()}
        </MobileLayout>
    );
}
