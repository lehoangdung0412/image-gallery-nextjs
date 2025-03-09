import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function SplashPage() {
    const [typingDone, setTypingDone] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (typingDone) {
            setTimeout(() => setFadeOut(true), 2000); // Delay before fading out
        }
    }, [typingDone]);

    return (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: fadeOut ? 0 : 1 }} transition={{ duration: 1 }}>
            <Box
                w="100vw"
                h="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.900"
                color="white"
                position="relative"
            >
                <Text
                    fontSize="5xl"
                    fontWeight="bold"
                    style={{
                        background: "linear-gradient(45deg, #ff7c00, #9b00ff)", // Gradient effect for text
                        backgroundClip: "text", // Apply gradient only to text
                        color: "transparent", // Make text transparent to show the gradient
                        textShadow: "0 0 10px rgba(255, 124, 0, 0.7), 0 0 20px rgba(155, 0, 255, 0.6)", // Glowing effect
                    }}
                >
                    <Typewriter
                        words={["Hello, welcome to our channel!!!"]}
                        typeSpeed={100}
                        onLoopDone={() => setTypingDone(true)}
                    />
                </Text>
            </Box>
        </motion.div>
    );
}
