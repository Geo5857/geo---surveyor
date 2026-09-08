import {
  FileCheck2,
  Headset,
  Layers3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const plans = [
  {
    name: "CV Review",
    price: "49",
    description: "Professional review of your CV.",
    icon: FileCheck2,
  },
  {
    name: "Technical Interview",
    price: "99",
    description: "Technical interview with survey experts.",
    icon: Headset,
  },
  {
    name: "CV + Interview",
    price: "149",
    description: "Complete CV review and technical interview.",
    icon: Layers3,
  },
  {
    name: "Verified Surveyor",
    price: "199",
    description: "Full evaluation with verified profile.",
    icon: ShieldCheck,
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="pricing section-card">
      <div className="section-heading">
        <span>OUR SERVICES</span>
        <h2>Professional Services</h2>
        <p>Choose the service that fits your professional journey.</p>
      </div>

      <div className="price-grid">
        {plans.map((plan) => {
          const Icon = plan.icon;

          return (
            <article
              className={`price-card ${
                plan.featured ? "featured" : ""
              }`}
              key={plan.name}
            >
              {plan.featured && (
                <div className="best">BEST VALUE</div>
              )}

              <div className="price-icon">
                <Icon size={27} />
              </div>

              <h3>{plan.name}</h3>

              <p>{plan.description}</p>

              <div className="price">
                {plan.price}
                <small>AED</small>
              </div>

              <a href="#surveyors" className="price-button">
                Get Started
                <ArrowRight size={15} />
              </a>
            </article>
          );
        })}
      </div>

      <p className="vat">
        All prices are in AED and inclusive of VAT.
      </p>
    </section>
  );
}
