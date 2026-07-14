import { motion }
from "framer-motion";

function Hero() {
  return (
    <motion.section
      className="hero"
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      transition={{ duration:1 }}
    >

      <div className="hero-content">

        <h1>
          Rent Your Dream Car
        </h1>

        <p>
          Premium Cars At
          Affordable Prices
        </p>

      </div>

    </motion.section>
  );
}

export default Hero;