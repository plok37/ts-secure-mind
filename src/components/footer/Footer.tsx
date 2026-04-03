import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 2xl:px-44 relative">
                <aside>
                    <div className="flex items-center gap-2.5">
                        <Image
                            src="/SecureMindLogo.svg"
                            alt="Secure Mind Logo"
                            width={40}
                            height={40}
                        />
                        <h1 className="font-bold text-2xl font-h1">SecureMind</h1>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <Link
                            href="https://github.com/plok37"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-black transition-colors duration-300"
                        >
                            <svg className="w-7 h-7 hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                {/* GitHub SVG path */}
                                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                            </svg>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/lim-shi-han-252632336/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
                        >
                            <svg className="w-7 h-7 hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                {/* LinkedIn SVG path */}
                                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76 0-.97.78-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.78 1.76-1.75 1.76zm15.25 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                            </svg>
                        </Link>
                        <Link
                            href="https://discord.com/users/1296098495329206348"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                        >
                            <svg className="w-7 h-7 hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                {/* Discord SVG path */}
                                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.0371c-1.4712.2492-3.0103.8227-4.8852 1.5152a.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276c-.598.3428-1.2205.6447-1.8733.8923a.0766.0766 0 0 0-.0406.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.9616-.6066 3.9501-1.5218 6.0029-3.0294a.077.077 0 0 0 .0312-.0551c.5004-5.177-.8382-9.673-3.5485-13.6601a.061.061 0 0 0-.0312-.0286ZM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0957 2.1568 2.4189 0 1.3333-.9555 2.419-2.1569 2.419Zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0957 2.1568 2.4189 0 1.3333-.946 2.419-2.1568 2.419Z" />
                            </svg>
                        </Link>
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title font-h1">Services</h6>
                    <Link className="link link-hover font-h3" href="/#learning">Learning</Link>
                    <Link className="link link-hover font-h3" href="/#challenges">Challenges</Link>
                    <Link className="link link-hover font-h3" href="/#real-world-scenario">Real-world Scenarios</Link>
                </nav>
                <nav>
                    <h6 className="footer-title font-h1">Others</h6>
                    <Link className="link link-hover font-h3" href="/nft-selection">NFT</Link>
                    <Link className="link link-hover font-h3" href="/#faqs">FAQs</Link>
                </nav>
                <nav>
                    <h6 className="footer-title font-h1">Legal</h6>
                    <Link className="link link-hover font-h3" href="/terms-of-use">Terms of use</Link>
                    <Link className="link link-hover font-h3" href="/privacy-policy">Privacy policy</Link>
                </nav>

            </footer>
            <footer className="footer relative bg-base-200 justify-center">
                <p className="text-sm text-gray-500 items-center justify-center text-center p-4">
                    © 2025 SecureMind. All rights reserved.
                </p>
            </footer>
        </>
    )
}