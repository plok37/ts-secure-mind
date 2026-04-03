import Image from "next/image"
import { FaGithub } from "react-icons/fa"

export default function SecureMindHeaderLogo() {
    return (
        <nav className="flex items-center md:gap-5">
            <a href="/" className="flex items-center gap-2.5 text-zinc-800">
                <Image
                    src="/SecureMindLogo.svg"
                    alt="Secure Mind Logo"
                    width={60}
                    height={60}
                />
                <h1 className="font-bold text-4xl hidden md:block font-h1">SecureMind</h1>
            </a>
            <a
                href="https://github.com/plok37"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors border-2 border-zinc-600 hover:border-zinc-500 cursor-alias hidden md:block"
            >
                <FaGithub className="h-5 w-5 text-white" />
            </a>
        </nav>
    )
}