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
        <Box w="72px" h="100vh" bg="gray.800" color="white" position="fixed" top={0} left={0} p={4}>
            <VStack align="center" justify="space-between" h="100%">
                <VStack spacing={32} align="center" flex={1}>
                    <MenuRoot open={false}>
                        <MenuTrigger asChild>
                            <Button variant="outline" onClick={() => handleMenuItemClick("home")}>
                                {activeItem === "home" ? <RiHomeHeartFill color="orange" /> : <RiHomeHeartLine />}
                            </Button>
                        </MenuTrigger>
                    </MenuRoot>
                    <MenuRoot positioning={{ placement: "right-start" }}>
                        <MenuTrigger asChild>
                            <Button
                                variant="outline"
                                _focus={{
                                    outline: "none",
                                }}
                            >
                                {activeItem === "wedding" ? <RiHeartsFill color="orange" /> : <RiHeartsLine />}
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            <MenuItem
                                value="maison-10012024-wedding"
                                onClick={() => handleMenuItemClick("maison-10012024-wedding")}
                            >
                                Wedding in Maison 10/01/2024
                            </MenuItem>
                            <MenuItem
                                value="groom-07012024-wedding"
                                onClick={() => handleMenuItemClick("groom-07012024-wedding")}
                            >
                                Wedding 07/01/2024 (Groom's family)
                            </MenuItem>
                            <MenuItem
                                value="bride-07012024-wedding"
                                onClick={() => handleMenuItemClick("bride-07012024-wedding")}
                            >
                                Wedding 07/01/2024 (Bride's family)
                            </MenuItem>
                            <MenuItem value="06012024-wedding" onClick={() => handleMenuItemClick("06012024-wedding")}>
                                Wedding 06/01/2024
                            </MenuItem>
                            <MenuItem
                                value="engagement-ceremony-wedding"
                                onClick={() => handleMenuItemClick("engagement-ceremony-wedding")}
                            >
                                Engagement Ceremony
                            </MenuItem>
                            <MenuItem value="pre-wedding" onClick={() => handleMenuItemClick("pre-wedding")}>
                                Pre-Wedding
                            </MenuItem>
                        </MenuContent>
                    </MenuRoot>
                    <MenuRoot positioning={{ placement: "right-start" }}>
                        <MenuTrigger asChild>
                            <Button
                                variant="outline"
                                _focus={{
                                    outline: "none",
                                }}
                            >
                                {activeItem === "traveling" ? <RiPlanetFill color="orange" /> : <RiPlanetLine />}
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            <MenuItem value="2025-traveling" onClick={() => handleMenuItemClick("2025-traveling")}>
                                Traveling in 2025
                            </MenuItem>
                            <MenuItem value="2024-traveling" onClick={() => handleMenuItemClick("2024-traveling")}>
                                Traveling in 2024
                            </MenuItem>
                            <MenuItem value="2023-traveling" onClick={() => handleMenuItemClick("2023-traveling")}>
                                Traveling in 2023
                            </MenuItem>
                            <MenuItem value="2022-traveling" onClick={() => handleMenuItemClick("2022-traveling")}>
                                Traveling in 2022
                            </MenuItem>
                            <MenuItem value="2021-traveling" onClick={() => handleMenuItemClick("2021-traveling")}>
                                Traveling in 2021
                            </MenuItem>
                        </MenuContent>
                    </MenuRoot>
                </VStack>
                <MenuRoot positioning={{ placement: "right-start" }}>
                    <MenuTrigger asChild>
                        <Button
                            variant="outline"
                            _focus={{
                                outline: "none",
                            }}
                        >
                            {activeItem === "settings" ? <RiSettings5Fill color="orange" /> : <RiSettings5Line />}
                        </Button>
                    </MenuTrigger>
                    <MenuContent>
                        <MenuItem value="settings" onClick={() => handleMenuItemClick("settings")}>
                            This is Settings demo
                        </MenuItem>
                    </MenuContent>
                </MenuRoot>
            </VStack>
        </Box>
    );
};

export default Sidebar;
