import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const email = localStorage.getItem("email");

  if (email !== "kishore@gmail.com") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;