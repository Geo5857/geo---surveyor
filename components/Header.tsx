import { ChevronDown, LogIn, Globe } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <a className="brand" href="/">
        <div className="brand-mark">GS</div>
        <div>
          <div className="brand-name">GEO <span>SURVEYORS</span></div>
          <div className="brand-tagline">PROFESSIONAL SURVEYORS PLATFORM</div>
        </div>
      </a>

      <nav className="nav">
        <a className="active" href="/">Home</a>
        <a href="#surveyors">For Surveyors</a>
        <a href="#companies">For Companies</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About Us</a>
        <a href="#resources">Resources <ChevronDown size={14}/></a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="header-actions">
        <button className="language"><Globe size={15}/> EN <ChevronDown size={14}/></button>
        <button className="login"><LogIn size={16}/> Login</button>
        <button className="gold-button">Get Started →</button>
      </div>
    </header>
  );
}