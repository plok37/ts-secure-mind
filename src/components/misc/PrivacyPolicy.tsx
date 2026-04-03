import AnimatedGridBackground from "@/components/AnimatedGridBackground";

export default function PrivacyPolicyPage() {
    return (
        <>
            <AnimatedGridBackground />
            <div className="flex justify-center pt-40 min-h-screen relative">
                <div className="max-w-4xl bg-white/80 rounded-xl shadow-lg p-10 border border-gray-300 h-full">
                    <h1 className="text-2xl font-bold mb-6 text-center">Privacy Policy</h1>
                    <p className="mb-4 text-gray-800">This Privacy Policy explains how SecureMind ("we", "our", or "us") handles your information when you use our decentralized educational platform.</p>
                    <ol className="list-decimal list-inside space-y-4 text-gray-800 text-base">
                        <li>
                            <strong>Information We Collect:</strong> SecureMind does <u>not</u> collect any personal information such as your name, email, or address. The only data we store is related to event logs emitted during buying, listing, and selling NFTs in the NFT marketplace. No other usage data, analytics, or tracking information is collected or stored by us.
                        </li>
                        <li>
                            <strong>How We Use Event Data:</strong> The NFT marketplace event data (buy, list, sell) is stored solely to support platform functionality and to allow users to view marketplace activity. This data is not used for analytics, marketing, or shared with third parties.
                        </li>
                        <li>
                            <strong>Blockchain Transparency:</strong> Please note that NFT marketplace events and Crafting NFTs related transactions are recorded on the blockchain and are publicly visible by nature of decentralized technology. SecureMind does not control or restrict access to blockchain data.
                        </li>
                        <li>
                            <strong>No Cookies or Tracking:</strong> SecureMind does not use cookies or any tracking technologies to monitor your activity on the platform.
                        </li>
                        <li>
                            <strong>Your Rights:</strong> You may disconnect your wallet or stop using SecureMind at any time. If you have questions or concerns about your privacy, please contact us at <span className="underline">contact@securemind.app</span>.
                        </li>
                        <li>
                            <strong>Changes to This Policy:</strong> We may update this Privacy Policy from time to time. Continued use of SecureMind constitutes acceptance of any changes.
                        </li>
                    </ol>
                    <p className="mt-8 text-center text-gray-600 text-sm">
                        By using SecureMind, you consent to this Privacy Policy.
                    </p>
                </div>
            </div>
        </>
    )
}

