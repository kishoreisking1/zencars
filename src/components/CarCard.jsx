import { useLocation } from "react-router-dom";

function Booking() {
  const { state } = useLocation();
  const car = state?.car;

  if (!car) {
    return (
      <section className="booking-page">
        <div className="booking-card">
          <h2>No car selected</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="booking-page">
      <div className="booking-card">
        <h1>Book Your Car</h1>

        <img
          src={car.image}
          alt={car.name}
          style={{
            width: "100%",
            height: "280px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "20px"
          }}
        />

        <h2>{car.name}</h2>

        <p><strong>Category:</strong> {car.category}</p>

        <p><strong>Price:</strong> {car.price}</p>

        <div className="total">
          Total: {car.price}
        </div>

        <button>
          Confirm Booking
        </button>
      </div>
    </section>
  );
}

export default Booking;
