import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Booking.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const car = location.state?.car;

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  if (!car) {
    navigate("/cars");
    return null;
  }

  const totalDays =
    pickupDate && returnDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(returnDate) - new Date(pickupDate)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const totalPrice = totalDays * car.pricePerDay;

  const handlePayment = () => {
    navigate("/payment", {
      state: {
        car,
        pickupDate,
        returnDate,
        totalPrice,
      },
    });
  };

  return (
    <section className="booking-page">

      <div className="booking-container">

        <div className="booking-car">

          <img src={car.image} alt={car.model} />

          <h1>
            {car.brand} {car.model}
          </h1>

          <p>{car.fuel}</p>

          <p>{car.transmission}</p>

          <p>{car.seats} Seats</p>

          <p>{car.location}</p>

          <h2>₹{car.pricePerDay}/Day</h2>

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

          <div className="booking-summary">

            <h2>Booking Summary</h2>

            <p>Days : {totalDays}</p>

            <p>Price/Day : ₹{car.pricePerDay}</p>

            <h2>Total : ₹{totalPrice}</h2>

          </div>

          <button
            className="pay-btn"
            onClick={handlePayment}
          >
            Proceed To Payment
          </button>

        </div>

      </div>

    </section>
  );
}

export default Booking;