import { useLocation, useNavigate } from "react-router-dom";

function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const car = state?.car;
  const booking = state?.booking;
  const totalPrice = state?.totalPrice;

  if (!car || !booking) {
    return (
      <section className="success-page">
        <div className="success-card">
          <h2>No Booking Found</h2>

          <button onClick={() => navigate("/cars")}>
            Browse Cars
          </button>
        </div>
      </section>
    );
  }

  const bookingId =
    "ZC" +
    Math.floor(
      100000 + Math.random() * 900000
    );

  return (
    <section className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>
          Booking Confirmed!
        </h1>

        <p>
          Thank you for choosing
          <strong> Zencars</strong>
        </p>

        <div className="success-details">

          <h3>Booking Details</h3>

          <p>
            <strong>Booking ID:</strong>
            {bookingId}
          </p>

          <p>
            <strong>Customer:</strong>
            {booking.name}
          </p>

          <p>
            <strong>Email:</strong>
            {booking.email}
          </p>

          <p>
            <strong>Phone:</strong>
            {booking.phone}
          </p>

          <hr />

          <p>
            <strong>Car:</strong>
            {car.brand} {car.model}
          </p>

          <p>
            <strong>Pickup:</strong>
            {booking.pickupLocation}
          </p>

          <p>
            <strong>Pickup Date:</strong>
            {booking.pickupDate}
          </p>

          <p>
            <strong>Return Date:</strong>
            {booking.returnDate}
          </p>

          <hr />

          <h2>
            Total Paid : ₹{totalPrice}
          </h2>

        </div>

        <div className="success-buttons">

          <button
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

        </div>

      </div>

    </section>
  );
}

export default BookingSuccess;