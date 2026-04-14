"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const services = [
  {
    id: "01",
    title: "Direct Factory Supplier Sourcing",
    headline: "Connect directly with verified manufacturers in China",
    description:
      "We help ecommerce brands connect directly with reliable and verified manufacturers in China, ensuring transparent pricing and efficient production partnerships.",
    whatWeDo: [
      "Identify and shortlist verified manufacturing factories",
      "Conduct supplier capability and background verification",
      "Negotiate pricing, MOQs, and production terms",
      "Coordinate product sampling and quotation comparison",
      "Assist in production planning and order confirmation",
      "Ensure direct factory communication without middlemen",
    ],
    outcome: [
      "Lower manufacturing costs",
      "Better profit margins",
      "Reliable long-term supply partnerships",
    ],
  },
  {
    id: "02",
    title: "Existing Supplier Management",
    headline: "Optimize your current manufacturing relationships",
    description:
      "Already working with a supplier? We help you optimize and professionally manage your current manufacturing relationships to improve performance and reduce risks.",
    whatWeDo: [
      "Manage factory communication and negotiation processes",
      "Review and optimize pricing and cost structures",
      "Monitor production timelines and delivery commitments",
      "Resolve quality or production-related issues",
      "Identify opportunities for MOQ or lead-time improvements",
      "Provide strategic supplier performance insights",
    ],
    outcome: [
      "Improved supplier efficiency",
      "Reduced sourcing risks",
      "Smoother operations and cost control",
    ],
  },
  {
    id: "03",
    title: "Custom Packaging & Branding Sourcing",
    headline: "Build a stronger market presence with private branding",
    description:
      "We support brands in building a strong market presence through custom packaging and private label manufacturing solutions.",
    whatWeDo: [
      "Source custom product boxes and branded packaging solutions",
      "Coordinate logo printing, labeling, and private branding",
      "Arrange inserts such as manuals, thank-you cards, and promotional materials",
      "Develop bundle and retail-ready packaging configurations",
      "Optimize packaging costs and production feasibility",
      "Ensure packaging meets ecommerce and Amazon compliance standards",
    ],
    outcome: [
      "Stronger brand perception",
      "Higher product value and conversion potential",
      "Professional retail presentation",
    ],
  },
  {
    id: "04",
    title: "Product Sampling & Quality Inspection",
    headline: "Verify quality before shipment",
    description:
      "We minimize sourcing risks by ensuring product quality and manufacturing standards are verified before shipment.",
    whatWeDo: [
      "Coordinate product sample development and approval",
      "Conduct pre-production and pre-shipment inspections",
      "Monitor product quality consistency during manufacturing",
      "Provide defect analysis and quality control reports",
      "Facilitate corrective actions with factories if required",
      "Ensure production aligns with agreed specifications",
    ],
    outcome: [
      "Reduced return rates",
      "Improved customer satisfaction",
      "Greater confidence in product quality",
    ],
  },
  {
    id: "05",
    title: "DDP Shipping & Logistics Management",
    headline: "Manage door-to-door logistics from China",
    description:
      "We manage complete door-to-door logistics from the factory in China to your warehouse, Amazon FBA center, or 3PL facility.",
    whatWeDo: [
      "Plan and optimize international freight solutions (air / sea / express)",
      "Handle export documentation and customs clearance",
      "Coordinate duties and tax-inclusive shipping under DDP terms",
      "Manage shipment tracking and delivery scheduling",
      "Arrange final delivery to fulfillment centers or warehouses",
      "Support inventory flow planning for ecommerce operations",
    ],
    outcome: [
      "Hassle-free international shipping",
      "Predictable landed costs",
      "Faster and more reliable supply chain execution",
    ],
  },
];

export default function ServicesSection() {
  const [activeServiceId, setActiveServiceId] = useState(services[0].id);
  const activeService =
    services.find((service) => service.id === activeServiceId) || services[0];

  return (
    <section id="services" className="w-full bg-[var(--black)] px-4 py-16 md:py-24">
      <div className="morphism-surface-dark mx-auto max-w-7xl rounded-3xl p-8 md:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="heading-font mb-10 text-4xl leading-tight text-[var(--orange)] md:text-5xl">
              Services <br /> We Offer
            </h2>

            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                >
                  <button
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    className={`group flex w-full items-center justify-between rounded-full border px-6 py-5 text-left transition-all duration-300 ${
                      activeServiceId === service.id
                        ? "border-[var(--orange)] bg-[var(--orange)]"
                        : "border-zinc-600 hover:border-[var(--orange)] hover:bg-[var(--orange)]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-4xl font-bold transition ${
                          activeServiceId === service.id
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {service.id}
                      </span>
                      <p className="description-font text-sm text-white group-hover:text-white md:text-base">
                        {service.title}
                      </p>
                    </div>

                    <ArrowRight
                      size={30}
                      className={`transition ${
                        activeServiceId === service.id
                          ? "text-white"
                          : "text-zinc-400 group-hover:text-white"
                      }`}
                    />
                  </button>

                  {activeServiceId === service.id && (
                    <div className="mt-4 space-y-4 lg:hidden">
                      <h3 className="heading-font text-lg text-white">
                        {service.headline}
                      </h3>

                      <div className="morphism-shade rounded-xl p-5 text-sm leading-relaxed text-[#1a1a1a]">
                        {service.description}
                      </div>

                      <div className="rounded-xl bg-[var(--black)] p-5">
                        <h4 className="heading-font mb-3 text-base text-[var(--orange)]">
                          What we do:
                        </h4>
                        <ul className="description-font list-inside list-disc space-y-2 text-sm text-white">
                          {service.whatWeDo.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl bg-[var(--orange)] p-5 text-white">
                        <h4 className="heading-font mb-3 text-base">Outcome:</h4>
                        <ul className="description-font list-inside list-disc space-y-1 text-sm">
                          {service.outcome.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden space-y-6 lg:block">
            <h3 className="heading-font text-xl text-white md:text-2xl">
              {activeService.headline}
            </h3>

            <div className="morphism-shade description-font rounded-xl p-6 text-sm leading-relaxed text-[#1a1a1a] md:text-base">
              {activeService.description}
            </div>

            <div className="rounded-xl bg-[var(--black)] p-6">
              <h4 className="heading-font mb-4 text-lg text-[var(--orange)]">
                What we do:
              </h4>
              <ul className="description-font list-inside list-disc space-y-2 text-sm text-white md:text-base">
                {activeService.whatWeDo.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-[var(--orange)] p-6 text-white">
              <h4 className="heading-font mb-3 text-lg">Outcome:</h4>
              <ul className="description-font list-inside list-disc space-y-1 text-sm md:text-base">
                {activeService.outcome.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}