import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import RecentlyListedNFTs from "./RecentlyListed";
import { useChainId } from "wagmi"
import { chainsToContracts } from "@/contractConstants"

export default function NftMarketplacePage() {
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
                    <div className="relative 2xl:px-44 py-31 min-h-screen">
                        <div className="bg-a/75 rounded-lg px-8 py-6 shadow-lg w-full max-w-6xl flex items-center justify-between">
                            {/* Info Section */}
                            <div>
                                <h1 className="text-5xl font-h1 font-bold text-white mb-2 tracking-wide flex items-center gap-2">
                                    SecureMind <span className="text-c">NFT</span> <span className="text-d-400">Marketplace</span>
                                </h1>
                                <p className="text-xl font-h1 text-white mt-2">
                                    Buy unique NFTs or list your own for sale in a secure, community-driven marketplace.<br />
                                    <span className="text-base text-white/80">Trade safely. Own your digital assets.</span>
                                </p>
                            </div>
                            {/* List NFT Button Section */}
                            <div className="flex flex-col ml-8">
                                <a
                                    className="bg-c text-d font-bold px-6 py-3 rounded-lg shadow-md hover:bg-c-600 transition-colors text-lg text-center" href='/nft-selection/nft-marketplace/list-nft'
                                >
                                    List Your NFT
                                </a>
                                <span className="text-sm text-c mt-2">Start selling your own NFT</span>
                            </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mt-6 mb-1 text-d font-h1 underline underline-offset-10">
                            Listed NFTs
                        </h2>
                        <RecentlyListedNFTs />
                    </div>
                </>
            )}
        </>
    )
}