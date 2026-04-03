import { ConnectButton } from "@rainbow-me/rainbowkit";
import { OrbitingCircles } from "@/components/connect-wallet/orbiting-circles/orbiting-circles";
import { Icons } from "@/components/connect-wallet/orbiting-circles/icons"

export default function ConnectWallet() {

    return (
        <> {/* from-blue-50/90 to-indigo-200/90 */}
            <div className="relative z-10 bg-gradient-to-br bg-b min-h-screen flex flex-col items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className=" h-full w-full flex items-center justify-center">
                        <OrbitingCircles iconSize={30} radius={320}>
                            <Icons.USDT />
                            <Icons.ethereum />
                            <Icons.USDC />
                            <Icons.ethereum2 />
                        </OrbitingCircles>
                        <OrbitingCircles iconSize={50} radius={400} reverse speed={0.8}>
                            <Icons.blockchain />
                            <Icons.ethereum3 />
                            <Icons.smartContract />
                            <Icons.nftBuying />
                        </OrbitingCircles>
                    </div>
                </div>
                <div className="w-full max-w-md fixed">
                    <div className="bg-a rounded-3xl shadow-xl overflow-hidden">
                        {/* <div className="bg-gradient-to-r from-slate-400 to-slate-500 px-8 py-6"> */}
                        <div className="bg-d px-8 py-6">
                                <h1 
                                    className="text-3xl font-bold text-b animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white ">
                                    Welcome to SecureMind
                                </h1>
                            <style>
                            {`
                            @keyframes typing {
                              from { width: 0 }
                              to { width: 97% }
                            }
                            @keyframes blink {
                              50% { border-color: transparent }
                              100% { border-color: white }
                            }
                            .animate-typing {
                              animation: typing 2.3s steps(20, end) infinite alternate, blink .7s infinite;
                            }
                            `}
                            </style>

                            <p className="text-b mt-1 ">
                                Connect your wallet to continue
                            </p>
                        </div>

                        {/* Content */}
                        <div className="px-8 py-10">
                            <div className="inline-block p-3 bg-e-700 rounded-full mb-4 mx-42">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-a-200"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-semibold text-b">Get Started</h2>
                                    <p className="text-b mt-1">Secure access to your dashboard</p>
                                </div>

                                {/* RainbowKit Connect Button */}
                                <div className="flex justify-center">
                                    <ConnectButton
                                        label="Connect Wallet"
                                    />
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <p className="text-sm text-b text-center">
                                        By continuing, you agree to our{" "}
                                        <a href="terms-of-use" target="_blank" rel="noopener noreferrer" className="font-medium text-a-200 hover:text-blue-800 transition-colors">
                                            Terms
                                        </a>
                                        {" "}and acknowledge our{" "}
                                        <a href="./privacy-policy" target="_blank" rel="noopener noreferrer" className="font-medium text-a-200 hover:text-blue-800 transition-colors">
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 bg-fixed">
                            © 2025 Secure Mind. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
