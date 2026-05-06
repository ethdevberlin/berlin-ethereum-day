import Image from "next/image";
import { LuUser } from "react-icons/lu";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { Speaker } from "@/types/speaker";
import basePath from "@/lib/basePath";

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors p-6 flex flex-col items-center text-center gap-3">
      {speaker.photo ? (
        <Image
          src={speaker.photo.startsWith("http") ? speaker.photo : `${basePath}${speaker.photo}`}
          alt={speaker.name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
          <LuUser className="w-8 h-8 text-gray-600" />
        </div>
      )}
      <div>
        <p className="font-semibold text-white">{speaker.name}</p>
        {speaker.affiliation && (
          <p className="text-sm text-[#80E0DC] mt-0.5">{speaker.affiliation}</p>
        )}
      </div>
      <div className="flex items-center gap-3 mt-1">
        {speaker.x && (
          <a
            href={speaker.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            title={`${speaker.name} on X`}
          >
            <FaXTwitter className="w-4 h-4" />
          </a>
        )}
        {speaker.github && (
          <a
            href={speaker.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            title={`${speaker.name} on GitHub`}
          >
            <FaGithub className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function SpeakersGrid({ speakers }: { speakers: Speaker[] }) {
  return (
    <section id="speakers" className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-geist-mono)]">
            Speakers
          </h2>
          <p className="text-gray-500 mt-2 text-sm">More to be announced</p>
        </div>
        <a
          href="https://forms.gle/J3iRTzK46vw16VEC8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C73E9C] hover:opacity-80 transition-opacity text-sm font-medium flex items-center gap-1 shrink-0"
        >
          Interested in speaking? Apply here →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </div>
    </section>
  );
}
