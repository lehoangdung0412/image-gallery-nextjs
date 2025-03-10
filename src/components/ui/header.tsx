import { Avatar, Box, Text } from "@chakra-ui/react";

const Header = () => {
    return (
        <Box
            as="header"
            position="fixed"
            top={0}
            left="72px  " // Avoid overlap the sidebar
            right={0}
            height="80px"
            bg="white"
            color="black"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            px={8}
            zIndex={1000}
        >
            <Text fontSize="3xl" fontWeight="bold" letterSpacing="wider" mr="20px">
                Hue Yomi - Vincent
            </Text>
            <Avatar.Root>
                <Avatar.Fallback name="Hue Yomi - Vincent" />
                <Avatar.Image src="/image/avatar.jpg" />
            </Avatar.Root>
        </Box>
    );
};

export default Header;
