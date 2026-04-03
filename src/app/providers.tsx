"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"
import config from "@/RainbowKitConfig"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider, darkTheme} from "@rainbow-me/rainbowkit"

export function Providers(props: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme({
                    borderRadius: "large", accentColor: '#DEE7F1',
                    accentColorForeground: 'black',
                })}>
                    {props.children}
                </RainbowKitProvider>
                <div className="bg-[#a4b7cc]"></div>
            </QueryClientProvider>
        </WagmiProvider>
    )
}