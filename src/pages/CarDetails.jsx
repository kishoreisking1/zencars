import { useNavigate } from "react-router-dom";

function CarCard({ car }) {

  const navigate = useNavigate();

  return (

    <div className="car-card">

      <img
        src={car.image}
        alt={car.name}
      />

      <div className="car-info">

        <h3>{car.name}</h3>

        <p>{car.category}</p>

        <h4>{car.price}</h4>

        <button
          onClick={() => navigate("/cars")}
        >
          View Cars
        </button>

      </div>

    </div>

  );
}

export default CarCard;