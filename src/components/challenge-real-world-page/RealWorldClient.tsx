"use client";

// For loading screen and connect wallet
import ConnectWallet from "@/components/connect-wallet/ConnectWallet";
import LoadingScreen from "@/components/loading";
import {
  useAccount,
  useChainId,
  useWriteContract,
} from "wagmi";
import { chainsToContracts, secureMindTokenAbi } from "@/contractConstants"

import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import CodeDisplay from "@/components/challenge-real-world-page/code-display-challenge-real-world";
import Link from "next/link";
import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { useState, useEffect } from "react";

export default function ScenarioClient({ data, slug }: any) {
  // Loading screen and connect wallet
  const { isConnected, address, status } = useAccount();
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
  const secureMindTokenAddress = (chainsToContracts[chainId]?.secureMindToken as `0x${string}`) || "0x"

  // Scenario page state
  const [flagInput, setFlagInput] = useState("");
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastSuccess, setToastSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // For claiming reward (SCM Token)
  const {
    writeContractAsync: rewardAsync,
    error: rewardError,
  } = useWriteContract();

  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setToastMsg("");
    setToastSuccess(false);
    try {
      const res = await fetch("/api/validate-flag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, flag: flagInput })
      });
      const data = await res.json();
      setToastMsg(data.message);
      setToastSuccess(data.correct);
      setOpen(true);

      if (data.correct) {
        // Await the return value of the contract write
        const rewardResult = await rewardAsync({
          abi: secureMindTokenAbi,
          address: secureMindTokenAddress,
          functionName: "reward",
          args: [address, slug],
        });
        // rewardResult is the return value of the contract function
        if (rewardResult) {
          console.log("Reward transaction submitted:", rewardResult);
          setToastMsg("Reward claimed!🎉 Check your wallet, if didn't increase means already claimed.");
          setToastSuccess(true);
        } else {
          setToastMsg("Already claimed!");
          setToastSuccess(false);
        }
        setOpen(true);
      }
    } catch (err) {
      setToastMsg("Error submitting flag. Please try again.");
      setToastSuccess(false);
      setOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

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
            <Toast.Provider swipeDirection="right">
              <div className="min-h-screen relative z-10">
                <div className="pt-30 px-44 flex flex-row gap-13">
                  <div className="flex flex-col">
                    <span className="text-5xl font-bold text-a-400 font-h1">{data.title}</span>
                    <span className="mt-2 text-lg text-a-400 font-h3">Author: plok7337</span>
                  </div>
                  {/* <div>
                <Image src={iconSrc} alt={data.title + " icon"} width={80} height={80} className="drop-shadow-xl" />
              </div> */}
                  {/* <div className="mt-4 text-lg text-d font-h3">{data.description}</div> */}
                </div>
                <div className="px-44 mt-4 flex gap-6 min-h-[700px]">
                  <div className="w-4/10 flex flex-col gap-6">
                    <div className="bg-e rounded-lg p-4 px-6 border border-d-400 h-6/10 shadow-lg">
                      <span className="text-2xl font-bold text-black underline underline-offset-6 font-h2">
                        Description
                      </span>
                      <div className="text-[15px] text-black mt-4 text-justify font-h3">
                        {data.description}
                      </div>
                    </div>
                    <div className="bg-d rounded-xl p-6 border border-black h-4/10 flex flex-col items-stretch justify-between gap-6 shadow-lg">
                      <span className="text-2xl font-bold text-black underline underline-offset-6 font-h2 text-center mb-1">
                        Challenge Actions
                      </span>
                      <div className="flex flex-col gap-3 w-7/10 mx-auto">
                        <Link
                          href={`/challenge-zips/${slug}.zip`}
                          download
                          className="px-6 py-2 rounded-lg bg-a text-white font-bold shadow hover:bg-a-400 transition font-h3 text-center"
                        >
                          Download Source Code ZIP
                        </Link>
                        <Link
                          href={`http://localhost:${data.port}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 rounded-lg bg-a text-white font-bold shadow hover:bg-a-400 transition text-center"
                        >
                          Open Challenge Instance
                        </Link>
                      </div>
                      <form
                        onSubmit={handleFlagSubmit}
                        className="flex flex-col sm:flex-row gap-4 items-center mt-1 w-full justify-center"
                      >
                        <input
                          type="text"
                          placeholder="Enter your flag..."
                          value={flagInput}
                          onChange={e => setFlagInput(e.target.value)}
                          className="px-4 py-2 rounded-lg border border-a focus:outline-none focus:ring-2 focus:ring-a w-full sm:w-64 bg-e"
                          disabled={submitting}
                        />
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-lg bg-e-400 text-white font-bold shadow hover:bg-e-300 transition w-full sm:w-auto"
                          disabled={submitting}
                        >
                          {submitting ? "Checking..." : "Submit Flag"}
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="bg-a rounded-lg p-4 border border-d-400 w-6/10 shadow-lg">
                    <CodeDisplay
                      codeToDisplay={data.codeToDisplay}
                      fileCount={3} />
                  </div>
                </div>
              </div>
              <Toast.Root open={open} onOpenChange={setOpen} duration={2500} className={`ToastRoot border border-d  p-4  ${toastSuccess ? "bg-green-100" : "bg-red-100"} rounded-lg shadow-lg p-4`}>
                <Toast.Title className={`ToastTitle ${toastSuccess ? "text-green-600 text-lx font-h3" : "text-red-600 text-lx font-h3"}`}>{toastMsg}</Toast.Title>
              </Toast.Root>
              <Toast.Viewport className={`ToastViewport fixed bottom-4 right-4 z-[99999] p-3`} />
            </Toast.Provider>
          }
        </>
      )}
    </>
  );
}
