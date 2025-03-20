"use client";
import { Avatar, Box, Text } from "@chakra-ui/react";

const Header = ({ isVisible, isWideScreen }: { isVisible: boolean; isWideScreen: boolean }) => {
    const headerText = isWideScreen ? "Hue Yomi - Vincent" : "Yomi - Vincent";
    const fontSize = isWideScreen ? "xl" : "md";
    const paddingX = isWideScreen ? 8 : 4;
    const marginRight = isWideScreen ? "20px" : "10px";
    const width = isWideScreen ? "100%" : "80%";

    return (
        <Box
            as="header"
            position="fixed"
            top={0}
            right={0}
            height="80px"
            width={width}
            bg="white"
            color="black"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            px={paddingX}
            zIndex={1}
            transition="transform 0.1s ease-in-out"
            transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
        >
            <Text fontSize={fontSize} fontWeight="bold" letterSpacing="wide" mr={marginRight}>
                {headerText}
            </Text>
            <Avatar.Root>
                <Avatar.Fallback name="Hue Yomi - Vincent" />
                <Avatar.Image src="/images/avatar.jpg" />
            </Avatar.Root>
        </Box>
    );
};

export default Header;
