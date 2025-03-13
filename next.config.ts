import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    reactStrictMode: false,
    output: "export",
};

export default nextConfig;
