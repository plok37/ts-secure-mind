import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import { useState } from "react";
import Image from "next/image";
import {
    useChainId,
    useWriteContract,
    useReadContract,
    useWaitForTransactionReceipt,
} from "wagmi"
import { secureMindRobotAbi, chainsToContracts, secureMindTokenAbi } from "@/contractConstants"
import { useMemo, useEffect } from "react";
import { CgSpinner } from "react-icons/cg"

export default function NftCraftingPage() {
    const chainId = useChainId();
    // Remove hasMinted, use step state instead
    const [step, setStep] = useState<"init" | "approving" | "minting" | "minted">("init");
    const [nftImageUrl, setNftImageUrl] = useState<string | null>(null)
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [nftAttributes, setNftAttributes] = useState<any[]>([]);

    const secureMindRobotAddress = useMemo(() => {
        return (chainsToContracts[chainId]?.secureMindRobotNft as `0x${string}`) || null
    }, [chainId])
    const secureMindTokenAddress = (chainsToContracts[chainId]?.secureMindToken as `0x${string}`) || "0x"

    const chainSupported =
        chainId in chainsToContracts

    const {
        data: priceData,
        isLoading: isPricingLoading,
    } = useReadContract({
        abi: secureMindRobotAbi,
        address: secureMindRobotAddress as `0x${string}`,
        functionName: "getPrice",
        args: [BigInt(1)],
    })

    // Destructure price data if available
    const price = priceData as Number

    const {
        data: approvalHash,
        isPending: isApprovalPending,
        writeContract: approveSCMToken,
        error: approvalError,
    } = useWriteContract()

    const {
        data: mintingHash,
        isPending: isMintingPending,
        writeContract: mintRobot,
        error: mintingError,
    } = useWriteContract()

    // Transaction receipts
    const { isSuccess: isApprovalSuccess } = useWaitForTransactionReceipt({
        hash: approvalHash,
    })

    const { isSuccess: isMintingSuccess } = useWaitForTransactionReceipt({
        hash: mintingHash,
    })

    // Handle approve token
    const handleApprove = async () => {
        if (!price) return
        setStep("approving");
        try {
            await approveSCMToken({
                abi: secureMindTokenAbi,
                address: secureMindTokenAddress,
                functionName: "approve",
                args: [secureMindRobotAddress, price],
            })
        } catch (error) {
            setStep("init");
            console.error("Error approving token:", error)
        }
    }

    // Function to handle minting
    const handleMint = async () => {
        setStep("minting");
        try {
            await mintRobot({
                abi: secureMindRobotAbi,
                address: secureMindRobotAddress,
                functionName: "publicMintRobot",
            })
        } catch (error: any) {
            // If user rejected, reset to approving so user can try again
            if (error?.message?.toLowerCase().includes("user rejected")) {
                setStep("approving");
            } else {
                setStep("approving");
            }
            console.error("Error buying NFT:", error)
        }
    };

    const {
        data: totalMintedData,
        isLoading: isTotalMintedLoading,
        refetch: refetchTotalMinted,
    } = useReadContract({
        abi: secureMindRobotAbi,
        address: secureMindRobotAddress as `0x${string}`,
        functionName: "getNumMinted"
    })

    useEffect(() => {
        if (isMintingSuccess) {
            refetchTotalMinted();
        }
    }, [isMintingSuccess, refetchTotalMinted]);

    // Destructure price data if available
    const totalMinted = useMemo(() => {
        return totalMintedData as number;
    }, [totalMintedData])


    // Calculate the tokenId to preview
    const tokenId = useMemo(() => {
        // If minting is pending, show the previous tokenId (the one before totalMinted)
        if (isMintingPending && totalMinted > 1) {
            return Number(totalMinted) - 1;
        }
        // If minting is successful, show the latest minted token
        return Number(totalMinted);
    }, [totalMinted, isMintingPending])

    // Fetch the tokenURI from the contract
    const {
        data: tokenURIData,
        isLoading: isTokenURILoading,
        error: tokenURIError,
    } = useReadContract({
        abi: secureMindRobotAbi,
        address: secureMindRobotAddress as `0x${string}`,
        functionName: "tokenURI",
        args: [tokenId ? BigInt(tokenId) : undefined],
        query: {
            enabled: !!tokenId,
        },
    })

    // // Fetch the metadata and extract image URL when tokenURI is available
    useEffect(() => {
        if (step === "minted" && tokenURIData && !isTokenURILoading) {
            const fetchMetadata = async () => {
                setIsLoadingImage(true)
                try {
                    const uri = tokenURIData as string
                    let metadata;
                    const base64 = uri.replace("data:application/json;base64,", "");
                    const json = atob(base64);
                    metadata = JSON.parse(json);
                    let imageUrl = metadata.image;
                    setNftImageUrl(imageUrl);
                    setNftAttributes(metadata.attributes || []);
                } catch (error) {
                    setImageError(true)
                } finally {
                    setIsLoadingImage(false)
                }
            }
            fetchMetadata()
        }
    }, [step, tokenURIData, isTokenURILoading])

    // Reset state for another mint
    const handleAnotherMint = async () => {
        setStep("init");
        setNftImageUrl(null);
        setNftAttributes([]);
        setImageError(false);
    }

    // Only set step to minted after minting is successful
    useEffect(() => {
        // If minting error is user rejected, reset step to approving
        if (mintingError && mintingError.message?.toLowerCase().includes("user rejected")) {
            setStep("approving");
        }
        if (isMintingSuccess && step === "minting") {
            setStep("minted");
        }
    }, [isMintingSuccess, step, mintingError]);

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
                    <div className="min-h-screen relative z-10">
                        {/* Header Section */}
                        <div className="pt-30 px-44 flex flex-row gap-13">
                            <div className="flex flex-col">
                                <span className="text-5xl font-semibold text-a-400 font-h1">SecureMind Robot Factory</span>
                                <span className="mt-2 text-lg text-a-400 font-h2">Craft your unique SecureMind robot NFT</span>
                            </div>
                        </div>
                        <div className="flex flex-row px-44 mt-10 min-h-[670px] mb-16 gap-10">
                            <div className="bg-gray-400/50 w-11/20 rounded-lg px-6 pt-4 border border-a-400/20">
                                <h3 className="text-xl font-bold text-a-300 font-h1 mb-4">Robot Preview</h3>
                                <div className="flex items-center justify-center relative">
                                    {/* Always show unfinished robot unless step is minted and image loaded */}
                                    {(step !== "minted" || !nftImageUrl || imageError) ? (
                                        <img
                                            src="/nft-crafting/uncompleted-robot.png"
                                            alt="Unfinished Robot Construction"
                                            className="w-144 h-144 rounded-lg border-2 border-a-400/30 object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-144 h-144">
                                            <Image
                                                src={nftImageUrl}
                                                alt={`SecureMind Robot ${tokenId}`}
                                                width={576}
                                                height={576}
                                                className="rounded-lg border-2 border-a-400/30 flex"
                                                onError={() => setImageError(true)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-7 w-9/20">
                                <div className="bg-gray-400/50 rounded-lg pt-4 px-6 h-7/20 border border-a-400/20">
                                    <h3 className="text-xl font-bold font-h1 text-a-300 mb-6">
                                        Mint Your Robot
                                    </h3>
                                    <div className="">
                                        <div className="flex justify-between text-lg">
                                            <span className="text-a-400 font-h2 font-semibold">Price :</span>
                                            {isPricingLoading ? (
                                                <div className="flex gap-4">
                                                    <span className="text-a-400 font-bold animate-pulse">loading...</span>
                                                    <span className="text-a-400 font-bold font-h2"> SCM</span>
                                                </div>
                                            ) : (
                                                <span className="text-a-400 font-bold font-h2">{Number(price) / 10 ** 18} SCM</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-a-300/80 mt-2 font-h3">One robot per transaction</p>
                                        {/* Button logic: strictly follow the flow */}
                                        {(step === "init" || (step === "approving" && !isApprovalSuccess)) && (
                                            <button
                                                onClick={handleApprove}
                                                className="w-full mt-4 bg-gradient-to-r from-a-400 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:from-a-500 hover:to-purple-600 hover:ring-1 ring-black transition-all duration-200 font-h1"
                                                disabled={isApprovalPending}
                                            >
                                                {approvalError && approvalError.message?.toLowerCase().includes("user rejected")
                                                    ? <span className="text-sm">User Rejected! (Approve Again)</span>
                                                    : (isApprovalPending ?
                                                        <>
                                                            <div className="flex items-center gap-2 justify-center">
                                                                <CgSpinner className="animate-spin" size={20} />
                                                                <span>Approving...</span>
                                                            </div>
                                                        </> : "Approve Payment Token")
                                                }
                                            </button>
                                        )}
                                        {step === "approving" && isApprovalSuccess && (
                                            <button
                                                onClick={handleMint}
                                                className="w-full mt-4 bg-gradient-to-r from-a-400 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:from-a-500 hover:to-purple-600 hover:ring-1 ring-black transition-all duration-200 font-h1"
                                                disabled={isMintingPending}
                                            >
                                                {mintingError && mintingError.message?.toLowerCase().includes("user rejected")
                                                    ? <span className="text-sm">User Rejected! (Try Again)</span>
                                                    :
                                                    "Mint Robot"
                                                }
                                            </button>
                                        )}
                                        {step === "minting" && (
                                            <button
                                                className="w-full mt-4 bg-gradient-to-r from-a-400 to-purple-500 text-white font-bold py-3 px-6 rounded-lg opacity-60 hover:ring-1 ring-black transition-all duration-100 font-h1"
                                                disabled
                                            >
                                                <div className="flex items-center gap-2 justify-center">
                                                    <CgSpinner className="animate-spin" size={20} />
                                                    <span>Minting...</span>
                                                </div>
                                            </button>
                                        )}
                                        {step === "minted" && (
                                            <>
                                                <button onClick={handleAnotherMint}
                                                    className="w-full mt-4 bg-green-600/60 text-white font-bold py-3 px-6 rounded-lg hover:ring-1 ring-black hover:bg-green-700/50 transition-all duration-200 font-h1"
                                                >
                                                    Successfully Minted!
                                                </button>
                                                <p className="text-xs flex justify-center mt-3 font-h3 text-black/60">Click again for minting another robot</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-gray-400/50 rounded-lg p-6 h-13/20 relative overflow-hidden border border-a-400/20">
                                    {/* Blur overlay: only reveal after step is minted */}
                                    {step !== "minted" && (
                                        <div className="absolute inset-0 backdrop-blur bg-gray-400/50 rounded-lg flex flex-col items-center justify-center z-10 transition-all duration-500 ease-in-out">
                                            <div className="text-a-300 text-xl font-semibold mb-3 animate-pulse font-h1">Robot Not Yet Minted</div>
                                            <div className="text-a-300/90 text-sm px-8 text-center font-h2">
                                                Mint your SecureMind robot to reveal its unique attributes
                                            </div>
                                        </div>
                                    )}

                                    {/* Title with reveal animation */}
                                    <h3 className={`text-xl font-bold text-a-300 mb-6 transition-all duration-500 ease-in-out font-h1 ${step === "minted" ? 'opacity-100' : 'opacity-50'}`}>
                                        Minted Robot Attributes #{totalMinted}
                                    </h3>

                                    {/* Attributes container with reveal animation */}
                                    <div className={`flex flex-row gap-4 transition-all duration-700 ${step === "minted" ? 'opacity-100 transform-none' : 'opacity-30 transform translate-y-4'}`}>
                                        {(() => {
                                            // Split attributes for two columns (max 8 attributes, 4 per column)
                                            const leftAttrs = (step === "minted" && nftAttributes && nftAttributes.length > 0) ? nftAttributes.slice(0, 4) : [];
                                            const rightAttrs = (step === "minted" && nftAttributes && nftAttributes.length > 0) ? nftAttributes.slice(4, 8) : [];
                                            // Fill with placeholders if less than 4 per column
                                            while (leftAttrs.length < 4) leftAttrs.push(null);
                                            while (rightAttrs.length < 4) rightAttrs.push(null);
                                            return (
                                                <>
                                                    <div className="grid grid-cols-1 gap-3 w-1/2">
                                                        {leftAttrs.map((attr, idx) => (
                                                            attr ? (
                                                                <div key={idx} className="bg-gray-800/50 p-3 px-4 rounded-lg transition-all duration-500 delay-100">
                                                                    <span className="block text-gray-300 text-sm font-h3">{attr.trait_type || attr.type || 'Attribute'}</span>
                                                                    <span className="text-a-600 font-semibold transition-all duration-300">{attr.value}</span>
                                                                </div>
                                                            ) : (
                                                                <div key={idx} className="bg-gray-800/50 p-3 rounded-lg transition-all duration-500 delay-100 backdrop-blur-sm">
                                                                    <span className="block text-gray-300 text-sm">Attribute</span>
                                                                    <span className="text-a-600 font-semibold transition-all duration-300">???????????</span>
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-3 w-1/2">
                                                        {rightAttrs.map((attr, idx) => (
                                                            attr ? (
                                                                <div key={idx} className="bg-gray-800/50 p-3 px-4 rounded-lg transition-all duration-500 delay-100">
                                                                    <span className="block text-gray-300 text-sm font-h3">{attr.trait_type || attr.type || 'Attribute'}</span>
                                                                    <span className="text-a-600 font-semibold transition-all duration-300">{attr.value}</span>
                                                                </div>
                                                            ) : (
                                                                <div key={idx} className="bg-gray-800/50 p-3 rounded-lg transition-all duration-500 delay-100 backdrop-blur-sm">
                                                                    <span className="block text-gray-300 text-sm">Attribute</span>
                                                                    <span className="text-a-600 font-semibold transition-all duration-300">???????????</span>
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recently Minted Gallery */}
                        {/* <div className="px-44 mt-16 mb-16">
                    <h3 className="text-3xl font-bold text-a-400 mb-8">Recently Minted Robots</h3>
                    <div className="grid grid-cols-6 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-400/50 border border-a-400/20 rounded-lg p-4">
                                <div className="aspect-square bg-gradient-to-br from-a-400/10 to-purple-500/10 rounded mb-3 flex items-center justify-center">
                                </div>
                                <p className="text-a-400 text-sm font-semibold">Robot #{1000 + i}</p>
                                <p className="text-gray-400 text-xs">Just minted</p>
                            </div>
                        ))}
                    </div>
                </div> */}
                    </div>
                </>
            )}
        </>
    )
}
// Totel supply:
// Minted:
// Remaining:
// Price: