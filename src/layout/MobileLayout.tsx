import { ReactNode } from "react";
import { Box, Button, List, Text } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import HamburgerMenu from "@/components/ui/hamburger-menu";
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
    RiHeartsFill,
    RiHeartsLine,
    RiHomeHeartFill,
    RiHomeHeartLine,
    RiPlanetFill,
    RiPlanetLine,
    RiSettings5Fill,
    RiSettings5Line,
} from "react-icons/ri";

interface MobileLayoutProps {
    children: ReactNode;
    isVisible: boolean;
    isOpenHamburgerMenu: boolean;
    onHamburgerMenuClick: () => void;
    onMenuItemClick: (item: string) => void;
    activeItem: string | null;
    activeSubItem: string | null;
}

export const MobileLayout = ({
    children,
    isVisible,
    isOpenHamburgerMenu,
    onHamburgerMenuClick,
    onMenuItemClick,
    activeItem,
    activeSubItem,
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
                    <Header isVisible={true} isWideScreen={false} />
                    <List.Root mx="25px" my="5px" variant="plain" align="center">
                        <List.Item>
                            <Button
                                onClick={() => handleMenuItemClick(home)}
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
                                <Text ml="15px" fontSize="md" fontWeight="semibold" color="black">
                                    Home
                                </Text>
                            </Button>
                        </List.Item>
                        <List.Item>
                            <Box>
                                <Button
                                    _hover={{
                                        bg: red200,
                                    }}
                                    style={{
                                        padding: "10px",
                                        background: "white",
                                        pointerEvents: "none",
                                    }}
                                >
                                    {activeItem === "wedding" ? (
                                        <RiHeartsFill color="red" />
                                    ) : (
                                        <RiHeartsLine color="black" />
                                    )}
                                    <Text ml="15px" fontSize="md" fontWeight="semibold" color="black">
                                        Wedding
                                    </Text>
                                </Button>
                                <List.Root ps="38px">
                                    <Button
                                        value={maison}
                                        onClick={() => handleMenuItemClick(maison)}
                                        color="black"
                                        _hover={{
                                            bg: red200,
                                        }}
                                        style={{
                                            background: activeSubItem === maison ? red300 : "white",
                                            justifyContent: "left",
                                        }}
                                    >
                                        Wedding in Maison 10/01/2024
                                    </Button>
                                    <Button
                                        value={groom}
                                        onClick={() => handleMenuItemClick(groom)}
                                        color="black"
                                        _hover={{
                                            bg: red200,
                                        }}
                                        style={{
                                            background: activeSubItem === groom ? red300 : "white",
                                            justifyContent: "left",
                                        }}
                                    >
                                        Wedding 07/01/2024 (Groom's family)
                                    </Button>
                                    <Button
                                        value={bride}
                                        onClick={() => handleMenuItemClick(bride)}
                                        color="black"
                                        _hover={{
                                            bg: red200,
                                        }}
                                        style={{
                                            background: activeSubItem === bride ? red300 : "white",
                                            justifyContent: "left",
                                        }}
                                    >
                                        Wedding 07/01/2024 (Bride's family)
                                    </Button>
                                    <Button
                                        value={departure}
                                        onClick={() => handleMenuItemClick(departure)}
                                        color="black"
                                        _hover={{
                                            bg: red200,
                                        }}
                                        style={{
                                            background: activeSubItem === departure ? red300 : "white",
                                            justifyContent: "left",
                                        }}
                                    >
                                        Wedding 06/01/2024
                                    </Button>
                                    <Button
                                        value={engagement}
                                        onClick={() => handleMenuItemClick(engagement)}
                                        color="black"
                                        _hover={{
                                            bg: red200,
                                        }}
                                        style={{
                                            background: activeSubItem === engagement ? red300 : "white",
                                            justifyContent: "left",
                                        }}
                                    >
                                        Engagement Ceremony
                                    </Button>
                                    <Button
                                        value={preWedding}
                                        onClick={() => handleMenuItemClick(preWedding)}
                                        color="black"
                                        _hover={{
                                            bg: red200,
                                        }}
                                        style={{
                                            background: activeSubItem === preWedding ? red300 : "white",
                                            justifyContent: "left",
                                        }}
                                    >
                                        Pre-Wedding
                                    </Button>
                                </List.Root>
                            </Box>
                        </List.Item>
                        <List.Item>
                            <Box>
                                <Button
                                    _hover={{
                                        bg: blue200,
                                    }}
                                    style={{
                                        padding: "10px",
                                        background: "white",
                                        pointerEvents: "none",
                                    }}
                                >
                                    {activeItem === "traveling" ? (
                                        <RiPlanetFill color={blue900} />
                                    ) : (
                                        <RiPlanetLine color="black" />
                                    )}
                                    <Text ml="15px" fontSize="md" fontWeight="semibold" color="black">
                                        Traveling
                                    </Text>
                                </Button>
                                <List.Root ps="38px">
                                    <Button
                                        value={traveling2025}
                                        onClick={() => handleMenuItemClick(traveling2025)}
                                        color="black"
                                        _hover={{
                                            bg: blue200,
                                        }}
                                        style={{
                                            background: activeSubItem === traveling2025 ? blue300 : "white",
                                        }}
                                    >
                                        Traveling in 2025
                                    </Button>
                                    <Button
                                        value={traveling2024}
                                        onClick={() => handleMenuItemClick(traveling2024)}
                                        color="black"
                                        _hover={{
                                            bg: blue200,
                                        }}
                                        style={{
                                            background: activeSubItem === traveling2024 ? blue300 : "white",
                                        }}
                                    >
                                        Traveling in 2024
                                    </Button>
                                    <Button
                                        value={traveling2023}
                                        onClick={() => handleMenuItemClick(traveling2023)}
                                        color="black"
                                        _hover={{
                                            bg: blue200,
                                        }}
                                        style={{
                                            background: activeSubItem === traveling2023 ? blue300 : "white",
                                        }}
                                    >
                                        Traveling in 2023
                                    </Button>
                                    <Button
                                        value={traveling2022}
                                        onClick={() => handleMenuItemClick(traveling2022)}
                                        color="black"
                                        _hover={{
                                            bg: blue200,
                                        }}
                                        style={{
                                            background: activeSubItem === traveling2022 ? blue300 : "white",
                                        }}
                                    >
                                        Traveling in 2022
                                    </Button>
                                    <Button
                                        value={traveling2021}
                                        onClick={() => handleMenuItemClick(traveling2021)}
                                        color="black"
                                        _hover={{
                                            bg: blue200,
                                        }}
                                        style={{
                                            background: activeSubItem === traveling2021 ? blue300 : "white",
                                        }}
                                    >
                                        Traveling in 2021
                                    </Button>
                                </List.Root>
                            </Box>
                        </List.Item>
                        <List.Item>
                            <Box>
                                <Button
                                    _hover={{
                                        bg: gray300,
                                    }}
                                    style={{
                                        padding: "10px",
                                        background: "white",
                                        pointerEvents: "none",
                                    }}
                                >
                                    {activeItem === settings ? (
                                        <RiSettings5Fill color="black" />
                                    ) : (
                                        <RiSettings5Line color="black" />
                                    )}
                                    <Text ml="15px" fontSize="md" fontWeight="semibold" color="black">
                                        Settings
                                    </Text>
                                </Button>
                                <List.Root ps="38px">
                                    <Button
                                        value={settings}
                                        onClick={() => handleMenuItemClick(settings)}
                                        color="black"
                                        _hover={{
                                            bg: gray300,
                                        }}
                                        style={{
                                            background: activeSubItem === settings ? bluegray300 : "white",
                                        }}
                                    >
                                        This is Settings demo
                                    </Button>
                                </List.Root>
                            </Box>
                        </List.Item>
                    </List.Root>
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
