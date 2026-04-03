import React, { use, useEffect, useState } from "react";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import { useMemo } from "react";
import { secureMindRobotAbi, chainsToContracts, nftMarketplaceAbi } from "@/contractConstants"
import {
    useAccount,
    useChainId,
    useWriteContract,
    useReadContract,
    useWaitForTransactionReceipt,
} from "wagmi"
import NFTBox from "./NFTBox";
import { addDecimalsToPrice } from "@/components/nft-page/utils/formatPrice";
import { CgSpinner } from "react-icons/cg"

export default function NftListingPage() {
    const { address } = useAccount()
    const [isOwner, setIsOwner] = useState(false);
    const [nftAddress, setNftAddress] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [price, setPrice] = useState("");
    const [preview, setPreview] = useState(false);
    const [approved, setApproved] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [currentListingHash, setCurrentListingHash] = useState<string | null>(null);

    const chainId = useChainId();
    const chainSupported =
        chainId in chainsToContracts

    // Replace with your actual contract addresses
    const secureMindRobotAddress = useMemo(() => {
        return (chainsToContracts[chainId]?.secureMindRobotNft as `0x${string}`) || null
    }, [chainId])
    const nftMarketplaceAddress = (chainsToContracts[chainId]?.nftMarketplace as `0x${string}`) || "0x"

    // For NFT owner verification - move hook to top level
    const { data: ownerData } = useReadContract({
        abi: secureMindRobotAbi,
        address: secureMindRobotAddress as `0x${string}`,
        functionName: "ownerOf",
        args: tokenId ? [BigInt(tokenId)] : undefined,
    });

    // For NFT approval
    const {
        data: approvalHash,
        isPending: isApprovalPending,
        writeContract: approveSecureMindRobot,
        error: approvalError,
    } = useWriteContract()

    // For listing NFT
    const {
        data: listingHash,
        isPending: isListingPending,
        writeContract: listNft,
        error: listingError,
    } = useWriteContract()

    // Transaction receipts
    const { isSuccess: isApprovalSuccess } = useWaitForTransactionReceipt({
        hash: approvalHash,
    })

    const { isSuccess: isListingSuccess } = useWaitForTransactionReceipt({
        hash: listingHash,
    })

    // Handlers
    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMsg("");
        // Check ownership before preview
        if (ownerData !== address) {
            setIsOwner(false);
            setPreview(false);
            setError("You are not the owner of this NFT. Please connect with the owner to list it.");
            return;
        }
        setIsOwner(true);
        setPreview(true);
    };

    const handleBack = () => {
        setPreview(false);
        setApproved(false);
        setMsg("");
        setError("");
        setIsOwner(false);
        // Reset listing state when going back
        setNftAddress("");
    };

    // Handle approve robot
    const handleApprove = async () => {
        setNftAddress(secureMindRobotAddress)
        try {
            await approveSecureMindRobot({
                abi: secureMindRobotAbi,
                address: secureMindRobotAddress,
                functionName: "approve",
                args: [nftMarketplaceAddress, tokenId],
            })
        } catch (error) {
            console.error("Error approving robot:", error)
        }
    }

    // Handle list NFT
    const handleListing = async () => {
        console.log("nft address:", nftAddress);
        console.log("tokenId:", tokenId);
        console.log("price:", price);
        if (!nftAddress || !tokenId || !price) return

        try {
            const formattedPrice = addDecimalsToPrice(price)
            await listNft({
                abi: nftMarketplaceAbi,
                address: nftMarketplaceAddress,
                functionName: "listItem",
                args: [nftAddress as `0x${string}`, BigInt(tokenId), formattedPrice],
            })
        } catch (error) {
            console.error("Error listing NFT:", error)
        }
    }

    useEffect(() => {
        if (isApprovalSuccess) {
            setApproved(true);
            setMsg("Robot approved successfully!");
        }
    }, [isApprovalSuccess]);

    useEffect(() => {
        if (listingHash) {
            setCurrentListingHash(listingHash);
        }
    }, [listingHash]);

    useEffect(() => {
        if (isListingSuccess && listingHash === currentListingHash) {
            setMsg("Click back to list another robot");
        }
    }, [isListingSuccess, listingHash, currentListingHash]);

    // Clear error when tokenId changes
    useEffect(() => {
        setError("");
        setMsg("");
        setIsOwner(false);
        setPreview(false);
        setApproved(false);
        // Reset nft address to clear any previous listing state
        setNftAddress("");
        setCurrentListingHash(null);
    }, [tokenId, address]);

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
                    <div className="relative 2xl:px-44 pt-22 min-h-screen">
                        <div style={{ maxWidth: 720, margin: "70px auto" }}>
                            {!preview && !isOwner ? (
                                <form onSubmit={handlePreview} style={{
                                    background: "#fff",
                                    borderRadius: 16,
                                    padding: 24,
                                    boxShadow: "0 2px 12px #0001"
                                }}>
                                    <h2 className="font-h1 mb-6 font-semibold text-2xl"> List Your NFT </h2>

                                    <div style={{ marginBottom: 14 }}>
                                        <label>Token ID</label>
                                        <input
                                            type="number"
                                            value={tokenId}
                                            onChange={e => setTokenId(e.target.value)}
                                            required
                                            style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc", marginTop: 4 }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 18 }}>
                                        <label>Listing Price (SCM)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="any"
                                            value={price}
                                            onChange={e => setPrice(e.target.value)}
                                            required
                                            style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc", marginTop: 4 }}
                                        />
                                    </div>
                                    <button type="submit" className="bg-a w-full rounded-lg py-3 mt-3 cursor-pointer font-h2 text-white hover:bg-a-400/90 transition-colors hover:ring-2 hover:ring-a-300">
                                        Preview Listing
                                    </button>
                                    {/* Show error if user is not the owner */}
                                    {error && (
                                        <div style={{
                                            marginTop: 18,
                                            color: "#d32f2f",
                                            background: "#ffebee",
                                            borderRadius: 8,
                                            padding: 10,
                                            fontSize: 15,
                                            textAlign: "center"
                                        }}>
                                            {error}
                                        </div>
                                    )}
                                </form>
                            ) : (
                                <div>
                                    <div className="flex flex-col items-center justify-center">
                                        <NFTBox
                                            width={512}
                                            height={512}
                                            tokenId={tokenId}
                                            // contractAddress={nftAddress}
                                            contractAddress={secureMindRobotAddress}
                                            price={addDecimalsToPrice(price)}
                                        />
                                        <div className="flex gap-12 mt-8">
                                            <button onClick={handleBack} className="bg-a p-4 px-10 rounded-lg text-white font-h3 cursor-pointer hover:bg-a-400/90 transition-colors hover:ring-2 hover:ring-a-300">
                                                Back
                                            </button>
                                            {!approved ? (
                                                <button
                                                    onClick={handleApprove}
                                                    disabled={isApprovalPending}
                                                    className="flex bg-d p-4 px-8 rounded-lg text-white font-h3 hover:bg-d-400/90 transition-colors hover:ring-2 hover:ring-d-300 items-center gap-2"
                                                    style={{
                                                        cursor: isApprovalPending ? "not-allowed" : "pointer"
                                                    }}>
                                                    {isApprovalPending ?
                                                        <>
                                                            <CgSpinner className="animate-spin" size={20} />
                                                            <span>
                                                                Approving...
                                                            </span>
                                                        </> : "Approve This Robot"}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleListing}
                                                    disabled={isListingPending || (isListingSuccess && listingHash === currentListingHash)}
                                                    className="flex bg-d p-4 px-8 rounded-lg text-white font-h2 hover:bg-d-400/90 transition-colors hover:ring-2 hover:ring-d-300 items-center gap-2"
                                                    style={{
                                                        cursor: isListingPending ? "not-allowed" : (isListingSuccess && listingHash === currentListingHash) ? "" : "pointer"
                                                    }}>
                                                    {(isListingSuccess && listingHash === currentListingHash) ? "Successfully Listed!" : isListingPending ?
                                                        <>
                                                            <CgSpinner className="animate-spin" size={20} />
                                                            <span>
                                                                Listing...
                                                            </span>
                                                        </> : "List NFT for sale"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {(msg || error) && (
                                        <div style={{
                                            marginTop: 18,
                                            color: error ? "#d32f2f" : "#388e3c",
                                            background: error ? "#ffebee" : "#e8f5e9",
                                            borderRadius: 8,
                                            padding: 10,
                                            fontSize: 15,
                                            textAlign: "center"
                                        }}>
                                            {msg || error}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* Show error if user is not the owner and a tokenId is entered */}
                        {/* {!isOwner && (
                            <div className="text-center mt-10 text-red-500">
                                You are not the owner of this NFT. Please connect with the owner to list it.

                                {console.log("Owner data:", ownerData, "Address:", address, "Is Owner:", isOwner)}
                            </div>
                        )} */}
                    </div>
                </>
            )}
        </>
    );
}