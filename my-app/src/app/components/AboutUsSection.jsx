import Image from "next/image";

const highlights = [
  {
    title: "Nearly 15 Years",
    description:
      "Built on almost a decade and a half of sourcing experience across factories, categories, and cross-border operations.",
  },
  {
    title: "Verified Factory Network",
    description:
      "We work with vetted manufacturers and proven suppliers to reduce risk and improve buying confidence.",
  },
  {
    title: "End-to-End Support",
    description:
      "From supplier discovery and negotiation to quality checks and logistics, we manage the full sourcing workflow.",
  },
  {
    title: "Transparent Execution",
    description:
      "Clear communication, structured process, and practical guidance designed to protect margins and speed up decisions.",
  },
];

const stats = [
  { value: "15+", label: "Years of sourcing experience" },
  { value: "2000+", label: "Clients and growing brands served" },
  { value: "500+", label: "Trusted suppliers and factory partners" },
];

export default function AboutUsSection() {
  return (
    <section id="about-us" className="w-full bg-[var(--black)] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[var(--morphism-black)] p-6 md:rounded-[40px] md:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <p className="nav-font text-sm uppercase tracking-[0.28em] text-[var(--white-soft)]/80">
                About StratiqDigital
              </p>
              <h2 className="heading-font mt-4 text-4xl leading-[0.95] text-[var(--orange)] md:text-6xl">
                Built for serious sourcing
                <br />
                and long-term growth
              </h2>

              <p className="description-font mt-6 max-w-[620px] text-lg leading-relaxed text-zinc-200 md:text-xl">
                StratiqDigital helps brands source smarter from China with a
                practical, transparent approach. We combine supplier research,
                factory verification, negotiation support, quality control, and
                logistics coordination to help teams move faster with less risk.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <article
                    key={item.title}
                    className="morphism-surface rounded-3xl border border-white/10 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.22)]"
                  >
                    <h3 className="heading-font text-2xl text-[var(--black)] md:text-[2rem]">
                      {item.title}
                    </h3>
                    <p className="description-font mt-3 text-sm leading-relaxed text-[#1f2428] md:text-base">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[var(--black)]">
                <Image
                  src="/assets/services2Img.png"
                  alt="StratiqDigital team working on sourcing strategy"
                  width={900}
                  height={700}
                  className="h-auto w-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-[var(--morphism-black)] p-5 text-center"
                  >
                    <p className="heading-font text-4xl text-[var(--orange)] md:text-5xl">
                      {stat.value}
                    </p>
                    <p className="description-font mt-2 text-sm leading-relaxed text-zinc-200 md:text-base">
                      {stat.label}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
