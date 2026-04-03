"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import SecureMindHeaderLogo from "@/components/header/SecureMindHeaderLogo"
import Link from "next/link"

export default function Header() {
    const { isConnected } = useAccount()
    return (
        <main>
            <nav
                className="px-25 py-4 border-zinc-300 flex flex-row justify-between items-center xl:min-h-[77px] fixed w-full backdrop-blur-[2px] bg-a/50 z-20 border-b-gray-350/100 border-b-[1px]"
            >
                {!isConnected ? (
                    <>
                        <SecureMindHeaderLogo />
                        <h3 className="italic text-left hidden text-black lg:block  text-xl font-h1">
                            Smart Contract Security Educational Platform
                        </h3>
                        <div className="flex items-center gap-4">
                            {/* <ConnectButton /> */}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="justify-between items-center flex w-full">
                            <nav className="justify-between flex gap-x-17">
                                <SecureMindHeaderLogo />
                                <nav className="flex text-lg justify-start items-center gap-x-12 font-h1">
                                    <Link className="hidden lg:block animated-header-link" href="/#learning">Learning</Link>
                                    <Link className="hidden lg:block animated-header-link" href="/#challenges">Challenges</Link>
                                    <Link className="hidden lg:block animated-header-link" href="/#real-world-scenario">Real-World Scenario</Link>
                                    <Link className="hidden lg:block animated-header-link" href="/nft-selection">NFT</Link>
                                    <Link className="hidden lg:block animated-header-link" href="/#faqs">FAQs</Link>
                                </nav>
                            </nav>
                            <ConnectButton />
                        </div>
                    </>
                )}
            </nav>
        </main>
    )
}