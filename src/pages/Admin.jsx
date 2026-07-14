import { useEffect, useState } from "react";
import API from "../api/axios";

function Admin() {
  const [cars, setCars] = useState([]);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    fuel: "",
    transmission: "",
    seats: "",
    pricePerDay: "",
    location: "",
    image: ""
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addCar = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/cars/add",
        {
          ...form,
          year: Number(form.year),
          seats: Number(form.seats),
          pricePerDay: Number(form.pricePerDay)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Car Added Successfully");

      setForm({
        brand: "",
        model: "",
        year: "",
        fuel: "",
        transmission: "",
        seats: "",
        pricePerDay: "",
        location: "",
        image: ""
      });

      fetchCars();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add car");
    }
  };

  const deleteCar = async (id) => {
    if (!window.confirm("Delete this car?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Car Deleted Successfully");

      fetchCars();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete car");
    }
  };

  return (
    <section className="admin-page">

      <h1>Admin Dashboard</h1>

      <div className="admin-form">

        <input
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
        />

        <input
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />

        <input
          name="fuel"
          placeholder="Fuel"
          value={form.fuel}
          onChange={handleChange}
        />

        <input
          name="transmission"
          placeholder="Transmission"
          value={form.transmission}
          onChange={handleChange}
        />

        <input
          name="seats"
          placeholder="Seats"
          value={form.seats}
          onChange={handleChange}
        />

        <input
          name="pricePerDay"
          placeholder="Price Per Day"
          value={form.pricePerDay}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <button onClick={addCar}>
          Add Car
        </button>

      </div>

      <table className="admin-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Car</th>
            <th>Price / Day</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {cars.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Cars Available
              </td>
            </tr>
          ) : (
            cars.map((car) => (
              <tr key={car._id}>

                <td>
                  <img
                    src={car.image}
                    alt={car.model}
                    style={{
                      width: "120px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px"
                    }}
                  />
                </td>

                <td>
                  {car.brand} {car.model}
                </td>

                <td>
                  ₹{car.pricePerDay}
                </td>

                <td>
                  {car.location}
                </td>

                <td>
                  {car.available ? "Available" : "Booked"}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCar(car._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </section>
  );
}

export default Admin;