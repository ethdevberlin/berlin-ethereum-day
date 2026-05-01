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

        <SpeakersGrid speakers={speakers as Speaker[]} />
        <Venue />
        <Organizers />
      </main>
      <Footer />
    </div>
  );
}
