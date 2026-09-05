import {
  UserPlus,
  UploadCloud,
  MonitorCheck,
  BarChart3,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

const steps: [string, string, LucideIcon][] = [
  ["Create Profile", "Build your professional profile", UserPlus],
  ["Upload CV", "Upload your CV and certificates", UploadCloud],
  ["Technical Interview", "Interview with our experts", MonitorCheck],
  ["Get Your Score", "Receive your evaluation", BarChart3],
  ["Verified Profile", "Get your verified surveyor profile", BadgeCheck],
];

export default function Journey() {
  return (
    <section className="journey section-card">
      <div className="section-title">YOUR JOURNEY TO SUCCESS</div>

      <div className="steps">
        {steps.map(([title, text, Icon], i) => (
          <div className="step" key={title}>
            <div className="step-icon">
              <Icon />
            </div>

            <b>
              <span>{i + 1}</span> {title}
            </b>

            <small>{text}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
