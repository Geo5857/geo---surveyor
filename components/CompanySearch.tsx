import {
  Search,
  ShieldCheck,
  BarChart3,
  Phone,
  Bookmark,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function CompanySearch() {
  return (
    <section id="companies" className="company-section">
      <div className="company-intro">
        <div className="eyebrow">FOR COMPANIES</div>

        <h2>
          Find The Right
          <br />
          <span>Surveyor.</span>
        </h2>

        <p>
          Search, compare and connect with verified surveyors
          for your projects.
        </p>

        <button className="gold-button">
          <Search size={16} />
          Find Surveyors
        </button>
      </div>

      <div className="company-features">
        <div>
          <Search />
          <b>Advanced Search</b>
          <small>Find the best match</small>
        </div>

        <div>
          <ShieldCheck />
          <b>Verified Profiles</b>
          <small>Pre-screened & evaluated</small>
        </div>

        <div>
          <BarChart3 />
          <b>Detailed Scores</b>
          <small>Compare with confidence</small>
        </div>

        <div>
          <Phone />
          <b>Direct Contact</b>
          <small>Connect with professionals</small>
        </div>
      </div>

      <div className="search-panel">
        <div className="filters">
          <select defaultValue="Land Surveyor">
            <option>Land Surveyor</option>
            <option>Survey Engineer</option>
            <option>GIS Specialist</option>
            <option>3D Scanning</option>
          </select>

          <select defaultValue="5+ Years">
            <option>5+ Years</option>
            <option>10+ Years</option>
            <option>15+ Years</option>
          </select>

          <select defaultValue="Any Location">
            <option>Any Location</option>
            <option>UAE</option>
            <option>Saudi Arabia</option>
            <option>Qatar</option>
            <option>Oman</option>
          </select>

          <select defaultValue="GNSS, Civil 3D">
            <option>GNSS, Civil 3D</option>
            <option>Total Station</option>
            <option>3D LiDAR</option>
            <option>AutoCAD</option>
          </select>

          <button className="gold-button">
            <Search size={15} />
            Search
          </button>
        </div>

        <div className="profile-row">
          <div className="avatar">AM</div>

          <div className="profile-info">
            <h3>
              Professional Surveyor
              <CheckCircle2 size={15} />
            </h3>

            <p>
              <MapPin size={13} />
              UAE · 7 Years Experience
            </p>

            <div className="chips">
              <i>Total Station</i>
              <i>GNSS</i>
              <i>Civil 3D</i>
              <i>AutoCAD</i>
              <i>3D LiDAR</i>
            </div>
          </div>

          <div className="score">
            <strong>86</strong>
            <small>/100</small>
          </div>

          <button className="outline-button">
            View Profile
          </button>

          <Bookmark size={19} />
        </div>
      </div>
    </section>
  );
}
