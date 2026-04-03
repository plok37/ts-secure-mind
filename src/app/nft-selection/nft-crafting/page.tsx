"use client"

import ConnectWallet from "@/components/connect-wallet/ConnectWallet";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import LoadingScreen from "@/components/loading";
import NftCrafting from "@/components/nft-page/nft-crafting";

export default function NFTStorePage() {
    const { isConnected, status } = useAccount();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const loading = !isHydrated || status === "connecting" || status === "reconnecting";
    const showConnect = isHydrated && status === "disconnected";
    const showHome = isHydrated && isConnected;

    return (
        <>
            <LoadingScreen loading={loading} />
            {showConnect && <ConnectWallet />}
            {showHome && <NftCrafting />}
        </>
    )
}