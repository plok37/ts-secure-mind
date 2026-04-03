import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useReadContract } from "wagmi"
import { secureMindRobotAbi } from "@/contractConstants"
import formatPrice from "@/components/nft-page/utils/formatPrice"

// Type for the NFT data
interface NFTBoxProps {
    width: number
    height: number
    tokenId: string
    contractAddress: string
    price: string
}

export default function NFTBox({ width, height, tokenId, contractAddress, price }: NFTBoxProps) {
    const [nftImageUrl, setNftImageUrl] = useState<string | null>(null)
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [imageError, setImageError] = useState(false)

    // Fetch the tokenURI from the contract
    const {
        data: tokenURIData,
        isLoading: isTokenURILoading,
        error: tokenURIError,
    } = useReadContract({
        abi: secureMindRobotAbi,
        address: contractAddress as `0x${string}`,
        functionName: "tokenURI",
        args: [tokenId ? BigInt(tokenId) : undefined],
        query: {
            enabled: !!tokenId && !!contractAddress,
        },
    })

    // Fetch the metadata and extract image URL when tokenURI is available
    useEffect(() => {
        if (tokenURIData && !isTokenURILoading) {
            const fetchMetadata = async () => {
                setIsLoadingImage(true)
                try {
                    // Handle both HTTP and IPFS URIs
                    const uri = tokenURIData as string
                    let url = uri

                    const response = await fetch(url)
                    const metadata = await response.json()

                    let imageUrl = metadata.image

                    setNftImageUrl(imageUrl)
                } catch (error) {
                    console.error("Error fetching metadata:", error)
                    setImageError(true)
                } finally {
                    setIsLoadingImage(false)
                }
            }

            fetchMetadata()
        }
    }, [tokenURIData, isTokenURILoading, tokenId, contractAddress])

    return (
        <div className="border rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-black/50">
                {isLoadingImage || isTokenURILoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="animate-pulse">Loading...</span>
                    </div>
                ) : imageError || tokenURIError || !nftImageUrl ? (
                    // Fallback to local placeholder when there's an error
                    <Image
                        src="/nft-crafting/uncompleted-robot.png"
                        alt={`NFT ${tokenId}`}
                        width={width}
                        height={height}
                        className="object-cover rounded-3xl"
                    />
                ) : (
                    // Display the actual NFT image
                    <Image
                        src={nftImageUrl}
                        alt={`NFT ${tokenId}`}
                        width={width}
                        height={height}
                        className="object-cover rounded-2xl"
                        onError={() => setImageError(true)}
                    />
                )}
            <div className="p-3">
                <div className="flex flex-col  mb-2">
                    <h3 className="font-semibold font-h1 text-a-800">SecureMind Robot #{tokenId}</h3>
                    <span className="text-sm font-semibold text-a-800 font-h2">
                        Price: {formatPrice(price)}
                    </span>
                </div>
                <p className="text-xs text-a-800 font-h2 break-all whitespace-normal" title={contractAddress}>
                    Contract: {contractAddress}
                </p>
            </div>
        </div>
    )
}
