import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";

interface DesktopLayoutProps {
    children: ReactNode;
    activeItem: string | null;
    activeSubItem: string | null;
    onMenuItemClick: (item: string) => void;
}

export const DesktopLayout = ({ children, activeItem, activeSubItem, onMenuItemClick }: DesktopLayoutProps) => {
    return (
        <Box display="flex">
            <Sidebar onMenuItemClick={onMenuItemClick} activeItem={activeItem} activeSubItem={activeSubItem} />
            <Header isVisible={true} isWideScreen={true} />
            <Box
                ml="72px"
                mt="80px"
                w="calc(100% - 72px)"
                h="calc(100% - 80px)"
                position="absolute"
                display="flex"
                justifyContent="center"
            >
                {children}
            </Box>
        </Box>
    );
};
