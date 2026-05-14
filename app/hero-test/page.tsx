import TypingText from "@/components/TypingText";

export default function HeroTestPage() {
  return (
    <main className="min-h-[74svh] sm:min-h-[82svh] lg:min-h-[88svh] bg-[#171812] text-[#fffcf7]">
      <section className="relative isolate flex min-h-[74svh] sm:min-h-[82svh] lg:min-h-[88svh] items-center justify-center overflow-hidden px-6 py-20 sm:px-10">
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          loop
          muted
          playsInline
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 -z-10 bg-[#15140f]/22" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(255,244,220,0.15),transparent_32%),radial-gradient(ellipse_at_50%_0%,rgba(255,250,235,0.09),transparent_50%),radial-gradient(circle_at_50%_42%,rgba(248,245,241,0.08),transparent_34%),linear-gradient(to_bottom,rgba(23,24,18,0.10),rgba(23,24,18,0.42))]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(122deg,transparent_4%,transparent_48%,rgba(255,226,184,0.06)_66%,rgba(218,156,88,0.03)_82%,transparent_100%)] opacity-60" />

        <div className="mx-auto max-w-[860px] text-center">
          <p className="mb-5 text-[0.72rem] font-black uppercase tracking-[0.22em] text-[#d9dcc8] sm:mb-7">
            Pangyo Dasibom Clinic
          </p>
          <h1 className="mx-auto max-w-[10.5em] text-balance text-[2.1rem] font-extrabold leading-[1.25] tracking-normal text-[#fffaf2] sm:text-[3.6rem] sm:leading-[1.2] lg:text-[4.75rem] lg:leading-[1.18]">
            <TypingText text={"당신의 마음에도\n다시 봄이 올 수 있도록"} />
          </h1>
        </div>
      </section>
    </main>
  );
}
