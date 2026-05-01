import { LuMapPin, LuTrainFront, LuUtensilsCrossed } from "react-icons/lu";

export default function Venue() {
  return (
    <section id="venue" className="border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-geist-mono)] mb-10">
          Venue
        </h2>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Funkhaus Berlin</h3>
              <p className="text-gray-400 leading-relaxed">
                The event will be held at Funkhaus (Nalepastraße 18, 12459 Berlin, Germany), a
                historic riverside venue known for hosting some of Berlin&apos;s most distinctive
                cultural and technology gatherings.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Funkhaus+Nalepastraße+18+Berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#80E0DC] hover:opacity-80 transition-opacity text-sm font-medium"
            >
              <LuMapPin className="w-4 h-4" />
              Open in Google Maps →
            </a>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-0.5 shrink-0 w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center">
                <LuTrainFront className="w-4 h-4 text-[#80E0DC]" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Getting there</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Nearest S-Bahn: <span className="text-white">Schöneweide</span> (S8, S9, S45,
                  S46, S47, S85). From there, take Tram 21 or Bus 365 — approximately 10–15
                  minutes to Funkhaus. From central Berlin, the journey typically takes 30–40
                  minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-0.5 shrink-0 w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center">
                <LuUtensilsCrossed className="w-4 h-4 text-[#80E0DC]" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Food &amp; drink</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The venue features two on-site food outlets. Additional food trucks will be
                  available throughout the day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
