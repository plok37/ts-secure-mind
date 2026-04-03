"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { anvil, zksync } from "wagmi/chains" 
import '@rainbow-me/rainbowkit/styles.css';

export default getDefaultConfig({
    appName: "TSender",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [anvil, zksync],
    ssr: true,
})

