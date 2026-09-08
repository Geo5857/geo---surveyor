import {
  ShieldCheck,
  UserRound,
  Headset,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-trust">
        <div>
          <ShieldCheck />
          <b>Data Protection</b>
          <small>Your data is safe</small>
        </div>

        <div>
          <UserRound />
          <b>Expert Interviewers</b>
          <small>Industry professionals</small>
        </div>

        <div>
          <Headset />
          <b>Professional Support</b>
          <small>We are here to help</small>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-mark">GGS</div>

          <div>
            <div className="brand-name">
              GEO <span>SURVEYORS</span>
            </div>

            <small>
              PROFESSIONAL SURVEYORS PLATFORM
            </small>
          </div>
        </div>

        <div className="footer-links">
          <a href="#surveyors">
            For Surveyors <ArrowUpRight size={12} />
          </a>

          <a href="#companies">
            For Companies <ArrowUpRight size={12} />
          </a>

          <a href="#pricing">
            Pricing <ArrowUpRight size={12} />
          </a>

          <a href="#about">
            About Us <ArrowUpRight size={12} />
          </a>

          <a href="#resources">
            Resources <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 GEO SURVEYORS. All rights reserved.
        </span>

        <span>
          Geo Group Survey · UAE
        </span>
      </div>
    </footer>
  );
}
