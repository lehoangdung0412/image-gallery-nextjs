"use client";
import { Box, Button } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { red200 } from "@/constants/colors";

const HamburgerMenu = ({
    isVisible,
    onHamburgerMenuClick,
    isOpenHamburgerMenu,
}: {
    isVisible: boolean;
    onHamburgerMenuClick: (onHamburgerMenuClick: boolean) => void;
    isOpenHamburgerMenu: boolean;
}) => {
    return (
        <Box
            as="header"
            position="fixed"
            top={0}
            height="80px"
            w="20%"
            bg="white"
            color="black"
            display="flex"
            alignItems="center"
            px={2}
            zIndex={3}
            transition="transform 0.1s ease-in-out"
            transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
        >
            {isOpenHamburgerMenu ? (
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
                    onClick={() => onHamburgerMenuClick(false)}
                >
                    <AiOutlineClose />
                </Button>
            ) : (
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
                    onClick={() => onHamburgerMenuClick(true)}
                >
                    <RxHamburgerMenu />
                </Button>
            )}
        </Box>
    );
};

export default HamburgerMenu;
