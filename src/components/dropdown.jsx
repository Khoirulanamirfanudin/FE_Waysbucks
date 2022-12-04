// dependencies
import React, { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../config/api";

// files
import PhotoProfile from "../img/blank-profile.png";
import AddProduct from "../img/addproduct.png";
import AddToping from "../img/addtopping.png";
import Logout from "../img/Logout.png";

export default function Dropdown() {
  // logout
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const [photo, setPhoto] = useState({});

  useEffect(() => {
    API.get("/user-profile")
      .then((res) => {
        setPhoto(res.data.data.profile);
      })
      .catch((err) => console.log("error", err));
  });

  return (
    <NavDropdown
      title={
        <img
          src={
            photo?.image === "http://localhost:5000/uploads/"
              ? PhotoProfile
              : photo?.image
          }
          alt="photoProfile"
          className="navbarPhoto"
        />
      }
      className="navImg"
    >
     

      <NavDropdown.Item
        className={state.user.status === "admin" ? "mb-2 mt-2 ps-3" : "dnone"}
      >
        <Link to="/add-product" className="navbarItem">
          <img
            src={AddProduct}
            alt="AddProduct"
            className="d-flex dropdown-img"
          />
          <p className="d-flex mb-0 ps-3 dropAdmin">AddProduct</p>
        </Link>
      </NavDropdown.Item>

      <NavDropdown.Item
        className={state.user.status === "admin" ? "mb-2 mt-2 ps-3" : "dnone"}
      >
        <Link to="/add-toping" className="navbarItem">
          <img
            src={AddToping}
            alt="AddToping"
            className="d-flex dropdown-img navAddTopping"
          />
          <p className="d-flex ps-3 mb-0 dropAdmin ">AddToping</p>
        </Link>
      </NavDropdown.Item>
      <hr />
      <NavDropdown.Item onClick={logout}>
        <img src={Logout} alt="logout" className="d-flex dropdown-img" />
        <p className="d-flex mb-0 dropCust pe-4"></p>
      </NavDropdown.Item>
    </NavDropdown>
  );
}
