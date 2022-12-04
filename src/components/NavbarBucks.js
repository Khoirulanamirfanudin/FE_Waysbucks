/* eslint-disable jsx-a11y/alt-text */
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../CSS/Index.css'
import Login from './Auth/Login';
import Register from './Auth/Register';
import '../CSS/Login.css'
import logo from '../img/logo.png';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
// import { API } from '../config/api';
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ModalAuth from '../components/ModalAuth'
import { Link } from 'react-router-dom';


const NavbarBucks = ({ setShows, shows }) => {
  const [state] = useContext(UserContext);
  const isLogin = !state.isLogin;
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);
  

  return (
   
      <Navbar>
        <Container>
          <Navbar.Brand>
          <Link to={"/"}>
            <img
              alt="logo"
              src={logo}
              width="70"
              height="70"
              className="d-inline-block align-top"
            />
          </Link>
          </Navbar.Brand>
          {isLogin ? (
          <div div clasName="buttonAuth"  >
            <Button variant="outline-danger" onClick={() => setModalLoginShow(true)}>
            Login
           </Button>
           <Login show={modalLoginShow} Hide={()=> setModalLoginShow(false)} setModalLoginShow={setModalLoginShow} setModalRegisterShow={setModalRegisterShow}/>
            {"     "}
            <Button variant="danger"  onClick={() => setModalRegisterShow(true)}>
            Register
            </Button>
            <Register show={modalRegisterShow} Hide={() => setModalRegisterShow(false)} setModalLoginShow={setModalLoginShow} setModalRegisterShow={setModalRegisterShow}/>
          </div> 
           ):(
            <div className="navbarLeft">
            <ModalAuth show={shows} setShow={setShows} />
            </div>
          )}
      </Container>
      </Navbar>
    
  );
}

export default NavbarBucks ;