import VulnerabilityTopic from "@/components/vulnerability-topic"

export default function Learning() {
    return (
        <section className="w-full px-4 py-31 lg:px-16 xl:px-32 2xl:px-44 relative min-h-[1000px]">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <div className="rounded-3xl bg-d flex flex-col items-center">
                        <img src="/section-arts/owl-learning-time.png" alt="Owl Learning Time" className="rounded-2xl" />
                        <div className="px-4 pb-4 text-lg font-semibold text-d-900 font-h3 text-justify">
                            <p className="px-1">
                                Welcome to the Security Learning section! Here, you'll discover a variety of knowledge about different types of vulnerabilities in smart contracts. This foundational understanding will be valuable for tackling both the upcoming challenge section and the real-world scenario exercises. Strengthen your skills and prepare to spot and prevent costly exploits in blockchain ecosystems.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col gap-4 text-center">
                    <div className="p-6 rounded-3xl flex flex-col lg:flex-row bg-white gap-4 basis-1/5 shadow-xl">
                        <div className="rounded-3xl p-6 text-b flex items-center justify-center grow bg-c">
                            <div className="text-4xl text-d font-h1 font-bold">
                                Beginner
                            </div>
                        </div>
                        <VulnerabilityTopic text="Starter"
                            imgSrc="/starter.svg"
                            href="/learning/starter"
                            bgColor="bg-e-600" />
                        <VulnerabilityTopic text="Exploit Contract"
                            imgSrc="/exploit-contract.svg"
                            href="/learning/exploit-contract"
                            bgColor="bg-e-600" />
                        <VulnerabilityTopic text="Exploit Script"
                            imgSrc="/exploit-script.svg"
                            href="/learning/exploit-script"
                            bgColor="bg-e-600" />
                    </div>
                    <div className="p-6 rounded-3xl flex flex-col bg-white gap-4 basis-3/5 shadow-xl h-full">
                        <div className="flex gap-4 w-full flex-1">
                            <div className="rounded-3xl p-6 text-b flex items-center justify-center grow bg-c">
                                <div className="text-4xl text-d font-h1 font-bold">
                                    Intermediate
                                </div>
                            </div>
                            <VulnerabilityTopic
                                text={
                                    <>
                                        Overflow/
                                        <br />
                                        Underflow
                                    </>
                                }
                                imgSrc="/overflow-underflow.svg"
                                href="/learning/overflow-underflow"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text={
                                    <>
                                        Denial of
                                        <br />
                                        Service
                                    </>
                                }
                                imgSrc="/dos.svg"
                                href="/learning/denial-of-service"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Hash Collision"
                                imgSrc="/hash-collision.svg"
                                href="/learning/hash-collision"
                                bgColor="bg-a-600"
                            />
                        </div>
                        <div className="flex gap-4 w-full flex-1">
                            <VulnerabilityTopic
                                text="Price Oracle Manipulation"
                                imgSrc="/short-address.svg"
                                href="/learning/price-oracle-manipulation"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Re-entrancy"
                                imgSrc="/reentrancy.svg"
                                href="/learning/reentrancy"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Block Timestamp Manipulation"
                                imgSrc="/timestamp-manipulation.svg"
                                href="/learning/block-timestamp-manipulation"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Delegatecall Injection"
                                imgSrc="/delegatecall-injection.svg"
                                href="/learning/delegatecall-injection"
                                bgColor="bg-a-600"
                            />
                        </div>
                        <div className="flex gap-4 w-full flex-1">
                            <VulnerabilityTopic
                                text="Insecure Randomness"
                                imgSrc="/insecure-randomness.svg"
                                href="/learning/insecure-randomness"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="NFT Re-entrancy"
                                imgSrc="/nft-reentrancy.svg"
                                href="/learning/nft-reentrancy"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Access Control"
                                imgSrc="/access-control.svg"
                                href="/learning/access-control"
                                bgColor="bg-a-600"
                            />
                            <VulnerabilityTopic
                                text="Storage Collision"
                                imgSrc="/storage-collision.svg"
                                href="/learning/storage-collision"
                                bgColor="bg-a-600"
                            />
                        </div>
                    </div>
                    <div className="p-6 rounded-3xl flex flex-col lg:flex-row bg-white gap-4 basis-1/5 shadow-xl">
                        <div className="rounded-3xl p-6 accentDarkBg text-b link_decoration flex items-center justify-center grow bg-c">
                            <div className="text-4xl text-d font-h1 font-bold">
                                Advanced
                            </div>
                        </div>
                        <VulnerabilityTopic
                            text="Inline Assembly"
                            imgSrc="/inline-assembly.svg"
                            href="/learning/inline-assembly"
                            bgColor="bg-a-400"
                        />
                        <VulnerabilityTopic
                            text="Front-running"
                            imgSrc="/front-running.svg"
                            href="/learning/front-running"
                            bgColor="bg-a-400"
                        />
                        <VulnerabilityTopic
                            text="Flash Loan"
                            imgSrc="/flash-loan.svg"
                            href="/learning/flash-loan"
                            bgColor="bg-a-400"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}