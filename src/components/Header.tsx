import Image from "next/image";
import { LuMic, LuTicket } from "react-icons/lu";
import basePath from "@/lib/basePath";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-800 py-4 px-6 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src={`${basePath}/logo-mark.webp`}
            alt="Berlin Ethereum Day logo"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
            priority
          />
          <div>
            <p className="text-sm md:text-base font-bold text-white font-[family-name:var(--font-geist-mono)] leading-tight">
              Berlin Ethereum Day
            </p>
            <p className="text-xs text-[#80E0DC]">June 15, 2026 · Funkhaus</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Apply to Speak — full text desktop, icon-only mobile */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 border border-[#C73E9C] text-[#C73E9C] rounded-lg font-medium text-sm hover:bg-[#C73E9C]/10 transition-colors"
          >
            <LuMic className="w-4 h-4" />
            Apply to Speak
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            title="Apply to Speak"
            className="flex md:hidden items-center justify-center w-9 h-9 border border-[#C73E9C] text-[#C73E9C] rounded-lg hover:bg-[#C73E9C]/10 transition-colors"
          >
            <LuMic className="w-4 h-4" />
          </a>

          {/* Register — full text desktop, icon-only mobile */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#C73E9C] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <LuTicket className="w-4 h-4" />
            Register
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            title="Register"
            className="flex md:hidden items-center justify-center w-9 h-9 bg-[#C73E9C] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <LuTicket className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/ethdevberlin/berlin-ethereum-day"
            target="_blank"
            rel="noopener noreferrer"
            title="View source on GitHub"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
