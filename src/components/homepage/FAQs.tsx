export default function FAQs() {
    return (
        <section className="w-full px-4 pb-8 lg:px-16 xl:px-32 2xl:px-44 z-10 flex flex-col items-center min-h-[700px]">
            <h2 className="text-3xl lg:text-4xl font-bold mb-11 text-center text-d font-h1 underline underline-offset-10">
                Frequently Asked Questions
            </h2>
            <div className="w-full max-w-3xl flex flex-col gap-6 mb-20">
                <div className="collapse border-2 rounded-3xl bg-d   text-d border-d">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title bg-a-500 text-b peer-checked:bg-a-400 peer-checked:text-b font-h2 lg:text-2xl">
                        What is SecureMind?
                    </div>
                    <div className="collapse-content bg-d text-b peer-checked:bg-a-400 peer-checked:text-b font-h3 text-justify">
                        SecureMind is an educational decentralized application {"(dApp)"} to learn smart contract security.
                    </div>
                </div>
                <div className="collapse border-2 rounded-3xl bg-d text-d border-d">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title bg-a-500 text-b peer-checked:bg-a-400 peer-checked:text-b font-h2 lg:text-2xl">
                        What is a smart contract vulnerability?
                    </div>
                    <div className="collapse-content bg-d text-b peer-checked:bg-a-400 peer-checked:text-b font-h3 text-justify">
                        A smart contract vulnerability is a weakness in the code that can be exploited, potentially leading to loss of funds or unintended behavior. Our platform helps you learn to identify and prevent these issues.
                    </div>
                </div>
                <div className="collapse border-2 rounded-3xl bg-d text-d border-d">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title bg-a-500 text-b peer-checked:bg-a-400 peer-checked:text-b font-h2 lg:text-2xl">
                        How can I use the learning and challenge sections?
                    </div>
                    <div className="collapse-content bg-d text-b peer-checked:bg-a-400 peer-checked:text-b font-h3 text-justify">
                        The learning section provides foundational knowledge about vulnerabilities. The challenge section lets you apply what you've learned in hands-on scenarios.
                    </div>
                </div>
                <div className="collapse border-2 rounded-3xl bg-d text-d border-d">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title bg-a-500 text-b peer-checked:bg-a-400 peer-checked:text-b font-h2 lg:text-2xl">
                        Where can I find real-world examples?
                    </div>
                    <div className="collapse-content bg-d text-b peer-checked:bg-a-400 peer-checked:text-b font-h3 text-justify">
                        The Real-World Scenario section features simulated practical vulnerable contracts based on actual scenario in blockchain ecosystems.
                    </div>
                </div>
                <div className="collapse border-2 rounded-3xl bg-d text-d border-d">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title bg-a-500 text-b peer-checked:bg-a-400 peer-checked:text-b font-h2 lg:text-2xl">
                        What is the Non-fungible Tokens{" (NFTs) "} section used for?
                    </div>
                    <div className="collapse-content bg-d text-b peer-checked:bg-a-400 peer-checked:text-b font-h3 text-justify">
                        The NFT section will provide navigation to NFT Marketplace and NFT crafting. NFT Marketplace is a small-scale marketplace where you can buy NFTs with $SCM token or list NFTs for sale. NFT crafting is a crafting place where you can craft a random NFTs with $SCM token. Both serve as an incentive for learning as well as a practical example of how NFTs function in the real world.
                    </div>
                </div>
                <div className="collapse border-2 rounded-3xl bg-d text-d border-d">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title bg-a-500 text-b peer-checked:bg-a-400 peer-checked:text-b font-h2 lg:text-2xl">
                        Where can I earn $SCM token?
                    </div>
                    <div className="collapse-content bg-d text-b peer-checked:bg-a-400 peer-checked:text-b font-h3 text-justify">
                        You can earn $SCM tokens by completing challenges and real-world scenario modules. These tokens can be used to purchase NFTs in the store.
                    </div>
                </div>
            </div>
        </section>
    )
}