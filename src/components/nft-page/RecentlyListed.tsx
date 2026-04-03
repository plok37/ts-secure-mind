import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import NFTBox from "./NFTBox"
import Link from "next/link"

const GET_RECENT_NFTS = `
    query AllItemListeds {
    allItemListeds(
        first: 40,
        orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC, LOG_INDEX_DESC]
    ) {
        nodes {
            blockNumber
            contractAddress
            nftAddress
            price
            rindexerId
            seller
            tokenId
            txHash
        }
    }
    allItemBoughts {
        nodes {
        tokenId
        nftAddress
        }
    }
    allItemCanceleds {
        nodes {
        tokenId
        nftAddress
        }
    }
    }
`

interface NftItems {
    blockNumber: number,
    contractAddress: string,
    nftAddress: string,
    price: string,
    rindexerId: number,
    seller: string,
    tokenId: string,
    txHash: string,
}

interface NftItemsBought {
    tokenId: string,
    nftAddress: string,
}

interface NftItemsCanceled {
    tokenId: string,
    nftAddress: string,
}

interface NFTQueryResponse {
    data: {
        allItemListeds: {
            nodes: NftItems[]
        },
        allItemBoughts: {
            nodes: NftItemsBought[]
        },
        allItemCanceleds: {
            nodes: NftItemsCanceled[]
        }
    }
}

async function fetchNFTs(): Promise<NFTQueryResponse> {
    // put our GraphQL endpoint here, but since we configed in our next.config.ts, we can just use this
    const response = await fetch("/api/graphql", {
        // Define the parameters for the request
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: GET_RECENT_NFTS,
        }),
    })

    if (!response.ok) {
        throw new Error("Network response was not ok")
    }

    return response.json()
}

// For testing
// U can use this to fetch the data and log it to the console
// console.log(await fetchNFTs())

// To use the it, we need to stick this in a hook that we can use it to filter our stuff out, so that we only get the actively listed NFTs

// This useQuery is a hook to basically make GraphQL queries for us, and the response will be in the data object
function useRecentlyListedNFTs() {
    const { data, isLoading, error } = useQuery<NFTQueryResponse>({
        queryKey: ["reccentNFTs"],
        queryFn: fetchNFTs,
    })

    // we want to return a list as an object
    const nftDataList = useMemo(() => { // useMemo bcs we want to cache the list of NFTs, we dw our website to just constantly be making this API calls
        if (!data) return []

        // Create sets of bought and canceled NFTs for quick lookup
        const boughtNFTs = new Set<string>()
        const canceledNFTs = new Set<string>()

        data.data.allItemBoughts.nodes.forEach(item => {
            if (item.nftAddress && item.tokenId) {
                boughtNFTs.add(`${item.nftAddress}-${item.tokenId}`)
            }
        })

        data.data.allItemCanceleds.nodes.forEach(item => {
            if (item.nftAddress && item.tokenId) {
                canceledNFTs.add(`${item.nftAddress}-${item.tokenId}`)
            }
        })

        const availableNFTs = data.data.allItemListeds.nodes.filter((item) => {
            if (!item.nftAddress || !item.tokenId) return false

            const key = `${item.nftAddress}-${item.tokenId}`
            return !boughtNFTs.has(key) && !canceledNFTs.has(key)
        })

        // This will give us the top 100 NFTs
        // const recentNFTs = availableNFTs.slice(0, 100)

        const uniqueNFTsMap = new Map<string, typeof availableNFTs[0]>()

        availableNFTs.forEach(nft => {
            const key = `${nft.nftAddress}-${nft.tokenId}`
            const existing = uniqueNFTsMap.get(key)

            // Keep the NFT with higher block number (more recent), or if same block number, higher transaction index
            if (!existing ||
                nft.blockNumber > existing.blockNumber ||
                (nft.blockNumber === existing.blockNumber && nft.rindexerId > existing.rindexerId)) {
                uniqueNFTsMap.set(key, nft)
            }
        })

        // Convert map back to array and get top 100
        const recentNFTs = Array.from(uniqueNFTsMap.values()).slice(0, 100)

        // Extract the specific data we need
        return recentNFTs.map(nft => ({
            tokenId: nft.tokenId,
            contractAddress: nft.nftAddress,
            price: nft.price,
        }))
    }, [data]) // it will only re-run when the data changes

    return { nftDataList }
}

// Main component that uses the custom hook
export default function RecentlyListedNFTs() {
    const { nftDataList } = useRecentlyListedNFTs()
    console.log("NFT Data List:", nftDataList)
    return (
        <div className="container mx-auto  py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {nftDataList.map(nft => (
                    <Link
                        key={`${nft.contractAddress}-${nft.tokenId}`}
                        href={`/nft-selection/nft-marketplace/${nft.contractAddress}/${nft.tokenId}`}
                        className="block transform transition hover:scale-105"
                    >
                        <NFTBox
                            width={512}
                            height={512}
                            key={`${nft.contractAddress}-${nft.tokenId}`}
                            tokenId={nft.tokenId}
                            contractAddress={nft.contractAddress}
                            price={nft.price}
                        />
                    </Link>
                ))}
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <img
                    src="/nft-crafting/uncompleted-robot.png"
                    alt={`NFT`}
                    className="w-full h-auto max-h-96 object-contain bg-zinc-50"
                    onError={() => {
                        console.error("Error loading NFT image")
                    }}
                />
            </div> */}
        </div>
    )
}