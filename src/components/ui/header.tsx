"use client";
import { Avatar, Box, Tabs, Text } from "@chakra-ui/react";
import { home, imagesTab, videosTab } from "@/constants";
import { FaPhotoVideo } from "react-icons/fa";
import { gray200, green900 } from "@/constants/colors";
import { IoImages, IoImagesOutline } from "react-icons/io5";
import { LiaPhotoVideoSolid } from "react-icons/lia";

const Header = ({
    isVisible,
    isWideScreen,
    currentTab,
    onCurrentTab,
    activeItem,
}: {
    isVisible: boolean;
    isWideScreen: boolean;
    currentTab: string;
    onCurrentTab: (item: string) => void;
    activeItem: string | null;
}) => {
    const headerText = isWideScreen ? "Hue Yomi - Vincent" : "Yomi - Vincent";
    const fontSize = isWideScreen ? "xl" : "md";
    const paddingX = isWideScreen ? 8 : 4;
    const marginRight = isWideScreen ? "20px" : "10px";
    const width = isWideScreen ? "calc(100% - 72px)" : "90%";

    return (
        <Box
            as="header"
            position="fixed"
            ml="72px"
            top={0}
            right={0}
            height="80px"
            width={width}
            bg="white"
            color="black"
            display="flex"
            alignItems="center"
            px={paddingX}
            zIndex={1}
            transition="transform 0.1s ease-in-out"
            transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
            justifyContent="space-between"
        >
            <Box display="flex" alignItems="center">
                {activeItem === home ? undefined : (
                    <Tabs.Root defaultValue={imagesTab} variant="plain">
                        <Tabs.List bg={gray200} rounded="l3">
                            <Tabs.Trigger
                                value={imagesTab}
                                onClick={() => onCurrentTab(imagesTab)}
                                minWidth="70px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                {currentTab === imagesTab ? (
                                    <IoImages color={green900} size="15px" />
                                ) : (
                                    <IoImagesOutline color="black" size="15px" />
                                )}
                                {isWideScreen ? <Text color="black">Images</Text> : ""}
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value={videosTab}
                                onClick={() => onCurrentTab(videosTab)}
                                minWidth="70px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                {currentTab === videosTab ? (
                                    <FaPhotoVideo color={green900} size="17px" />
                                ) : (
                                    <LiaPhotoVideoSolid color="black" size="17px" />
                                )}
                                {isWideScreen ? <Text color="black">Videos</Text> : ""}
                            </Tabs.Trigger>
                            <Tabs.Indicator rounded="l2" bg="white" boxShadow={`0px 5px 10px ${gray200}`} />
                        </Tabs.List>
                    </Tabs.Root>
                )}
            </Box>
            <Box display="flex" alignItems="center">
                <Text fontSize={fontSize} fontWeight="bold" letterSpacing="wide" mr={marginRight}>
                    {headerText}
                </Text>
                <Avatar.Root>
                    <Avatar.Fallback name="Hue Yomi - Vincent" />
                    <Avatar.Image src="/images/avatar.jpg" />
                </Avatar.Root>
            </Box>
        </Box>
    );
};

export default Header;
