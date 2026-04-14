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
    <section id="services" className="w-full bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-orange-500 leading-tight mb-10">
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
                    className={`group flex w-full items-center justify-between rounded-full border px-6 py-4 text-left transition-all duration-300 ${
                      activeServiceId === service.id
                        ? "border-[#ff5a0f] bg-[#ff5a0f]"
                        : "border-zinc-600 hover:border-[#ff5a0f] hover:bg-[#ff5a0f]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-3xl font-bold transition ${
                          activeServiceId === service.id
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {service.id}
                      </span>
                      <p className="text-white text-sm md:text-base font-medium group-hover:text-white">
                        {service.title}
                      </p>
                    </div>

                    <ArrowRight
                      className={`transition ${
                        activeServiceId === service.id
                          ? "text-white"
                          : "text-zinc-400 group-hover:text-white"
                      }`}
                    />
                  </button>

                  {activeServiceId === service.id && (
                    <div className="mt-4 space-y-4 lg:hidden">
                      <h3 className="text-lg text-white font-medium">
                        {service.headline}
                      </h3>

                      <div className="bg-zinc-700/60 rounded-xl p-5 text-zinc-200 text-sm leading-relaxed">
                        {service.description}
                      </div>

                      <div className="bg-black rounded-xl p-5">
                        <h4 className="text-orange-500 font-semibold mb-3 text-base">
                          What we do:
                        </h4>
                        <ul className="space-y-2 text-sm text-white list-disc list-inside">
                          {service.whatWeDo.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-orange-500 rounded-xl p-5 text-white">
                        <h4 className="font-semibold mb-3 text-base">Outcome:</h4>
                        <ul className="space-y-1 text-sm list-disc list-inside">
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
            <h3 className="text-xl md:text-2xl text-white font-medium">
              {activeService.headline}
            </h3>

            <div className="bg-zinc-700/60 rounded-xl p-6 text-zinc-200 text-sm md:text-base leading-relaxed">
              {activeService.description}
            </div>

            <div className="bg-black rounded-xl p-6">
              <h4 className="text-orange-500 font-semibold mb-4 text-lg">
                What we do:
              </h4>
              <ul className="space-y-2 text-sm md:text-base text-white list-disc list-inside">
                {activeService.whatWeDo.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-500 rounded-xl p-6 text-white">
              <h4 className="font-semibold mb-3 text-lg">Outcome:</h4>
              <ul className="space-y-1 text-sm md:text-base list-disc list-inside">
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