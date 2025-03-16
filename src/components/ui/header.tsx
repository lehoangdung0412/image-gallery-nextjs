"use client";
import { Avatar, Box, Text } from "@chakra-ui/react";

const Header = ({ isVisible, isWideScreen }: { isVisible: boolean; isWideScreen: boolean }) => {
    return (
        <Box
            as="header"
            position="fixed"
            top={0}
            right={0}
            height="80px"
            w={isWideScreen ? "100%" : "80%"}
            bg="white"
            color="black"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            px={isWideScreen ? 8 : 4}
            zIndex={1}
            transition="transform 0.1s ease-in-out"
            transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
        >
            {isWideScreen ? (
                <Text fontSize="xl" fontWeight="bold" letterSpacing="wide" mr="20px">
                    Hue Yomi - Vincent
                </Text>
            ) : (
                <Text fontSize="md" fontWeight="bold" letterSpacing="wide" mr="10px">
                    Yomi - Vincent
                </Text>
            )}
            <Avatar.Root>
                <Avatar.Fallback name="Hue Yomi - Vincent" />
                <Avatar.Image src="/images/avatar.jpg" />
            </Avatar.Root>
        </Box>
    );
};

export default Header;
