import AnimatedCards from "./animated-cards";
import { cardsData } from "../../../constants";
import { TextAnimate } from "./text-animate";

export default function RealWorldScenario() {
    return (
        <section className="py-20 px-4 lg:px-20 xl:px-32 2xl:px-44 mb-6 z-10 flex flex-col lg:flex-col gap-16 min-h-[900px]">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="rounded-3xl w-full lg:w-1/2 xl:w-4/10 flex flex-col gap-4">
                    <div className="text-xl lg:text-4xl font-bold font-fantasy self-center font-h1">
                        Real-World Scenario
                    </div>
                    <div className="h-fit bg-b p-6 rounded-3xl font-h3 lg:text-xl shadow-xl text-justify">
                        The challenges here are inspired by real-world scenarios, helping you spot vulnerabilities before deployment.
                    </div>
                    <div className="p-6 accentWhiteBg rounded-3xl xl:grow overflow-y-hidden shadow-xl bg-c text-h3 lg:text-xl">
                        Discover real exploits that cost millions. Can you spot the vulnerabilities before deployment?
                        <br />
                        <br />
                        <br />
                        Key elements included in the challenges:
                        <div className="text-gray-50 flex flex-wrap gap-2 mt-4">
                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                Non-Fungible Token
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                Flash Loan
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                ERC20
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                Ownable
                            </span>
                            {/* <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                Upgradeable Contracts
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                UUPS
                            </span> */}
                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                Defi
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                Voting
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                ERC721
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                Solidity
                            </span>
                            {/* <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-sm dark:bg-gray-700 dark:text-gray-400 border border-gray-500 font-h3">
                                Yul
                            </span> */}
                        </div>
                    </div>
                </div>
                <div className="w-60 lg:w-2/3 xl:w-6/10 grid grid-rows-4 xl:grid-rows-1 sm:grid-flow-col p-14 bg-d rounded-3xl shadow-2xl">
                    <AnimatedCards cards={cardsData} />
                </div>
            </div>
            <div>
                <TextAnimate className="rounded-3xl font-h2 text-xl lg:text-4xl text-center text-a font-bold" animation="blurInUp" by="character" once={false}>
                    Ready to challenge yourself? Dive in and discover the thrill of simulated
                </TextAnimate>
                <TextAnimate className="rounded-3xl font-h2 text-xl lg:text-4xl text-center text-a font-bold" animation="blurInUp" by="character" once={false} duration={0.5} delay={0.5}>
                    real-world smart contract exploits!
                </TextAnimate>
            </div>

        </section>
    )
}