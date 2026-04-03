import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import Link from "next/link";
import { useState } from "react";
import { useChainId } from "wagmi"
import { chainsToContracts } from "@/contractConstants"

export default function NftSelectionPage() {
    const [hoveredMarketplace, setHoveredMarketplace] = useState(false);
    const [hoveredCrafting, setHoveredCrafting] = useState(false);
    const chainId = useChainId();
    const chainSupported =
        chainId in chainsToContracts
    return (
        <>
            {!chainSupported ? (
                <>
                    <AnimatedGridBackground />
                    <div className="min-h-screen relative z-10">
                        <div className="pt-40 px-66 flex flex-col min-h-screen">
                            <div className="p-8 rounded-xl shadow-sm border border-a-400/20 bg-gray-400/50 text-center">
                                <p className="text-lg text-red-600 mb-4">
                                    The current network is not supported. Please switch to a supported
                                    network.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <AnimatedGridBackground />
                    <div className="flex justify-center items-center min-h-screen gap-20">
                        {/* NFT Marketplace Card */}
                        <Link href="/nft-selection/nft-marketplace" className="block">
                            <div
                                className="relative w-100 h-130 rounded-2xl overflow-visible transition-shadow duration-500"
                                style={{ perspective: 1200 }}
                                onMouseEnter={() => setHoveredMarketplace(true)}
                                onMouseLeave={() => setHoveredMarketplace(false)}
                            >
                                {/* Card tilt and shadow effect */}
                                <div
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transition: "transform 0.6s cubic-bezier(.25,.8,.25,1)",
                                        boxShadow: hoveredMarketplace ? "0 30px 60px 0 rgba(0,0,0,0.35)" : "0 8px 24px 0 rgba(0,0,0,0.18)",
                                        borderRadius: "1rem",
                                        background: "#23272f",
                                        transform: hoveredMarketplace
                                            ? "rotateX(18deg) scale(1.03)"
                                            : "rotateX(0deg) scale(1)"
                                    }}
                                >
                                    {/* Main image (background) */}
                                    <img src="/nft-selection/nft-marketplace.png" alt="Background" className="w-full h-full object-cover rounded-2xl" style={{ backfaceVisibility: "hidden" }} />
                                    {/* Foreground character image, pops out in 3D */}
                                    <img
                                        src="/nft-selection/buyer.png"
                                        alt="Animated"
                                        className="absolute left-1/2 bottom-20 w-44 h-60 object-contain pointer-events-none"
                                        style={{
                                            transition: "transform 0.7s cubic-bezier(.25,.8,.25,1), opacity 0.5s",
                                            transform: hoveredMarketplace
                                                ? "translate(-45%, 0) translateZ(80px) scale(1.13) rotateX(-18deg)"
                                                : "translate(-50%, 0) translateZ(0px) scale(1) rotateX(0deg)",
                                            opacity: hoveredMarketplace ? 1 : 0,
                                            zIndex: 3
                                        }}
                                    />
                                    {/* NFT Marketplace text always on top */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 z-10 pointer-events-none">
                                        <h1 className="text-4xl font-bold text-a  tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--heading-font)' }}>
                                            NFT Marketplace
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        {/* Crafting Card */}
                        <Link href="/nft-selection/nft-crafting" className="block">
                            <div
                                className="relative w-100 h-130 rounded-2xl overflow-visible transition-shadow duration-500"
                                style={{ perspective: 1200 }}
                                onMouseEnter={() => setHoveredCrafting(true)}
                                onMouseLeave={() => setHoveredCrafting(false)}
                            >
                                <div
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transition: "transform 0.6s cubic-bezier(.25,.8,.25,1)",
                                        boxShadow: hoveredCrafting ? "0 30px 60px 0 rgba(0,0,0,0.35)" : "0 8px 24px 0 rgba(0,0,0,0.18)",
                                        borderRadius: "1rem",
                                        background: "#23272f",
                                        transform: hoveredCrafting
                                            ? "rotateX(18deg) scale(1.03)"
                                            : "rotateX(0deg) scale(1)"
                                    }}
                                >
                                    {/* Main image (background) - you can change this image for Crafting */}
                                    <img src="/nft-selection/crafting-place.png" alt="Background" className="w-full h-full object-cover rounded-2xl" style={{ backfaceVisibility: "hidden" }} />
                                    {/* Foreground character image, pops out in 3D - you can change this image for Crafting */}
                                    <img
                                        src="/nft-selection/miner.png"
                                        alt="Animated"
                                        className="absolute left-1/2 bottom-22 w-44 h-60 object-contain pointer-events-none"
                                        style={{
                                            transition: "transform 0.7s cubic-bezier(.25,.8,.25,1), opacity 0.5s",
                                            transform: hoveredCrafting
                                                ? "translate(-45%, 0) translateZ(80px) scale(1.13) rotateX(-18deg)"
                                                : "translate(-50%, 0) translateZ(0px) scale(1) rotateX(0deg)",
                                            opacity: hoveredCrafting ? 1 : 0,
                                            zIndex: 3
                                        }}
                                    />
                                    {/* Crafting text always on top */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 z-10 pointer-events-none">
                                        <h1 className="text-4xl font-bold text-a tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--heading-font)' }}>
                                            Crafting
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </>
    );
}