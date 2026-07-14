import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Booking.css";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const [car, setCar] = useState(null);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

  useEffect(() => {
    if (location.state?.car) {
      setCar(location.state.car);
      setPickupLocation(location.state.car.location || "");
    } else {
      navigate("/cars");
    }
  }, [location, navigate]);

  if (!car) return null;

  const days =
    pickupDate && returnDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(returnDate) - new Date(pickupDate)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const totalPrice = days * car.pricePerDay;

  const handleProceed = () => {
    if (!pickupDate || !returnDate) {
      alert("Please select pickup and return dates.");
      return;
    }

    navigate("/payment", {
      state: {
        car,
        booking: {
          pickupDate,
          returnDate,
          pickupLocation,
        },
        totalPrice,
      },
    });
  };

  return (
    <section className="booking-page">
      <div className="booking-container">

        <div className="booking-car">
          <img src={car.image} alt={car.model} />

          <h2>{car.brand} {car.model}</h2>

          <p>⛽ {car.fuel}</p>
          <p>⚙ {car.transmission}</p>
          <p>👥 {car.seats} Seats</p>
          <p>📍 {car.location}</p>

          <h3>₹{car.pricePerDay}/Day</h3>
        </div>

        <div className="booking-form">

          <h1>Book Your Car</h1>

          <label>Pickup Date</label>

          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />

          <label>Return Date</label>

          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />

          <label>Pickup Location</label>

          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />

          <div className="booking-summary">

            <h2>Booking Summary</h2>

            <p>Days : {days}</p>

            <p>Price / Day : ₹{car.pricePerDay}</p>

            <h2>Total : ₹{totalPrice}</h2>

          </div>

          <button
            className="pay-btn"
            onClick={handleProceed}
          >
            Proceed To Payment
          </button>

        </div>

      </div>
    </section>
  );
}

export default Booking;