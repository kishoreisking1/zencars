import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Dashboard.css";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await API.delete(`/bookings/cancel/${id}`);

      alert("Booking Cancelled");

      setBookings(bookings.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
      alert("Unable to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading bookings...</h2>
      </div>
    );
  }

  return (
    <section className="dashboard">

      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Manage all your car bookings in one place.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-booking">
          <h2>No Bookings Yet</h2>
          <p>Book your first premium car today.</p>
        </div>
      ) : (
        <div className="booking-grid">

          {bookings.map((booking) => (

            <div
              key={booking._id}
              className="booking-card"
            >

              <img
                src={
                  booking.car?.image ||
                  "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                }
                alt="Car"
              />

              <div className="booking-content">

                <h2>
                  {booking.car?.brand} {booking.car?.model}
                </h2>

                <span className="status">
                  {booking.status}
                </span>

                <p>
                  <strong>Pickup:</strong>{" "}
                  {booking.pickupLocation}
                </p>

                <p>
                  <strong>Pickup Date:</strong>{" "}
                  {booking.pickupDate}
                </p>

                <p>
                  <strong>Return Date:</strong>{" "}
                  {booking.returnDate}
                </p>

                <p>
                  <strong>Total:</strong>
                  ₹{booking.totalAmount}
                </p>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    cancelBooking(booking._id)
                  }
                >
                  Cancel Booking
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}

export default Dashboard;