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
import {
    bride,
    departure,
    engagement,
    groom,
    home,
    maison,
    preWedding,
    settings,
    traveling2021,
    traveling2022,
    traveling2023,
    traveling2024,
    traveling2025,
} from "@/constants";
import {
    blue200,
    blue300,
    blue900,
    bluegray300,
    gray200,
    gray300,
    green200,
    green900,
    red200,
    red300,
} from "@/constants/colors";

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
            borderRight="1px solid"
            borderColor={gray200}
            zIndex={2}
        >
            <VStack align="center" justify="space-between" h="100%">
                <VStack spacing={32} align="center" flex={1}>
                    <MenuRoot open={false}>
                        <MenuTrigger asChild>
                            <Button
                                onClick={() => onMenuItemClick(home)}
                                _hover={{
                                    bg: green200,
                                }}
                                style={{
                                    padding: "10px",
                                    background: "white",
                                }}
                            >
                                {activeItem === home ? (
                                    <RiHomeHeartFill color={green900} />
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
                                    bg: red200,
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
                                value={maison}
                                onClick={() => onMenuItemClick(maison)}
                                color="black"
                                _hover={{
                                    bg: red200,
                                }}
                                style={{
                                    background: activeSubItem === maison ? red300 : undefined,
                                }}
                            >
                                Wedding in Maison 10/01/2024
                            </MenuItem>
                            <MenuItem
                                value={groom}
                                onClick={() => onMenuItemClick(groom)}
                                color="black"
                                _hover={{
                                    bg: red200,
                                }}
                                style={{
                                    background: activeSubItem === groom ? red300 : undefined,
                                }}
                            >
                                Wedding 07/01/2024 (Groom's family)
                            </MenuItem>
                            <MenuItem
                                value={bride}
                                onClick={() => onMenuItemClick(bride)}
                                color="black"
                                _hover={{
                                    bg: red200,
                                }}
                                style={{
                                    background: activeSubItem === bride ? red300 : undefined,
                                }}
                            >
                                Wedding 07/01/2024 (Bride's family)
                            </MenuItem>
                            <MenuItem
                                value={departure}
                                onClick={() => onMenuItemClick(departure)}
                                color="black"
                                _hover={{
                                    bg: red200,
                                }}
                                style={{
                                    background: activeSubItem === departure ? red300 : undefined,
                                }}
                            >
                                Wedding 06/01/2024
                            </MenuItem>
                            <MenuItem
                                value={engagement}
                                onClick={() => onMenuItemClick(engagement)}
                                color="black"
                                _hover={{
                                    bg: red200,
                                }}
                                style={{
                                    background: activeSubItem === engagement ? red300 : undefined,
                                }}
                            >
                                Engagement Ceremony
                            </MenuItem>
                            <MenuItem
                                value={preWedding}
                                onClick={() => onMenuItemClick(preWedding)}
                                color="black"
                                _hover={{
                                    bg: red200,
                                }}
                                style={{
                                    background: activeSubItem === preWedding ? red300 : undefined,
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
                                    bg: blue200,
                                }}
                                style={{
                                    padding: "10px",
                                    background: "white",
                                }}
                            >
                                {activeItem === "traveling" ? (
                                    <RiPlanetFill color={blue900} />
                                ) : (
                                    <RiPlanetLine color="black" />
                                )}
                            </Button>
                        </MenuTrigger>
                        <MenuContent bg="white">
                            <MenuItem
                                value={traveling2025}
                                onClick={() => onMenuItemClick(traveling2025)}
                                color="black"
                                _hover={{
                                    bg: blue200,
                                }}
                                style={{
                                    background: activeSubItem === traveling2025 ? blue300 : undefined,
                                }}
                            >
                                Traveling in 2025
                            </MenuItem>
                            <MenuItem
                                value={traveling2024}
                                onClick={() => onMenuItemClick(traveling2024)}
                                color="black"
                                _hover={{
                                    bg: blue200,
                                }}
                                style={{
                                    background: activeSubItem === traveling2024 ? blue300 : undefined,
                                }}
                            >
                                Traveling in 2024
                            </MenuItem>
                            <MenuItem
                                value={traveling2023}
                                onClick={() => onMenuItemClick(traveling2023)}
                                color="black"
                                _hover={{
                                    bg: blue200,
                                }}
                                style={{
                                    background: activeSubItem === traveling2023 ? blue300 : undefined,
                                }}
                            >
                                Traveling in 2023
                            </MenuItem>
                            <MenuItem
                                value={traveling2022}
                                onClick={() => onMenuItemClick(traveling2022)}
                                color="black"
                                _hover={{
                                    bg: blue200,
                                }}
                                style={{
                                    background: activeSubItem === traveling2022 ? blue300 : undefined,
                                }}
                            >
                                Traveling in 2022
                            </MenuItem>
                            <MenuItem
                                value={traveling2021}
                                onClick={() => onMenuItemClick(traveling2021)}
                                color="black"
                                _hover={{
                                    bg: blue200,
                                }}
                                style={{
                                    background: activeSubItem === traveling2021 ? blue300 : undefined,
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
                                bg: gray300,
                            }}
                            style={{
                                padding: "10px",
                                background: "white",
                            }}
                        >
                            {activeItem === settings ? (
                                <RiSettings5Fill color="black" />
                            ) : (
                                <RiSettings5Line color="black" />
                            )}
                        </Button>
                    </MenuTrigger>
                    <MenuContent bg="white">
                        <MenuItem
                            value={settings}
                            onClick={() => onMenuItemClick(settings)}
                            color="black"
                            _hover={{
                                bg: gray300,
                            }}
                            style={{
                                background: activeSubItem === settings ? bluegray300 : undefined,
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
