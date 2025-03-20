import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import HamburgerMenu from "@/components/ui/hamburger-menu";

interface MobileLayoutProps {
    children: ReactNode;
    isVisible: boolean;
    isOpenHamburgerMenu: boolean;
    onHamburgerMenuClick: () => void;
    onMenuItemClick: (item: string) => void;
}

export const MobileLayout = ({
    children,
    isVisible,
    isOpenHamburgerMenu,
    onHamburgerMenuClick,
    onMenuItemClick,
}: MobileLayoutProps) => {
    return (
        <Box display="flex">
            {isOpenHamburgerMenu ? (
                <Box mt="80px" w="100%" h="100%" position="fixed" display="flex" bg="white" zIndex={2}>
                    <HamburgerMenu
                        isVisible={true}
                        onHamburgerMenuClick={onHamburgerMenuClick}
                        isOpenHamburgerMenu={isOpenHamburgerMenu}
                    />
                    <Header isVisible={true} isWideScreen={false} />
                </Box>
            ) : (
                <Box>
                    <HamburgerMenu
                        isVisible={isVisible}
                        onHamburgerMenuClick={onHamburgerMenuClick}
                        isOpenHamburgerMenu={isOpenHamburgerMenu}
                    />
                    <Header isVisible={isVisible} isWideScreen={false} />
                </Box>
            )}

            <Box mt="80px" w="100%" h="calc(100% - 80px)" position="absolute" display="flex" justifyContent="center">
                {children}
            </Box>
        </Box>
    );
};
