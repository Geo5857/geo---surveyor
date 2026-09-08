import {
  Building2,
  Globe2,
  LockKeyhole,
  ShieldCheck,
  UsersRound,
  ArrowRight,
  Crosshair,
  ScanLine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const stats: [string, string, LucideIcon][] = [
  ["1,250+", "Verified Surveyors", UsersRound],
  ["320+", "Companies", Building2],
  ["2,850+", "Interviews Completed", ShieldCheck],
  ["98%", "Success Rate", Globe2],
];

const trustItems = [
  [ShieldCheck, "Verified & Trusted", "Quality you can rely on"],
  [UsersRound, "Expert Interviewers", "Industry professionals"],
  [LockKeyhole, "Secure & Confidential", "Your data is protected"],
  [Globe2, "Global Platform", "Opportunities worldwide"],
] as const;

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow">
          PROFESSIONAL SURVEYORS PLATFORM
        </div>

        <div className="hero-line" />

        <h1>
          Find Verified
          <br />
          <span>Surveyors.</span>
          <br />
          Hire With Confidence.
        </h1>

        <p className="hero-description">
          The professional platform connecting verified surveyors
          with companies looking for trusted surveying expertise.
        </p>

        <div className="hero-arabic">
          ابحث عن مساحين مؤهلين وموثوقين
          <br />
          واختر المرشح المناسب بثقة.
        </div>

        <div className="cta-row">
          <a className="primary-button" href="#surveyors">
            Register as Surveyor
            <ArrowRight size={17} />
          </a>

          <a className="secondary-button" href="#companies">
            Register as Company
            <ArrowRight size={17} />
          </a>
        </div>

        <div className="trust-row">
          {trustItems.map(([Icon, title, text]) => (
            <div className="trust-item" key={title}>
              <Icon />
              <b>{title}</b>
              <small>{text}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual">
        <div className="geo-orbit orbit-one" />
        <div className="geo-orbit orbit-two" />
        <div className="geo-cross cross-one">
          <Crosshair size={30} />
        </div>
        <div className="geo-cross cross-two">
          <ScanLine size={24} />
        </div>

        <div className="contour contour-one" />
        <div className="contour contour-two" />
        <div className="contour contour-three" />

        <div className="equipment-scene">
          <div className="survey-tripod">
            <div className="instrument">
              <div className="instrument-top" />
              <div className="instrument-body">
                <span>TS</span>
              </div>
              <div className="instrument-base" />
            </div>

            <div className="tripod-leg leg-one" />
            <div className="tripod-leg leg-two" />
            <div className="tripod-leg leg-three" />
          </div>

          <div className="gnss-device">
            <div className="gnss-head">
              <span>GNSS</span>
            </div>
            <div className="gnss-pole" />
          </div>

          <div className="lidar-device">
            <ScanLine size={27} />
            <span>3D LiDAR</span>
          </div>

          <div className="survey-plan">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>

        <div className="stats-card">
          {stats.map(([number, label, Icon]) => (
            <div className="stat" key={label}>
              <Icon />
              <strong>{number}</strong>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
