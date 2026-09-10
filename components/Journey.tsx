import {
  UserPlus,
  UploadCloud,
  MonitorCheck,
  BarChart3,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Profile",
    text: "Build your professional profile",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Upload CV",
    text: "Upload your CV and certificates",
    icon: UploadCloud,
  },
  {
    number: "03",
    title: "Technical Interview",
    text: "Interview with our experts",
    icon: MonitorCheck,
  },
  {
    number: "04",
    title: "Get Your Score",
    text: "Receive your professional evaluation",
    icon: BarChart3,
  },
  {
    number: "05",
    title: "Verified Profile",
    text: "Get your verified surveyor profile",
    icon: BadgeCheck,
  },
];

export default function Journey() {
  return (
    <section id="surveyors" className="journey-final">
      <div className="journey-heading">
        <div className="journey-eyebrow">THE PROCESS</div>

        <h2>Your Journey To Success</h2>

        <p>
          Simple steps to build a trusted and verified professional profile.
        </p>
      </div>

      <div className="journey-steps">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <article className="journey-step" key={step.number}>
              <div className="journey-number">
                {step.number}
              </div>

              <div className="journey-icon">
                <Icon size={25} />
              </div>

              <h3>{step.title}</h3>

              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
