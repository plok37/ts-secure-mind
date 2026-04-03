"use client"

// For loading screen and connect wallet
import ConnectWallet from "@/components/connect-wallet/ConnectWallet";
import LoadingScreen from "@/components/loading";
import { useAccount, useChainId } from "wagmi";
import { chainsToContracts } from "@/contractConstants"

import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import LearningCodeDisplay from "@/components/learning-page/code-display-learning";

import Quiz from "@/components/learning-page/Quiz";

export default function LearningClient({ data, iconSrc, slug }: any) {
    // Loading screen and connect wallet
    const { isConnected, status } = useAccount();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const loading = !isHydrated || status === "connecting" || status === "reconnecting";
    const showConnect = isHydrated && status === "disconnected";
    const showHome = isHydrated && isConnected;

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
                    <LoadingScreen loading={loading} />
                    {showConnect && <ConnectWallet />}
                    {showHome &&
                        <div className="min-h-screen relative z-10">
                            <div className="pt-30 px-44 flex flex-row gap-13">
                                <div>
                                    <Image src={iconSrc} alt={data.title + " icon"} width={80} height={80} className="drop-shadow-xl" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-5xl font-bold text-a-400 font-h1">{data.title}</span>
                                    <span className="mt-2 text-lg text-a-400 font-h3">Written by: plok7337</span>
                                </div>
                            </div>
                            <div className="px-44 mt-10 ">
                                <div className="flex flex-row gap-6 mb-16">
                                    <div className="w-4/10  min-h-[650px] flex flex-col gap-4">
                                        {['starter', 'exploit-contract', 'exploit-script'].includes(slug) ? (
                                            <>
                                                <div className="bg-e h-9/10 border border-d-400 shadow-lg p-4 px-6 rounded-lg">
                                                    <h2 className="text-2xl text-black font-h1">
                                                        {`What is ${data.title}?`}
                                                    </h2>
                                                    <p className="font-h3 mt-2 text-justify text-gray-700 text-base">
                                                        {data.description}
                                                    </p>
                                                </div>
                                                <div className="h-1/10 flex items-center justify-center">
                                                    <Link href={`/challenges/${slug}`} className="text-2xl font-h1 text-b flex justify-center items-center h-full w-full rounded-lg border border-black bg-d hover:bg-d-400 transition">
                                                        Try Hands-on Challenge
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="bg-e h-3/5 border border-d-400 shadow-lg p-4 px-6 rounded-lg">
                                                    <h2 className="text-2xl text-black font-h1">
                                                        {`What is ${data.title}?`}
                                                    </h2>
                                                    <p className="font-h3 mt-2 text-justify text-gray-700 text-base">
                                                        {data.description}
                                                    </p>
                                                </div>
                                                <div className="bg-d/93 h-2/5  border border-black shadow-lg p-4 px-6 rounded-lg">
                                                    <h2 className="text-2xl text-black font-h1">
                                                        Why is it Dangerous?
                                                    </h2>
                                                    <p className="font-h3 mt-2 text-justify text-gray-800 text-base">
                                                        {data.dangerous}
                                                    </p>
                                                </div>
                                            </>

                                        )}
                                    </div>
                                    <div className="bg-a rounded-lg p-4 border border-d-400 w-6/10 shadow-lg min-h-[500px]">
                                        <h2 className="text-2xl text-black font-h1 pl-2">
                                            How Does it Work?
                                        </h2>
                                        <LearningCodeDisplay codeToDisplay={data.codeOfSample} />
                                        <p className="px-2 text-justify font-h3 text-gray-800">
                                            {data.sampleExplaination}
                                        </p>
                                    </div>
                                </div>
                                {['starter', 'exploit-contract', 'exploit-script'].includes(slug) ? null : (
                                    <div className="mt-6 flex flex-col xl:flex-row gap-6 min-h-[650px] mb-16">
                                        <div className="bg-a rounded-lg p-4 border border-d-400 w-6/10 shadow-lg">
                                            <h2 className="text-2xl text-black font-h1 pl-2">
                                                How to Prevent It?
                                            </h2>
                                            <LearningCodeDisplay codeToDisplay={data.codeToPrevent} />
                                            <p className="px-2 text-justify font-h3 text-gray-800">
                                                {data.preventExplaination}
                                            </p>
                                        </div>
                                        <div className="w-4/10 flex flex-col gap-4">
                                            <div className="bg-c rounded-lg p-4  border border-d-400 shadow-lg h-9/10 flex flex-col gap-3">
                                                <h2 className="text-2xl text-black font-h1 pl-2">
                                                    Quiz
                                                </h2>
                                                <div className="px-2">
                                                    <Quiz questions={data.quizData} />
                                                </div>
                                            </div>
                                            <div className="h-1/10 rounded-lg border border-black bg-d hover:bg-d-400 ">
                                                <Link href={`/challenges/${slug}`} className="text-2xl font-h1 text-b flex justify-center items-center h-full">
                                                    Try Hands-on Challenge
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Footer />
                        </div>
                    }
                </>
            )}
        </>
    )
}