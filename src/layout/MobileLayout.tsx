import { Box } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import HamburgerMenu from "@/components/ui/hamburger-menu";
import { ReactNode } from "react";
import MobileMenuList from "@/components/ui/mobile-menu-list";
import { gray200 } from "@/constants/colors";

interface MobileLayoutProps {
    children: ReactNode;
    isVisible: boolean;
    isOpenHamburgerMenu: boolean;
    onHamburgerMenuClick: () => void;
    onMenuItemClick: (item: string) => void;
    activeItem: string | null;
    activeSubItem: string | null;
    currentTab: string;
    onCurrentTab: (item: string) => void;
}

export const MobileLayout = ({
    children,
    isVisible,
    isOpenHamburgerMenu,
    onHamburgerMenuClick,
    onMenuItemClick,
    activeItem,
    activeSubItem,
    currentTab,
    onCurrentTab,
}: MobileLayoutProps) => {
    const handleMenuItemClick = (item: string) => {
        onMenuItemClick(item);
        onHamburgerMenuClick();
    };

    return (
        <Box display="flex">
            {isOpenHamburgerMenu ? (
                <Box
                    mt="80px"
                    w="100%"
                    h="100%"
                    position="fixed"
                    display="flex"
                    bg="white"
                    zIndex={2}
                    borderTop="1px solid"
                    borderColor={gray200}
                >
                    <HamburgerMenu
                        isVisible={true}
                        onHamburgerMenuClick={onHamburgerMenuClick}
                        isOpenHamburgerMenu={isOpenHamburgerMenu}
                    />
                    <Header
                        isVisible={true}
                        isWideScreen={false}
                        currentTab={currentTab}
                        onCurrentTab={onCurrentTab}
                        activeItem={activeItem}
                    />
                    <MobileMenuList
                        activeItem={activeItem}
                        activeSubItem={activeSubItem}
                        handleMenuItemClick={handleMenuItemClick}
                    />
                </Box>
            ) : (
                <Box>
                    <HamburgerMenu
                        isVisible={isVisible}
                        onHamburgerMenuClick={onHamburgerMenuClick}
                        isOpenHamburgerMenu={isOpenHamburgerMenu}
                    />
                    <Header
                        isVisible={isVisible}
                        isWideScreen={false}
                        currentTab={currentTab}
                        onCurrentTab={onCurrentTab}
                        activeItem={activeItem}
                    />
                </Box>
            )}

            <Box mt="80px" w="100%" h="calc(100% - 80px)" position="absolute" display="flex" justifyContent="center">
                {children}
            </Box>
        </Box>
    );
};
