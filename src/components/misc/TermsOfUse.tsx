import AnimatedGridBackground from "@/components/AnimatedGridBackground";

export default function TermsOfUseyPage() {

    return (
        <>
            <AnimatedGridBackground />
            <div className="flex justify-center pt-40 min-h-screen relative">
                <div className="max-w-4xl bg-white/80 rounded-xl shadow-lg p-10 border border-gray-300 h-full">
                    <h1 className="text-2xl font-bold mb-6 text-center">Terms of Use</h1>
                    <ol className="list-decimal list-inside space-y-4 text-gray-800 text-base">
                        <li>
                            <strong>Educational Purpose Only:</strong> SecureMind is an educational platform designed to teach users about blockchain security, smart contract vulnerabilities, and exploitation techniques in a controlled, ethical environment. All content, challenges, and scenarios are for learning and research purposes only.
                        </li>
                        <li>
                            <strong>No Illegal or Malicious Use:</strong> You agree not to use the knowledge, skills, or techniques learned on this platform for any illegal, unethical, or malicious activities. Exploiting real-world systems, contracts, or platforms without explicit permission is strictly prohibited and may be illegal.
                        </li>
                        <li>
                            <strong>No Financial Advice:</strong> SecureMind does not provide investment, financial, or legal advice. All scenarios and examples are fictional or simulated. Do not use this platform as a basis for financial decisions or real-world exploitation.
                        </li>
                        <li>
                            <strong>User Responsibility:</strong> You are solely responsible for your actions both on and off the platform. SecureMind, its creator are not liable for any misuse of information, damages, or legal consequences resulting from your activities.
                        </li>
                        <li>
                            <strong>No Flag Sharing:</strong> You are not allowed to share, distribute, or publish challenge flags with other users. Each user must solve challenges independently to claim rewards.
                        </li>
                        <li>
                            <strong>No Multi-Account Reward Claiming:</strong> You are not allowed to log in with another account and submit a flag to claim a reward if you have already claimed the reward for that challenge with your own account.
                        </li>
                        <li>
                            <strong>Changes to Terms:</strong> SecureMind reserves the right to update these Terms of Use at any time. Continued use of the platform constitutes acceptance of any changes.
                        </li>
                    </ol>
                    <p className="mt-8 text-center text-gray-600 text-sm">
                        By using SecureMind, you acknowledge and agree to these Terms of Use. If you do not agree, please discontinue use of the platform.
                    </p>
                </div>
            </div>
        </>
    )
}

