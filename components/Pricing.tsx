const plans = [
  ["CV Review", "49", ""],
  ["Technical Interview", "99", ""],
  ["CV + Interview", "149", ""],
  ["Verified Surveyor", "199", "BEST VALUE"]
];

export default function Pricing() {
  return (
    <section id="pricing" className="pricing section-card">
      <div className="section-title">OUR SERVICES</div>
      <div className="price-grid">
        {plans.map(([name, price, badge], i) => (
          <article className={`price-card ${i === 3 ? "featured" : ""}`} key={name}>
            {badge && <div className="best">{badge}</div>}
            <div className="price-icon">✦</div>
            <h3>{name}</h3>
            <div className="price">{price}<small> AED</small></div>
            <button>Get Started →</button>
          </article>
        ))}
      </div>
      <p className="vat">All prices are in AED and inclusive of VAT.</p>
    </section>
  );
}