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
import { useState } from "react";

const Sidebar = ({ onMenuItemClick }: { onMenuItemClick: (menu: string) => void }) => {
    const [activeItem, setActiveItem] = useState<string | null>("home");

    // Function to handle the click event and update the active menu item
    const handleMenuItemClick = (item: string) => {
        onMenuItemClick(item); // Call the passed function from the parent
        // Update active item for color change
        // Determine the base category for wedding or traveling
        const baseCategory = item.includes("-wedding") ? "wedding" : item.includes("-traveling") ? "traveling" : item;
        // Update active item for color change
        setActiveItem(baseCategory);
    };

    return (
        <Box
            w="72px"
            h="100vh"
            bg="white"
            color="white"
            position="fixed"
            top={0}
            left={0}
            p={6}
            borderRight="1px solid #e9e9e9"
        >
            <VStack align="center" justify="space-between" h="100%">
                <VStack spacing={32} align="center" flex={1}>
                    <MenuRoot open={false}>
                        <MenuTrigger asChild>
                            <Button
                                onClick={() => handleMenuItemClick("home")}
                                _hover={{
                                    bg: "green.200",
                                }}
                                style={{
                                    padding: "10px",
                                }}
                            >
                                {activeItem === "home" ? <RiHomeHeartFill color="#1B5E20" /> : <RiHomeHeartLine />}
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
                                }}
                            >
                                {activeItem === "wedding" ? (
                                    <RiHeartsFill color="red" fontWeight="20px" />
                                ) : (
                                    <RiHeartsLine />
                                )}
                            </Button>
                        </MenuTrigger>
                        <MenuContent bg="white">
                            <MenuItem
                                value="maison-10012024-wedding"
                                onClick={() => handleMenuItemClick("maison-10012024-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                            >
                                Wedding in Maison 10/01/2024
                            </MenuItem>
                            <MenuItem
                                value="groom-07012024-wedding"
                                onClick={() => handleMenuItemClick("groom-07012024-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                            >
                                Wedding 07/01/2024 (Groom's family)
                            </MenuItem>
                            <MenuItem
                                value="bride-07012024-wedding"
                                onClick={() => handleMenuItemClick("bride-07012024-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                            >
                                Wedding 07/01/2024 (Bride's family)
                            </MenuItem>
                            <MenuItem
                                value="06012024-wedding"
                                onClick={() => handleMenuItemClick("06012024-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                            >
                                Wedding 06/01/2024
                            </MenuItem>
                            <MenuItem
                                value="engagement-ceremony-wedding"
                                onClick={() => handleMenuItemClick("engagement-ceremony-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
                                }}
                            >
                                Engagement Ceremony
                            </MenuItem>
                            <MenuItem
                                value="pre-wedding"
                                onClick={() => handleMenuItemClick("pre-wedding")}
                                color="black"
                                _hover={{
                                    bg: "red.200",
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
                                }}
                            >
                                {activeItem === "traveling" ? <RiPlanetFill color="#1D4E89" /> : <RiPlanetLine />}
                            </Button>
                        </MenuTrigger>
                        <MenuContent bg="white">
                            <MenuItem
                                value="2025-traveling"
                                onClick={() => handleMenuItemClick("2025-traveling")}
                                color="black"
                                _hover={{
                                    bg: "blue.200",
                                }}
                            >
                                Traveling in 2025
                            </MenuItem>
                            <MenuItem
                                value="2024-traveling"
                                onClick={() => handleMenuItemClick("2024-traveling")}
                                color="black"
                                _hover={{
                                    bg: "blue.200",
                                }}
                            >
                                Traveling in 2024
                            </MenuItem>
                            <MenuItem
                                value="2023-traveling"
                                onClick={() => handleMenuItemClick("2023-traveling")}
                                color="black"
                                _hover={{
                                    bg: "blue.200",
                                }}
                            >
                                Traveling in 2023
                            </MenuItem>
                            <MenuItem
                                value="2022-traveling"
                                onClick={() => handleMenuItemClick("2022-traveling")}
                                color="black"
                                _hover={{
                                    bg: "blue.200",
                                }}
                            >
                                Traveling in 2022
                            </MenuItem>
                            <MenuItem
                                value="2021-traveling"
                                onClick={() => handleMenuItemClick("2021-traveling")}
                                color="black"
                                _hover={{
                                    bg: "blue.200",
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
                            }}
                        >
                            {activeItem === "settings" ? <RiSettings5Fill color="black" /> : <RiSettings5Line />}
                        </Button>
                    </MenuTrigger>
                    <MenuContent bg="white">
                        <MenuItem
                            value="settings"
                            onClick={() => handleMenuItemClick("settings")}
                            color="black"
                            _hover={{
                                bg: "gray.300",
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
