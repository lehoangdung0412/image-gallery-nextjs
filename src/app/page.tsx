"use client";

import { useEffect, useState } from "react";
import SplashPage from "@/components/ui/splash-page";
import { VideoPage } from "@/app/video/page";

export default function HomePage() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        setTimeout(() => setShowSplash(false), 3500);
    }, []);

    return showSplash ? <SplashPage /> : <VideoPage />;
}

function MainContent() {
    return <div>This is my Home page</div>;
}
