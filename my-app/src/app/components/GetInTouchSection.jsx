import QuoteForm from "./QuoteForm";

export default function GetInTouchSection() {
  return (
    <section id="contact" className="w-full overflow-hidden bg-[var(--black)]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <h2 className="heading-font text-5xl leading-[0.93] text-[var(--orange)] md:text-6xl xl:text-7xl">
              Get in Touch<br />Today!
            </h2>

            <p className="description-font mt-6 max-w-[560px] text-lg leading-relaxed text-zinc-300 md:text-xl">
              Ready to start sourcing smarter? Our team is here to connect you
              with verified manufacturers, streamline your supply chain, and
              protect your margins.
            </p>
          </div>

          <div>
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
