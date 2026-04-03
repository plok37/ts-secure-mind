// app/buy-nft/[contractAddress]/[tokenId]/page.tsx
"use client"

import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
    useAccount,
    useChainId,
    useWriteContract,
    useReadContract,
    useWaitForTransactionReceipt,
} from "wagmi"
import { chainsToContracts, secureMindTokenAbi, nftMarketplaceAbi } from "@/contractConstants"
import NFTBox from "@/components/nft-page/NFTBox"

export const runtime = 'edge';

export default function BuyNftPage() {
    const router = useRouter()
    const { contractAddress, tokenId } = useParams() as {
        contractAddress: string
        tokenId: string
    }
    const { address } = useAccount()
    const chainId = useChainId()

    const nftMarketplaceAddress =
        (chainsToContracts[chainId]?.nftMarketplace as `0x${string}`) || "0x"
    const secureMindTokenAddress = (chainsToContracts[chainId]?.secureMindToken as `0x${string}`) || "0x"

    const [step, setStep] = useState(1) // 1: Preview, 2: Approval, 3: Purchase

    interface Listing {
        price: bigint
        seller: string
    }

    // Get the listing details
    const { data: listingData, isLoading: isListingLoading } = useReadContract({
        abi: nftMarketplaceAbi,
        address: nftMarketplaceAddress,
        functionName: "getListing",
        args: [contractAddress as `0x${string}`, BigInt(tokenId)],
    })

    // Destructure listing data if available
    const listing = listingData as Listing | undefined
    const price = listing ? listing.price.toString() : "0"
    const seller = listing ? listing.seller : undefined

    // For token approval
    const {
        data: approvalHash,
        isPending: isApprovalPending,
        writeContract: approveToken,
        error: approvalError,
    } = useWriteContract()

    // For buying NFT
    const {
        data: purchaseHash,
        isPending: isPurchasePending,
        writeContract: buyNft,
        error: purchaseError,
    } = useWriteContract()

    // Transaction receipts
    const { isSuccess: isApprovalSuccess } = useWaitForTransactionReceipt({
        hash: approvalHash,
    })

    const { isSuccess: isPurchaseSuccess } = useWaitForTransactionReceipt({
        hash: purchaseHash,
    })

    // Check if NFT is actually listed (price > 0)
    const isListed = price && BigInt(price) > BigInt(0)

    // Handle approve token
    const handleApprove = async () => {
        if (!price) return

        try {
            await approveToken({
                abi: secureMindTokenAbi,
                address: secureMindTokenAddress,
                functionName: "approve",
                args: [nftMarketplaceAddress, BigInt(price)],
            })
            setStep(2)
        } catch (error) {
            console.error("Error approving token:", error)
        }
    }

    // Handle buy NFT
    const handleBuy = async () => {
        try {
            await buyNft({
                abi: nftMarketplaceAbi,
                address: nftMarketplaceAddress,
                functionName: "buyItem",
                args: [contractAddress as `0x${string}`, BigInt(tokenId)],
            })
            setStep(3)
        } catch (error) {
            console.error("Error buying NFT:", error)
        }
    }

    // Redirect to home if purchase is successful
    useEffect(() => {
        if (step === 3 && isPurchaseSuccess) {
            const timer = setTimeout(() => {
                router.push("/nft-selection/nft-marketplace")
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [step, isPurchaseSuccess, router])

    // Check if the current user is the seller
    const isSeller = seller === address

    const chainSupported =
        chainId in chainsToContracts && chainsToContracts[chainId]?.nftMarketplace !== undefined

    return (
        <>
            <AnimatedGridBackground />
            <div className="relative 2xl:px-44 pt-32 min-h-screenflex flex-col">
                <main className="flex-1 container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold mb-6 text-a font-h1">Buy NFT</h1>

                        {!chainSupported ? (
                            <div className="p-8 rounded-xl shadow-sm border border-a-400/20 bg-gray-400/50 text-center">
                                <p className="text-lg text-red-600 mb-4">
                                    The current network is not supported. Please switch to a supported
                                    network.
                                </p>
                            </div>
                        ) : isListingLoading ? (
                            <div className="p-8 rounded-xl shadow-sm border border-a-400/20 bg-gray-400/50 text-center">
                                <p className="text-lg text-a-300 font-h1">Loading NFT details...</p>
                            </div>
                        ) : !isListed ? (
                            <div className="p-8 rounded-xl shadow-sm border border-a-400/20 bg-gray-400/50 text-center">
                                <p className="text-lg text-red-600 mb-4">
                                    This NFT is not currently listed for sale.
                                </p>
                                <button
                                    onClick={() => router.push("/nft-selection/nft-marketplace")}
                                    className="py-2 px-4 bg-a text-white rounded-md hover:bg-a-400 focus:outline-none hover:ring-1 ring-black transition-all duration-200 focus:ring-2 focus:ring-a-400 focus:ring-offset-2 font-h1"
                                >
                                    Back to Home
                                </button>
                            </div>
                        ) : isSeller ? (
                            <div className="p-8 rounded-xl shadow-sm border border-a-400/20 bg-gray-400/50 text-center">
                                <p className="text-lg text-red-600 mb-4">
                                    You are the seller of this NFT.
                                </p>
                                <button
                                    onClick={() => router.push("/nft-selection/nft-marketplace")}
                                    className="py-2 px-4 bg-a text-white rounded-md hover:bg-a-400 focus:outline-none hover:ring-1 ring-black transition-all duration-200 focus:ring-2 focus:ring-a-400 focus:ring-offset-2 font-h1"
                                >
                                    Back to Home
                                </button>
                            </div>
                        ) : (
                            <div className=" rounded-xl shadow-sm  p-6 border border-a-400/20 bg-gray-400/50">
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-a-300 font-h1">NFT Details</h2>

                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="md:w-1/3">
                                                <NFTBox
                                                    width={512}
                                                    height={512}
                                                    tokenId={tokenId}
                                                    contractAddress={contractAddress}
                                                    price={price}
                                                />
                                            </div>

                                            <div className="md:w-2/3 space-y-4">
                                                <div className="bg-gray-800/50 p-3 px-4 rounded-lg transition-all duration-500 delay-100 space-y-4">
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-300 font-h3">
                                                            Contract Address
                                                        </h3>
                                                        <p className="mt-1 text-sm text-a-600 break-all font-h2">
                                                            {contractAddress}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-300 font-h3">
                                                            Token ID
                                                        </h3>
                                                        <p className="mt-1 text-sm text-a-600 font-h2">
                                                            {tokenId}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-300 font-h2">
                                                            Seller
                                                        </h3>
                                                        <p className="mt-1 text-sm text-a-600 break-all font-h2">
                                                            {seller}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="pt-4">
                                                    <button
                                                        onClick={handleApprove}
                                                        className="w-full py-3 px-4 bg-gradient-to-r from-a-400 to-purple-500 text-white rounded-md hover:from-a-500 hover:to-purple-600 hover:ring-1 ring-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-a-400 focus:ring-offset-2 font-h1"
                                                        disabled={isApprovalPending}
                                                    >
                                                        {isApprovalPending
                                                            ? "Approving..."
                                                            : "Approve Payment Token"}
                                                    </button>

                                                    {approvalError && (
                                                        <div className="p-4 bg-red-50 text-red-700 rounded-md mt-4">
                                                            {approvalError.message}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-a-300 font-h1">Complete Purchase</h2>

                                        {isApprovalSuccess ? (
                                            <>
                                                <div className="p-4 bg-green-700/50 text-white rounded-md font-h2">
                                                    Payment token approved! You can now complete the
                                                    purchase.
                                                </div>

                                                <div className="flex flex-col md:flex-row gap-8">
                                                    <div className="md:w-1/3">
                                                        <NFTBox
                                                            width={512}
                                                            height={512}
                                                            tokenId={tokenId}
                                                            contractAddress={contractAddress}
                                                            price={price}
                                                        />
                                                    </div>

                                                    <div className="md:w-2/3 space-y-4">
                                                        <button
                                                            onClick={handleBuy}
                                                            className="w-full py-3 px-4 bg-gradient-to-r from-a-400 to-purple-500 text-white rounded-md hover:from-a-500 hover:to-purple-600 hover:ring-1 ring-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-a focus:ring-offset-2 font-bold font-h1"
                                                            disabled={isPurchasePending}
                                                        >
                                                            {isPurchasePending
                                                                ? "Processing..."
                                                                : "Buy Now"}
                                                        </button>

                                                        {purchaseError && (
                                                            <div className="p-4 bg-red-50 text-red-700 rounded-md mt-4">
                                                                {purchaseError.message}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="p-4 text-gray-300 rounded-md bg-gray-800/50 font-h2">
                                                Waiting for approval transaction to be confirmed...
                                            </div>
                                        )}
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-a-300 font-h1">Purchase Complete</h2>

                                        {isPurchaseSuccess ? (
                                            <>
                                                <div className="p-4 bg-green-700/50 text-white rounded-md font-h2">
                                                    Congratulations! You have successfully purchased
                                                    this NFT. You will be redirected to the NftMarketplace page in
                                                    a few seconds.
                                                </div>

                                                <div className="mx-auto w-64">
                                                    <NFTBox
                                                        width={512}
                                                        height={512}
                                                        tokenId={tokenId}
                                                        contractAddress={contractAddress}
                                                        price={price}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="p-4 bg-gray-800/50 text-gray-300 rounded-md font-h2">
                                                Waiting for purchase transaction to be confirmed...
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    )
}
