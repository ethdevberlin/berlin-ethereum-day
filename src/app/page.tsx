import speakers from "@/data/speakers.json";
import { Speaker } from "@/types/speaker";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SpeakersGrid from "@/components/SpeakersGrid";
import Venue from "@/components/Venue";
import Organizers from "@/components/Organizers";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Long intro + What to expect */}
        <section id="about" className="border-t border-gray-900">
          <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 prose prose-invert prose-lg">
            <p>
              For over a decade, Ethereum has demonstrated resilience at global scale, operating
              without downtime or major disruption through shifting market cycles, technological
              acceleration, and waves of speculation. Ethereum was not created for short-term trends
              or finite games. It was built as enduring infrastructure for an open, permissionless
              world — one where individuals are empowered, not intermediated. Ethereum is not simply
              an alternative — it is a foundation for a world in which users retain control over
              their digital lives: their data, assets, identities, agents, and interactions.
            </p>
            <p>
              Join us for a full day of sessions featuring speakers from the Ethereum Foundation and
              the broader ecosystem, exploring Ethereum&apos;s future direction. Berlin is home to
              one of the strongest open source, decentralized, freedom-tech, and privacy-focused
              communities, and Berlin Blockchain Week provides a natural setting to engage with these
              values in practice. Connect with the local community and explore where Ethereum is
              heading next.
            </p>

            <h2>What to expect</h2>
            <p>
              The full-day program will explore Ethereum&apos;s future direction, with technical
              topics including the updated protocol roadmap, and thoughtful discussions on how to
              ensure that self-sovereignty, censorship resistance, open source, security, and privacy
              are not optional features, but foundational guarantees of the systems we build next.
            </p>
            <p>
              Grounded in Ethereum&apos;s core values, these diverse sessions will explore how these
              principles translate into real systems, real trade-offs, and real responsibility for
              those building on and around Ethereum. This is not just a retrospective on what
              Ethereum has achieved, but a forward-looking conversation about what it must become:
              infrastructure that remains uncompromising in its values while scaling to meet global
              demand.
            </p>
          </div>
        </section>

        <SpeakersGrid speakers={speakers as Speaker[]} />
        <Venue />
        <Organizers />
      </main>
      <Footer />
    </div>
  );
}
