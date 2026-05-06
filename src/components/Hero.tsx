import Image from "next/image";
import { LuMic, LuTicket, LuMapPin, LuCalendar, LuHand } from "react-icons/lu";
import basePath from "@/lib/basePath";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#80E0DC]/8 via-black to-[#C73E9C]/8 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center gap-8">
        {/* Logo mark */}
        <Image
          src={`${basePath}/logo-mark.svg`}
          alt="Berlin Ethereum Day"
          width={256}
          height={256}
          className="w-40 h-40 md:w-56 md:h-56"
          priority
        />

        {/* Wordmark */}
        <div className="font-[family-name:var(--font-geist-mono)]">
          <h1 className="leading-tight">
            <span className="block text-5xl sm:text-7xl md:text-8xl font-bold text-[#80E0DC]">
              Berlin
            </span>
            <span className="block text-5xl sm:text-7xl md:text-8xl font-bold text-[#C73E9C]">
              Ethereum Day
            </span>
          </h1>
        </div>

        {/* Event meta */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-gray-300 text-base md:text-lg">
          <span className="flex items-center gap-2">
            <LuCalendar className="w-4 h-4 text-[#80E0DC]" />
            June 15, 2026
          </span>
          <span className="hidden sm:block text-gray-700">·</span>
          <span className="flex items-center gap-2">
            <LuMapPin className="w-4 h-4 text-[#80E0DC]" />
            Funkhaus, Berlin
          </span>
        </div>

        <p className="text-gray-400 text-sm">Free to attend · Application via Pretix</p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://mum.ticketh.xyz/etheverywhere/berlinethday/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#C73E9C] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <LuTicket className="w-5 h-5" />
            Register to Attend
          </a>
          <a
            href="https://pad.ethereum.org/form/#/2/form/view/AXumk43DE0TrDNAaMBYuCa9gdCAjQ-rKCAWRdskNTKw/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-[#C73E9C] text-[#C73E9C] rounded-lg font-medium hover:bg-[#C73E9C]/10 transition-colors"
          >
            <LuMic className="w-5 h-5" />
            Apply to Speak
          </a>
          <a
            href="https://forms.gle/vH2evULdDG6U2QGZ6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-[#80E0DC] text-[#80E0DC] rounded-lg font-medium hover:bg-[#80E0DC]/10 transition-colors"
          >
            <LuHand className="w-5 h-5" />
            Volunteer
          </a>
        </div>

        {/* Short intro */}
        <div className="max-w-2xl text-left sm:text-center mt-4 space-y-4 text-gray-300 leading-relaxed">
          <p>
            Ethereum was built as an enduring infrastructure for a free, open, and permissionless world,
            where users retain control over their digital lives and self-sovereignty.
          </p>
          <p>
            Join us in Berlin for a full day of sessions with speakers from the Ethereum Foundation
            and the broader ecosystem, exploring Ethereum&apos;s future - its technical direction,
            core values, and the road ahead.
          </p>
        </div>
      </div>
    </section>
  );
}
