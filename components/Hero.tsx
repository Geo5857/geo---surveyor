import Image from "next/image";
import {
  ShieldCheck,
  Users,
  LockKeyhole,
  Globe2,
  ArrowRight,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Verified & Trusted",
    text: "Quality you can rely on",
  },
  {
    icon: Users,
    title: "Expert Interviewers",
    text: "Industry professionals",
  },
  {
    icon: LockKeyhole,
    title: "Secure & Confidential",
    text: "Your data is protected",
  },
  {
    icon: Globe2,
    title: "Global Platform",
    text: "Opportunities worldwide",
  },
];

export default function Hero() {
  return (
    <>
      <section className="hero-new">
        <div className="hero-bg-grid" />
        <div className="hero-contour contour-a" />
        <div className="hero-contour contour-b" />

        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              PROFESSIONAL SURVEYORS PLATFORM
            </div>

            <h1>
              Find Verified
              <br />
              Surveyors.
              <br />
              <span>Hire with</span>
              <br />
              <span>Confidence.</span>
            </h1>

            <p>
              The leading platform for professional surveyors,
              <br className="desktop-only" />
              CV evaluation and technical interviews.
            </p>

            <div className="hero-buttons">
              <a href="#surveyors" className="hero-primary">
                Register as Surveyor
                <ArrowRight size={18} />
              </a>

              <a href="#companies" className="hero-secondary">
                Register as Company
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="hero-equipment">
            <div className="equipment-globe" />

            <Image
              src="/images/surveying-equipment-hero.png"
              alt="Professional surveying equipment"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 58vw"
              className="equipment-image"
            />
          </div>
        </div>
      </section>

      <section className="hero-trust">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <div className="trust-item" key={item.title}>
              <div className="trust-icon">
                <Icon size={24} />
              </div>

              <div>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
