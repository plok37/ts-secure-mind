"use client"

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/loading";
import PrivacyPolicy from "@/components/misc/PrivacyPolicy";

export default function NFTStorePage() {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const loading = !isHydrated;

    return (
        <>
            <LoadingScreen loading={loading} />
            {<PrivacyPolicy />}
        </>
    )
}