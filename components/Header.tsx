import { ChevronDown, Globe, LogIn, ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <a className="brand" href="/">
        <div className="brand-mark">
          <span>GGS</span>
        </div>

        <div className="brand-copy">
          <div className="brand-name">
            GEO <span>SURVEYORS</span>
          </div>
          <div className="brand-tagline">
            PROFESSIONAL SURVEYORS PLATFORM
          </div>
        </div>
      </a>

      <nav className="nav">
        <a className="active" href="#home">Home</a>
        <a href="#surveyors">For Surveyors</a>
        <a href="#companies">For Companies</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About Us</a>
        <a href="#resources">Resources <ChevronDown size={13} /></a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="header-actions">
        <button className="language">
          <Globe size={15} />
          EN
          <ChevronDown size={13} />
        </button>

        <button className="login">
          <LogIn size={16} />
          Login
        </button>

        <a className="gold-button header-start" href="#pricing">
          Get Started
          <ArrowRight size={15} />
        </a>
      </div>
    </header>
  );
}
