import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    redirecting(navigate, children);
  }, []);
};

function redirecting(navigate, children) {
  let admin = localStorage.isAdmin;
  // console.log({ admin });
  if (admin === undefined) {
    console.log("IF", { admin });
    return navigate("/");
  }
  console.log("ELSE", { admin });
  return children;
}

export default ProtectedRoute;
