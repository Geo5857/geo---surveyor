import { ShieldCheck, UserRound, Headset } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-trust">
        <div><ShieldCheck/><b>Data Protection</b><small>Your data is safe</small></div>
        <div><UserRound/><b>Expert Interviewers</b><small>Industry professionals</small></div>
        <div><Headset/><b>24/7 Support</b><small>We are here to help</small></div>
      </div>
      <div className="footer-bottom">
        <div className="brand-name">GEO <span>SURVEYORS</span></div>
        <div className="footer-links"><a>For Surveyors</a><a>For Companies</a><a>Pricing</a><a>About Us</a><a>Resources</a><a>Contact</a></div>
        <div className="socials">in · f · ◎ · ▶</div>
      </div>
    </footer>
  );
}