import VulnerabilityTopic from "@/components/vulnerability-topic"
import Cubes from "@/components/homepage/challenge/cubes-hover-effect"

export default function Challenges() {
    return (
        <>
            {/* Challenge Section Navigation */}
            <section className="w-full px-4 py-8 pb-20 lg:px-16 xl:px-32 2xl:px-44 relative min-h-[900px] gap-4 flex flex-col">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full h-full lg:w-1/3 flex flex-col gap-4">
                        <img src="/section-arts/lion-challenges.png" alt="Challenge Section" className="rounded-2xl h-136 w-110 shadow-xl" />
                    </div>
                    <div className="w-full lg:w-2/3 flex flex-col gap-4 text-center bg-a rounded-2xl shadow-xl p-5">
                        <div className="flex gap-4 w-full flex-1">
                            <VulnerabilityTopic text="Starter"
                                imgSrc="/starter.svg"
                                href="/challenges/starter"
                                bgColor="bg-e-600" />
                            <VulnerabilityTopic text="Exploit Contract"
                                imgSrc="/exploit-contract.svg"
                                href="/challenges/exploit-contract"
                                bgColor="bg-e-600" />
                            <VulnerabilityTopic text="Exploit Script"
                                imgSrc="/exploit-script.svg"
                                href="/challenges/exploit-script"
                                bgColor="bg-e-600" />
                            <VulnerabilityTopic
                                text={
                                    <>
                                        Overflow/
                                        <br />
                                        Underflow
                                    </>
                                }
                                imgSrc="/overflow-underflow.svg"
                                href="/challenges/overflow-underflow"
                                bgColor="bg-a-600"
                            />
                        </div>
                        <div className="flex gap-4 w-full flex-1">
                            <VulnerabilityTopic
                                text={
                                    <>
                                        Denial of
                                        <br />
                                        Service
                                    </>
                                }
                                imgSrc="/dos.svg"
                                href="/challenges/denial-of-service"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Hash Collision"
                                imgSrc="/hash-collision.svg"
                                href="/challenges/hash-collision"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Price Oracle Manipulation"
                                imgSrc="/short-address.svg"
                                href="/challenges/price-oracle-manipulation"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Re-entrancy"
                                imgSrc="/reentrancy.svg"
                                href="/challenges/reentrancy"
                                bgColor="bg-a-600"
                            />
                        </div>
                        <div className="flex gap-4 w-full flex-1">
                            <VulnerabilityTopic
                                text="Block Timestamp Manipulation"
                                imgSrc="/timestamp-manipulation.svg"
                                href="/challenges/block-timestamp-manipulation"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Delegatecall Injection"
                                imgSrc="/delegatecall-injection.svg"
                                href="/challenges/delegatecall-injection"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Insecure Randomness"
                                imgSrc="/insecure-randomness.svg"
                                href="/challenges/insecure-randomness"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="NFT Re-entrancy"
                                imgSrc="/nft-reentrancy.svg"
                                href="/challenges/nft-reentrancy"
                                bgColor="bg-a-600"
                            />
                        </div>
                        <div className="flex gap-4 w-full flex-1">
                            <VulnerabilityTopic
                                text="Access Control"
                                imgSrc="/access-control.svg"
                                href="/challenges/access-control"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Storage Collision"
                                imgSrc="/storage-collision.svg"
                                href="/challenges/storage-collision"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Inline Assembly"
                                imgSrc="/inline-assembly.svg"
                                href="/challenges/inline-assembly"
                                bgColor="bg-a-400"
                            />
                            <VulnerabilityTopic
                                text="Front-running"
                                imgSrc="/front-running.svg"
                                href="/challenges/front-running"
                                bgColor="bg-a-400"
                            />
                            <VulnerabilityTopic
                                text="Flash Loan"
                                imgSrc="/flash-loan.svg"
                                href="/challenges/flash-loan"
                                bgColor="bg-a-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 h-full">
                    <div className="p-10 rounded-2xl w-full h-full lg:w-7/10  flex flex-col bg-c shadow-xl">
                        <div className="text-lg font-semibold text-d font-h3 h-43 text-justify">
                            Welcome to the Challenge section! Here, you can launch CTF-based challenges that mirror the vulnerabilities you've learned. Each challenge spins up a real instance for you to exploit—test your skills and deepen your understanding by breaking smart contracts in a safe environment.
                            <p className="mt-13 text-base text-d italic text-center">
                                "Learning is like building a perfect cube—skip a step, and the whole shape is lost. Embrace every lesson, for each piece matters."
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-3/10 flex flex-col gap-4 text-center bg-a rounded-2xl shadow-xl">
                        <Cubes />
                    </div>
                </div>
            </section>
        </>
    )
}