function Contact() {
  return (
    <section className="contact-page">

      <div className="contact-container">

        <div className="contact-info">

          <h1>Contact Us</h1>

          <p>Email: support@zencars.com</p>

          <p>Phone: +91 9876543210</p>

          <p>Location: Chennai, India</p>

        </div>

        <form className="contact-form">

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
          />

          <button>
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;