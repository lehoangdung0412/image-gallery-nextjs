import { Button, List, Text, Box } from "@chakra-ui/react";
import {
    blue200,
    blue300,
    blue900,
    bluegray300,
    gray300,
    green200,
    green300,
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

interface MobileMenuListProps {
    activeItem: string | null;
    activeSubItem: string | null;
    handleMenuItemClick: (item: string) => void;
}

const MobileMenuList = ({ activeItem, activeSubItem, handleMenuItemClick }: MobileMenuListProps) => {
    return (
        <List.Root mx="25px" my="5px" variant="plain" align="center">
            <List.Item>
                <Button
                    onClick={() => handleMenuItemClick(home)}
                    _hover={{
                        bg: green200,
                    }}
                    bg={activeItem === home ? green300 : "white"}
                    p="10px"
                    w="86vw"
                    display="flex"
                    justifyContent="flex-start"
                >
                    {activeItem === home ? <RiHomeHeartFill color={green900} /> : <RiHomeHeartLine color="black" />}
                    <Text mx="15px" fontSize="md" fontWeight="semibold" color="black">
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
                        bg="white"
                        p="10px"
                        style={{
                            pointerEvents: "none",
                        }}
                    >
                        {activeItem === "wedding" ? <RiHeartsFill color="red" /> : <RiHeartsLine color="black" />}
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
                            bg={activeSubItem === maison ? red300 : "white"}
                            w="77vw"
                            display="flex"
                            justifyContent="flex-start"
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
                            bg={activeSubItem === groom ? red300 : "white"}
                            display="flex"
                            justifyContent="flex-start"
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
                            bg={activeSubItem === bride ? red300 : "white"}
                            display="flex"
                            justifyContent="flex-start"
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
                            bg={activeSubItem === departure ? red300 : "white"}
                            display="flex"
                            justifyContent="flex-start"
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
                            bg={activeSubItem === engagement ? red300 : "white"}
                            display="flex"
                            justifyContent="flex-start"
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
                            bg={activeSubItem === preWedding ? red300 : "white"}
                            display="flex"
                            justifyContent="flex-start"
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
                        p="10px"
                        bg="white"
                        style={{
                            pointerEvents: "none",
                        }}
                    >
                        {activeItem === "traveling" ? <RiPlanetFill color={blue900} /> : <RiPlanetLine color="black" />}
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
                            bg={activeSubItem === traveling2025 ? blue300 : "white"}
                            w="77vw"
                            display="flex"
                            justifyContent="flex-start"
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
                            bg={activeSubItem === traveling2024 ? blue300 : "white"}
                            w="77vw"
                            display="flex"
                            justifyContent="flex-start"
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
                            bg={activeSubItem === traveling2023 ? blue300 : "white"}
                            w="77vw"
                            display="flex"
                            justifyContent="flex-start"
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
                            bg={activeSubItem === traveling2022 ? blue300 : "white"}
                            w="77vw"
                            display="flex"
                            justifyContent="flex-start"
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
                            bg={activeSubItem === traveling2021 ? blue300 : "white"}
                            w="77vw"
                            display="flex"
                            justifyContent="flex-start"
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
                        p="10px"
                        bg="white"
                        style={{
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
                            bg={activeSubItem === settings ? bluegray300 : "white"}
                            w="77vw"
                            display="flex"
                            justifyContent="flex-start"
                        >
                            This is Settings demo
                        </Button>
                    </List.Root>
                </Box>
            </List.Item>
        </List.Root>
    );
};

export default MobileMenuList;
