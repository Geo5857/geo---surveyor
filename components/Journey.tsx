import {
  UserPlus,
  UploadCloud,
  MonitorCheck,
  BarChart3,
  BadgeCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: [string, string, LucideIcon][] = [
  ["Create Profile", "Build your professional profile", UserPlus],
  ["Upload CV", "Upload your CV and certificates", UploadCloud],
  ["Technical Interview", "Interview with our experts", MonitorCheck],
  ["Get Your Score", "Receive your evaluation", BarChart3],
  ["Verified Profile", "Get your verified surveyor profile", BadgeCheck],
];

export default function Journey() {
  return (
    <section className="journey section-card" id="surveyors">
      <div className="section-heading">
        <span>THE PROCESS</span>
        <h2>Your Journey To Success</h2>
        <p>
          Simple steps to build a trusted and verified professional profile.
        </p>
      </div>

      <div className="steps">
        {steps.map(([title, text, Icon], i) => (
          <div className="step" key={title}>
            <div className="step-number">{i + 1}</div>

            <div className="step-icon">
              <Icon />
            </div>

            <b>{title}</b>
            <small>{text}</small>

            {i < steps.length - 1 && (
              <div className="step-connector" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
