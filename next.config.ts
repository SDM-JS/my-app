import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ik.imagekit.io"
            }
        ]
    },
    allowedDevOrigins: ["http://192.168.123.111"]
};