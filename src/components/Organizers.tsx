export default function Organizers() {
  return (
    <section id="organizers" className="border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-geist-mono)] mb-6">
          Organizers
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-2xl">
          This event is coordinated by multiple contributors, including the{" "}
          <a
            href="https://x.com/EFetheverywhere"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#80E0DC] transition-colors"
          >
            Ethereum Everywhere
          </a>{" "}
          team at the{" "}
          <a
            href="https://ethereum.foundation/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#80E0DC] transition-colors"
          >
            Ethereum Foundation
          </a>{" "}
          and members of the local community, and is hosted at Funkhaus by{" "}
          <a
            href="https://futura.camp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#80E0DC] transition-colors"
          >
            Futura Camp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
