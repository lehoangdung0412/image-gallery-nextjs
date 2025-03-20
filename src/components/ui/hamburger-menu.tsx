"use client";
import { Box, Button } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

const HamburgerMenu = ({
    isVisible,
    onHamburgerMenuClick,
    isOpenHamburgerMenu,
}: {
    isVisible: boolean;
    onHamburgerMenuClick: (open: boolean) => void;
    isOpenHamburgerMenu: boolean;
}) => {
    const handleClick = () => {
        onHamburgerMenuClick(!isOpenHamburgerMenu);
    };

    const icon = isOpenHamburgerMenu ? <AiOutlineClose color="black" /> : <RxHamburgerMenu color="black" />;
    const buttonStyles = {
        _focus: { outline: "none" },
        padding: "10px",
        background: "white",
        transition: "transform 0.3s ease-in-out", // Add smooth transition for transform
        transform: isOpenHamburgerMenu ? "rotate(90deg)" : "rotate(0deg)", // Rotate icon on click
    };

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
            <Button onClick={handleClick} {...buttonStyles}>
                {icon}
            </Button>
        </Box>
    );
};

export default HamburgerMenu;
