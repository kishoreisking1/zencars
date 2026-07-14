import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Cars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookNow = (car) => {
    navigate("/booking", {
      state: { car }
    });
  };

  return (
    <section className="cars-page">
      <h1>Available Luxury Cars</h1>

      <div className="cars-grid">
        {cars.map((car) => (
          <div className="listing-card" key={car._id}>
            <img src={car.image} alt={car.model} />

            <div className="listing-content">
              <h2>
                {car.brand} {car.model}
              </h2>

              <p>
                {car.fuel} | {car.transmission}
              </p>

              <p>{car.seats} Seats</p>

              <p>📍 {car.location}</p>

              <h3>₹{car.pricePerDay}/Day</h3>

              <p>
                {car.available ? "✅ Available" : "❌ Booked"}
              </p>

              <button
                disabled={!car.available}
                onClick={() => handleBookNow(car)}
              >
                {car.available ? "Book Now" : "Not Available"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cars;