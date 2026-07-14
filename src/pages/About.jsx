import "./About.css";

function About() {
  return (
    <section className="about-page">

      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Zencars</h1>
        <p>
          Drive your dream car with comfort, affordability, and confidence.
          Zencars is your trusted partner for premium car rentals.
        </p>
      </div>

      {/* About Content */}
      <div className="about-container">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200"
            alt="Luxury Car"
          />
        </div>

        <div className="about-content">

          <h2>Who We Are</h2>

          <p>
            Zencars is a modern online car rental platform designed to provide
            customers with a smooth and secure booking experience. Whether you
            need a compact car for city travel, a luxury sedan for business,
            or an SUV for family trips, we have the perfect vehicle for you.
          </p>

          <h2>Our Mission</h2>

          <p>
            Our mission is to make premium car rentals simple, affordable,
            and available anytime. We focus on customer satisfaction,
            transparency, and quality service.
          </p>

        </div>

      </div>

      {/* Features */}

      <div className="features-section">

        <h2>Why Choose Zencars?</h2>

        <div className="features-grid">

          <div className="feature-card">
            <h3>🚗 Premium Cars</h3>
            <p>
              Wide range of luxury, economy, SUV, and sports cars.
            </p>
          </div>

          <div className="feature-card">
            <h3>💳 Secure Payments</h3>
            <p>
              Fast and secure online payment with multiple payment methods.
            </p>
          </div>

          <div className="feature-card">
            <h3>📅 Easy Booking</h3>
            <p>
              Book your car in just a few clicks with instant confirmation.
            </p>
          </div>

          <div className="feature-card">
            <h3>⭐ Trusted Service</h3>
            <p>
              Thousands of happy customers trust Zencars every day.
            </p>
          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="stats-section">

        <div className="stat-box">
          <h2>500+</h2>
          <p>Cars Available</p>
        </div>

        <div className="stat-box">
          <h2>10,000+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-box">
          <h2>50+</h2>
          <p>Cities Covered</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>Customer Support</p>
        </div>

      </div>

      {/* Call To Action */}

      <div className="about-cta">

        <h2>Ready to Drive?</h2>

        <p>
          Explore our premium collection and book your perfect ride today.
        </p>

        <a href="/cars" className="about-btn">
          Explore Cars
        </a>

      </div>

    </section>
  );
}

export default About;