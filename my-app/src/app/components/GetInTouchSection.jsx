import Image from "next/image";

export default function GetInTouchSection() {
  return (
    <section id="contact" className="w-full bg-black pb-0 pt-8 md:pt-14">
      <div className="w-full px-4 md:px-12">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
          <div className="pb-4">
            <h2 className="font-[Sora] text-4xl font-extrabold leading-[0.95] text-[#ff5a0f] md:text-7xl">
              Get in Touch Today!
            </h2>
            <p className="mt-5 max-w-[700px] text-2xl leading-tight text-zinc-100 md:text-4xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut.
            </p>

            <form className="mt-8 flex w-full max-w-[520px] items-center rounded-full border border-zinc-500 bg-[#1a1d22] p-1.5">
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full bg-transparent px-4 py-2 text-base text-white placeholder:text-zinc-300 outline-none md:text-xl"
              />
              <button
                type="button"
                className="rounded-full bg-[#ff5a0f] px-5 py-2 text-sm font-bold text-white md:px-7 md:text-xl"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute bottom-[30%] left-0 right-0 hidden h-px bg-zinc-400/80 lg:block" />
            <Image
              src="/assets/getInTouchImg.png"
              alt="Support representative"
              width={620}
              height={760}
              className="relative z-10 h-auto w-full max-w-[510px] object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}