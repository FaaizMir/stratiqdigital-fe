import Image from "next/image";
import QuoteButtonModal from "./QuoteButtonModal";

export default function PlatformsSection() {
  return (
    <section id="projects" className="w-full bg-black px-4 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[34px] border border-zinc-700/70 bg-[#f3f3f3] p-6 md:p-10 lg:p-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <h2 className="self-start font-[Sora] text-4xl font-extrabold leading-[0.95] text-[#ff5a0f] md:text-6xl">
              Platforms
              <br />
              We Support
            </h2>

            <p className="self-start justify-self-start pt-2 text-2xl font-medium leading-tight text-[#101114] md:text-4xl lg:justify-self-end lg:pt-4 lg:text-right">
              Helping you succeed across
              <br />
              all major online marketplaces
            </p>
          </div>

          <div className="mt-7 md:mt-10">
            <Image
              src="/assets/platformsImg.png"
              alt="Supported online marketplaces"
              width={1600}
              height={900}
              className="h-auto w-full object-contain"
              priority={false}
            />
          </div>

        
        </div>
      </div>
        <QuoteButtonModal />
    </section>
  );
}