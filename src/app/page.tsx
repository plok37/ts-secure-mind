"use client";

import ConnectWallet from "@/components/connect-wallet/ConnectWallet";
import { useAccount } from "wagmi";
import HomePage from "@/components/homepage/HomePage";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/loading";

export default function Home() {
  // For showing the loading screen and connection status
  const { isConnected, status } = useAccount();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const loading = !isHydrated || status === "connecting" || status === "reconnecting";
  const showConnect = isHydrated && status === "disconnected";
  const showHome = isHydrated && isConnected;

  // Scroll to the element with the ID from the URL hash when the page being rendered (every time the component mounts)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      console.log("Hash found in URL:", window.location.hash);
      const id = window.location.hash.replace("#", "");
      console.log("Scrolling to element with ID:", id);
      const el = document.getElementById(id);
      console.log("Element found:", el);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  return (
    <>
      <LoadingScreen loading={loading} />
      {showConnect && <ConnectWallet />}
      {showHome && <HomePage />}
    </>
  );
}