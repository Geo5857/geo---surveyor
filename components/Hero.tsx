import {
  Building2,
  LockKeyhole,
  ShieldCheck,
  UsersRound,
  Globe2,
  type LucideIcon,
} from "lucide-react";

const stats: [string, string, LucideIcon][] = [
  ["1,250+", "Verified Surveyors", UsersRound],
  ["320+", "Companies", Building2],
  ["2,850+", "Interviews Completed", ShieldCheck],
  ["98%", "Success Rate", ShieldCheck],
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">PROFESSIONAL SURVEYORS PLATFORM</div>

        <h1>
          Find Verified Surveyors.
          <br />
          <span>Hire with Confidence.</span>
        </h1>

        <p>
          The leading global platform for professional surveyors, CV evaluation
          and interview.
        </p>

        <div className="cta-row">
          <button className="primary-button">
            Register as Surveyor <span>→</span>
          </button>

          <button className="secondary-button">
            Register as Company <span>→</span>
          </button>
        </div>

        <div className="trust-row">
          <div>
            <ShieldCheck />
            <b>Verified & Trusted</b>
            <small>Quality you can rely on</small>
          </div>

          <div>
            <UsersRound />
            <b>Expert Interviewers</b>
            <small>Industry professionals</small>
          </div>

          <div>
            <LockKeyhole />
            <b>Secure & Confidential</b>
            <small>Your data is protected</small>
          </div>

          <div>
            <Globe2 />
            <b>Global Platform</b>
            <small>Opportunities worldwide</small>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="equipment-card">
          <div className="equipment total-station">
            TOTAL
            <br />
            STATION
          </div>

          <div className="equipment lidar">
            3D
            <br />
            LiDAR
          </div>

          <div className="equipment gnss">GNSS</div>

          <div className="equipment drone">DRONE</div>

          <div className="plans">
            SURVEY
            <br />
            PLANS
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
