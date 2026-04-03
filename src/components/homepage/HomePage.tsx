import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import Learning from "@/components/homepage/learning/Learning";
import Challenges from "@/components/homepage/challenge/Challenges";
import RealWorldScenario from "@/components/homepage/real-world-scenario/RealWorldScenario";
import FAQs from "@/components/homepage/FAQs";
import Footer from "@/components/footer/Footer";
import { useChainId } from "wagmi"
import { chainsToContracts } from "@/contractConstants"

export default function HomePage() {
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
                    <div className="min-h-[1500px] relative z-10">
                        <section id="learning" className="section-scroll-offset">
                            <Learning />
                        </section>
                        <section id="challenges" className="section-scroll-offset-challenges">
                            <Challenges />
                        </section>
                        <section id="real-world-scenario" className="section-scroll-offset-real-world">
                            <RealWorldScenario />
                        </section>
                        <section id="faqs" className="section-scroll-offset-faqs">
                            <FAQs />
                        </section>
                    </div>
                    <Footer />
                </>
            )}
        </>
    )
}