import { Link } from "react-router-dom";
import "./Home.css";

import rolls from "../assets/cars/rolls.jpg";
import lambo from "../assets/cars/lambo.jpg";
import ferrari from "../assets/cars/ferrari.jpg";


function Home() {


const featuredCars = [

{
id:1,
brand:"Rolls Royce",
model:"Phantom",
image:rolls,
price:"₹45,000"
},

{
id:2,
brand:"Lamborghini",
model:"Huracán EVO",
image:lambo,
price:"₹55,000"
},

{
id:3,
brand:"Ferrari",
model:"SF90 Stradale",
image:ferrari,
price:"₹60,000"
}

];



return (

<div className="home">


{/* Hero Section */}

<section className="hero">

<div className="hero-content">

<h1>
Experience Luxury
<br/>
With Zencars
</h1>


<p>
Premium cars for premium journeys.
Rent your dream car today.
</p>


<Link to="/cars">
<button className="hero-btn">
Explore Cars
</button>
</Link>


</div>

</section>



{/* Features */}

<section className="features">


<div className="feature-card">

<h2>🚗 500+</h2>
<p>Luxury Cars</p>

</div>


<div className="feature-card">

<h2>⭐ 4.9</h2>
<p>Customer Rating</p>

</div>



<div className="feature-card">

<h2>📍100+</h2>
<p>Locations</p>

</div>



<div className="feature-card">

<h2>🛡️</h2>
<p>Fully Insured</p>

</div>


</section>





{/* Featured Cars */}


<section className="featured">


<h2>
Featured Vehicles
</h2>


<div className="car-grid">


{
featuredCars.map((car)=>(


<div className="car-card" key={car.id}>


<img
src={car.image}
alt={car.model}
/>



<div className="car-info">


<h3>
{car.brand}
</h3>


<p>
{car.model}
</p>


<div className="price">

{car.price}/Day

</div>



<Link to="/booking">

<button>
Book Now
</button>

</Link>


</div>


</div>


))
}



</div>


</section>



</div>

);

}


export default Home;