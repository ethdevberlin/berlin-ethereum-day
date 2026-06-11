import speakers from "@/data/speakers.json";
import schedule from "@/data/schedule.json";
import { Speaker } from "@/types/speaker";
import { ScheduleSession } from "@/types/schedule";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SpeakersGrid from "@/components/SpeakersGrid";
import Schedule from "@/components/Schedule";
import Venue from "@/components/Venue";
import Organizers from "@/components/Organizers";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1">
        <Hero />

        <Schedule sessions={schedule as ScheduleSession[]} />
        <SpeakersGrid speakers={speakers as Speaker[]} />
        <Venue />
        <Organizers />
      </main>
      <Footer />
    </div>
  );
}
