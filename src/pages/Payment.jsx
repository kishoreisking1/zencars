import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const car = state?.car;
  const booking = state?.booking;
  const totalPrice = state?.totalPrice;

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: ""
  });

  if (!car || !booking) {
    return (
      <section className="payment-page">
        <div className="payment-card">
          <h2>No Booking Found</h2>
          <button onClick={() => navigate("/cars")}>
            Browse Cars
          </button>
        </div>
      </section>
    );
  }

  const handlePayment = async () => {
    try {
      if (paymentMethod === "card") {
        if (
          !card.name ||
          !card.number ||
          !card.expiry ||
          !card.cvv
        ) {
          alert("Please fill all card details.");
          return;
        }
      }

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const response = await API.post(
        "/bookings/book",
        {
          userId: "",
          carId: car._id,
          pickupDate: booking.pickupDate,
          returnDate: booking.returnDate,
          pickupLocation: booking.pickupLocation,
          totalAmount: totalPrice
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      alert("Payment Successful!");

      navigate("/success", {
        state: {
          car,
          booking,
          totalPrice
        }
      });

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Booking Failed"
      );
    }
  };

  return (
    <section className="payment-page">

      <div className="payment-container">

        <div className="payment-left">

          <h2>Order Summary</h2>

          <img
            src={car.image}
            alt={car.model}
          />

          <h3>
            {car.brand} {car.model}
          </h3>

          <p>
            Pickup Location : {booking.pickupLocation}
          </p>

          <p>
            Pickup Date : {booking.pickupDate}
          </p>

          <p>
            Return Date : {booking.returnDate}
          </p>

          <h1>₹{totalPrice}</h1>

        </div>

        <div className="payment-right">

          <h2>Select Payment Method</h2>

          <div className="payment-methods">

            <button
              type="button"
              className={paymentMethod === "card" ? "active" : ""}
              onClick={() => setPaymentMethod("card")}
            >
              💳 Card
            </button>

            <button
              type="button"
              className={paymentMethod === "upi" ? "active" : ""}
              onClick={() => setPaymentMethod("upi")}
            >
              📱 UPI
            </button>

            <button
              type="button"
              className={paymentMethod === "netbanking" ? "active" : ""}
              onClick={() => setPaymentMethod("netbanking")}
            >
              🏦 Net Banking
            </button>

          </div>

          {paymentMethod === "card" && (
            <>
              <input
                type="text"
                placeholder="Card Holder Name"
                value={card.name}
                onChange={(e) =>
                  setCard({
                    ...card,
                    name: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Card Number"
                value={card.number}
                onChange={(e) =>
                  setCard({
                    ...card,
                    number: e.target.value
                  })
                }
              />

              <div className="card-row">

                <input
                  type="text"
                  placeholder="MM/YY"
                  value={card.expiry}
                  onChange={(e) =>
                    setCard({
                      ...card,
                      expiry: e.target.value
                    })
                  }
                />

                <input
                  type="password"
                  placeholder="CVV"
                  value={card.cvv}
                  onChange={(e) =>
                    setCard({
                      ...card,
                      cvv: e.target.value
                    })
                  }
                />

              </div>
            </>
          )}

          {paymentMethod === "upi" && (
            <input
              type="text"
              placeholder="Enter UPI ID"
            />
          )}

          {paymentMethod === "netbanking" && (
            <select>
              <option>Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>Axis Bank</option>
            </select>
          )}

          <button
            className="pay-btn"
            onClick={handlePayment}
          >
            Pay ₹{totalPrice}
          </button>

        </div>

      </div>

    </section>
  );
}

export default Payment;