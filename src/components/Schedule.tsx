import { ScheduleSession } from "@/types/schedule";

// Visual styling per track — left accent bar + badge color.
const TRACK_STYLES: Record<string, { bar: string; badge: string }> = {
  "Core Protocol": {
    bar: "border-l-blue-500",
    badge: "bg-blue-500/15 text-blue-300",
  },
  "Smart contracts & Dev tools": {
    bar: "border-l-purple-500",
    badge: "bg-purple-500/15 text-purple-300",
  },
  Ecosystem: {
    bar: "border-l-[#80E0DC]",
    badge: "bg-[#80E0DC]/15 text-[#80E0DC]",
  },
  Other: {
    bar: "border-l-gray-600",
    badge: "bg-gray-700/40 text-gray-400",
  },
};

const SESSION_TYPE_STYLES: Record<string, string> = {
  "Talk (20 min)": "bg-green-500/15 text-green-300",
  "Lightning (10 min)": "bg-amber-500/15 text-amber-300",
  Other: "bg-gray-700/40 text-gray-400",
};

function trackStyle(track: string | null) {
  return (track && TRACK_STYLES[track]) || TRACK_STYLES.Other;
}

function SessionRow({ session }: { session: ScheduleSession }) {
  // A "break" (e.g. LUNCH) has no real speaker, or the speaker just repeats
  // the title with no project attached.
  const isBreak =
    !session.speaker ||
    (!session.project &&
      session.speaker.trim().toLowerCase() ===
        (session.title ?? "").trim().toLowerCase());
  const styles = trackStyle(session.track);

  return (
    <div
      className={`flex flex-col sm:flex-row gap-1 sm:gap-6 border-l-4 ${styles.bar} bg-gray-900/60 hover:bg-gray-900 transition-colors rounded-r-lg pl-4 pr-5 py-4`}
    >
      <div className="shrink-0 sm:w-32 font-[family-name:var(--font-geist-mono)] text-sm text-gray-400 pt-0.5">
        {session.time}
      </div>

      <div className="flex-1 min-w-0">
        {isBreak ? (
          <p className="font-semibold text-gray-300 uppercase tracking-wide text-sm">
            {session.title}
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {session.title && (
                <h3 className="font-semibold text-white">{session.title}</h3>
              )}
              {session.sessionType && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    SESSION_TYPE_STYLES[session.sessionType] ??
                    SESSION_TYPE_STYLES.Other
                  }`}
                >
                  {session.sessionType}
                </span>
              )}
              {session.track && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${styles.badge}`}
                >
                  {session.track}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">
              <span className="text-[#C73E9C]">{session.speaker}</span>
              {session.project && (
                <span className="text-gray-500"> · {session.project}</span>
              )}
            </p>
            {session.abstract && (
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {session.abstract}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Schedule({
  sessions,
}: {
  sessions: ScheduleSession[];
}) {
  if (sessions.length === 0) return null;

  return (
    <section id="schedule" className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-geist-mono)]">
          Schedule
        </h2>
        <p className="text-gray-500 mt-2 text-sm">Subject to change</p>
      </div>

      <div className="flex flex-col gap-2">
        {sessions.map((session, i) => (
          <SessionRow key={`${session.time}-${i}`} session={session} />
        ))}
      </div>
    </section>
  );
}
