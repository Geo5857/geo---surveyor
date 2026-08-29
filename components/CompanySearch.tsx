import { Search, ShieldCheck, BarChart3, Phone, Bookmark } from "lucide-react";

export default function CompanySearch() {
  return (
    <section id="companies" className="company-section">
      <div className="company-intro">
        <div className="eyebrow">FOR COMPANIES</div>
        <h2>Find the right surveyor for your projects</h2>
        <p>Search, compare and connect with verified surveyors in minutes.</p>
        <button className="gold-button">⌕ Find Surveyors</button>
      </div>

      <div className="company-features">
        <div><Search/><b>Advanced Search</b><small>Find the best match</small></div>
        <div><ShieldCheck/><b>Verified Profiles</b><small>Pre-screened & evaluated</small></div>
        <div><BarChart3/><b>Detailed Scores</b><small>Compare with confidence</small></div>
        <div><Phone/><b>Direct Contact</b><small>Connect directly with surveyors</small></div>
      </div>

      <div className="search-panel">
        <div className="filters">
          <select><option>Land Surveyor</option><option>Survey Engineer</option><option>GIS Specialist</option></select>
          <select><option>5+ Years</option><option>10+ Years</option></select>
          <select><option>Any Location</option><option>UAE</option><option>Saudi Arabia</option></select>
          <select><option>GNSS, Civil 3D</option><option>3D LiDAR</option></select>
          <button className="gold-button">Search</button>
        </div>
        <div className="profile-row">
          <div className="avatar">AM</div>
          <div className="profile-info">
            <h3>Ahmed Mohamed <span>✓</span></h3>
            <p>Land Surveyor · 7 Years Experience</p>
            <div className="chips"><i>Total Station</i><i>GNSS</i><i>Civil 3D</i><i>AutoCAD</i><i>3D LiDAR</i></div>
          </div>
          <div className="score"><strong>86</strong><small>/100</small></div>
          <button className="outline-button">View Profile</button>
          <Bookmark size={19}/>
        </div>
      </div>
    </section>
  );
}