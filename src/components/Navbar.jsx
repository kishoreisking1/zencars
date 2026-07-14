import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";


function Navbar() {

const [menuOpen,setMenuOpen] = useState(false);

const [darkMode,setDarkMode] = useState(false);


const {user,logout} = useContext(AuthContext);



useEffect(()=>{

document.body.classList.toggle(
"dark",
darkMode
);

},[darkMode]);



return (

<nav className="navbar">


<div className="logo">
Zencars
</div>



<div className={`nav-links ${menuOpen ? "active":""}`}>


<Link to="/">
Home
</Link>


<Link to="/cars">
Cars
</Link>


<Link to="/about">
About
</Link>


<Link to="/contact">
Contact
</Link>



{
user &&

<Link to="/dashboard">
Dashboard
</Link>

}




{
user?.role === "admin" && (
  <Link to="/admin">
    Admin
  </Link>
)}


{
!user ?

<Link to="/login">
Login
</Link>

:

<button onClick={logout}>
Logout
</button>

}


</div>



<div className="menu-actions">


<button
onClick={()=>setDarkMode(!darkMode)}
>
{darkMode ? "☀️":"🌙"}
</button>



<div
className="menu-btn"
onClick={()=>setMenuOpen(!menuOpen)}
>

{
menuOpen ?
<FaTimes/> :
<FaBars/>
}

</div>


</div>


</nav>

);


}


export default Navbar;