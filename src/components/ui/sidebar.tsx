"use client";
import { Box, Button } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu";
import {
    RiHeartsFill,
    RiHeartsLine,
    RiHomeHeartFill,
    RiHomeHeartLine,
    RiPlanetFill,
    RiPlanetLine,
    RiSettings5Fill,
    RiSettings5Line,
} from "react-icons/ri";

const Sidebar = ({
    onMenuItemClick,
    activeItem,
    activeSubItem,
}: {
    onMenuItemClick: (menu: string) => void;
    activeItem: string | null;
    activeSubItem: string | null;
}) => {
    return (
        <Box
            w="72px"
            h="100%"
            color="white"
            position="fixed"
            top={0}
            left={0}
            p={6}
            borderRight="1px solid #e9e9e9"
            zIndex={2}
        >
            <VStack align="center" justify="space-between" h="100%">
                <VStack spacing={32} align="center" flex={1}>
                    <MenuRoot open={false}>
                        <MenuTrigger asChild>
                            <Button
                                onClick={() => onMenuItemClick("home")}
                                _hover={{
                                    bg: "green.200",
                                }}
                                style={{
                                    padding: "10px",
                                    background: "white",
                                }}
                            >
                                {activeItem === "home" ? (
                                    <RiHomeHeartFill color="#1B5E20" />
                                ) : (
                                    <RiHomeHeartLine color="black" />
                                )}
                            </Button>
                        </MenuTrigger>
                    </MenuRoot>
                    <MenuRoot positioning={{ placement: "right-start" }}>
                        <MenuTrigger asChild>
                            <Button
                                _focus={{
                                    outline: "none",
                                }}
                                _hover={{
                                    bg: "red.200",
                                }}
                                style={{
                                    padding: "10px",
                                    background: "white",
                                }}
                            >
                                {activeItem === "wedding" ? (
                                    <RiHeartsFill color="red" />
                                ) : (
                                    <RiHeartsLine color="black" />
                                )}
                            </Button>
                        </MenuTrigger>
                        <MenuContent bg="white">
                            <MenuItem
                                value="maison-10012024-wedding"
                                onClick={() => onMenuItemClick("maison-10012024-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                                style={{
                                    background: activeSubItem === "maison-10012024-wedding" ? "#fc8181" : undefined,
                                }}
                            >
                                Wedding in Maison 10/01/2024
                            </MenuItem>
                            <MenuItem
                                value="groom-07012024-wedding"
                                onClick={() => onMenuItemClick("groom-07012024-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                                style={{
                                    background: activeSubItem === "groom-07012024-wedding" ? "#fc8181" : undefined,
                                }}
                            >
                                Wedding 07/01/2024 (Groom's family)
                            </MenuItem>
                            <MenuItem
                                value="bride-07012024-wedding"
                                onClick={() => onMenuItemClick("bride-07012024-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                                style={{
                                    background: activeSubItem === "bride-07012024-wedding" ? "#fc8181" : undefined,
                                }}
                            >
                                Wedding 07/01/2024 (Bride's family)
                            </MenuItem>
                            <MenuItem
                                value="06012024-wedding"
                                onClick={() => onMenuItemClick("06012024-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                                style={{
                                    background: activeSubItem === "06012024-wedding" ? "#fc8181" : undefined,
                                }}
                            >
                                Wedding 06/01/2024
                            </MenuItem>
                            <MenuItem
                                value="engagement-ceremony-wedding"
                                onClick={() => onMenuItemClick("engagement-ceremony-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                                style={{
                                    background: activeSubItem === "engagement-ceremony-wedding" ? "#fc8181" : undefined,
                                }}
                            >
                                Engagement Ceremony
                            </MenuItem>
                            <MenuItem
                                value="pre-wedding"
                                onClick={() => onMenuItemClick("pre-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                                style={{
                                    background: activeSubItem === "pre-wedding" ? "#fc8181" : undefined,
                                }}
                            >
                                Pre-Wedding
                            </MenuItem>
                        </MenuContent>
                    </MenuRoot>
                    <MenuRoot positioning={{ placement: "right-start" }}>
                        <MenuTrigger asChild>
                            <Button
                                _focus={{
                                    outline: "none",
                                }}
                                _hover={{
                                    bg: "blue.200",
                                }}
                                style={{
                                    padding: "10px",
                                    background: "white",
                                }}
                            >
                                {activeItem === "traveling" ? (
                                    <RiPlanetFill color="#1D4E89" />
                                ) : (
                                    <RiPlanetLine color="black" />
                                )}
                            </Button>
                        </MenuTrigger>
                        <MenuContent bg="white">
                            <MenuItem
                                value="2025-traveling"
                                onClick={() => onMenuItemClick("2025-traveling")}
                                color="black"
                                _hover={{
                                    bg: "blue.200",
                                }}
                                style={{
                                    background: activeSubItem === "2025-traveling" ? "#63b3ed" : undefined,
                                }}
                            >
                                Traveling in 2025
                            </MenuItem>
                            <MenuItem
                                value="2024-traveling"
                                onClick={() => onMenuItemClick("2024-traveling")}
                                color="black"
                                _hover={{
                                    bg: "blue.200",
                                }}
                                style={{
                                    background: activeSubItem === "2024-traveling" ? "#63b3ed" : undefined,
                                }}
                            >
                                Traveling in 2024
                            </MenuItem>
                            <MenuItem
                                value="2023-traveling"
                                onClick={() => onMenuItemClick("2023-traveling")}
                                color="black"
                                _hover={{
                                    bg: "blue.200",
                                }}
                                style={{
                                    background: activeSubItem === "2023-traveling" ? "#63b3ed" : undefined,
                                }}
                            >
                                Traveling in 2023
                            </MenuItem>
                            <MenuItem
                                value="2022-traveling"
                                onClick={() => onMenuItemClick("2022-traveling")}
                                color="black"
                                _hover={{
                                    bg: "blue.200",
                                }}
                                style={{
                                    background: activeSubItem === "2022-traveling" ? "#63b3ed" : undefined,
                                }}
                            >
                                Traveling in 2022
                            </MenuItem>
                            <MenuItem
                                value="2021-traveling"
                                onClick={() => onMenuItemClick("2021-traveling")}
                                color="black"
                                _hover={{
                                    bg: "blue.200",
                                }}
                                style={{
                                    background: activeSubItem === "2021-traveling" ? "#63b3ed" : undefined,
                                }}
                            >
                                Traveling in 2021
                            </MenuItem>
                        </MenuContent>
                    </MenuRoot>
                </VStack>
                <MenuRoot positioning={{ placement: "right-start" }}>
                    <MenuTrigger asChild>
                        <Button
                            _focus={{
                                outline: "none",
                            }}
                            _hover={{
                                bg: "gray.300",
                            }}
                            style={{
                                padding: "10px",
                                background: "white",
                            }}
                        >
                            {activeItem === "settings" ? (
                                <RiSettings5Fill color="black" />
                            ) : (
                                <RiSettings5Line color="black" />
                            )}
                        </Button>
                    </MenuTrigger>
                    <MenuContent bg="white">
                        <MenuItem
                            value="settings"
                            onClick={() => onMenuItemClick("settings")}
                            color="black"
                            _hover={{
                                bg: "gray.300",
                            }}
                            style={{
                                background: activeSubItem === "settings" ? "#cbd5e0" : undefined,
                            }}
                        >
                            This is Settings demo
                        </MenuItem>
                    </MenuContent>
                </MenuRoot>
            </VStack>
        </Box>
    );
};

export default Sidebar;
