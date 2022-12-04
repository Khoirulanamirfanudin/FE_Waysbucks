/* eslint-disable jsx-a11y/alt-text */
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
import '../CSS/Index.css'
// import Login from './Auth/Login';
// import Register from './Auth/Register';
import '../CSS/Login.css'
// import logo from '../img/logo.png';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef, useContext } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Profil from '../img/Profile.png'
import LogOut from '../img/Logout.png'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import { UserContext } from "../context/userContext"
import { API } from '../config/api';
import { useQuery } from 'react-query';


export default function ModalAuth({shows,setShows}) {
  const [muncul, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick = (event) => {
    setShow(!muncul);
    setTarget(event.target);
    
  };
  
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  let { data: cart} = useQuery("cartsCache", async () => {
    const response = await API.get("/carts-id");
    return response.data.data;
  });

  return (
    <div show={shows} setShow={setShows}>
    <div className='d-flex'>
      <div className='d-flex align-items-center'>
        <Link to={"/cart"}>
          <img src = {require ('../img/cart.png')} className="" width="30" height="30" />
          <Badge bg="danger">{cart?.length}</Badge>
        </Link>
      </div>
    

      <div ref={ref}>

      <Button className='bg-white border border-0' onClick={handleClick}><img src = {require ('../img/Ellipse 1.png')} className="userImg" width="50" height="50" /></Button>
      <Overlay
        show={muncul}
        target={target}
        placement="bottom-end"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained" className='popover' >
          <Popover.Body>
          <button className='border border-0 bg-white' > 
            <Link to="/profile">
              <img src={Profil} alt=''></img>               
            </Link>
          </button> 
          
          </Popover.Body>
          <hr></hr>
          <Popover.Body>
          <button className='border border-0 bg-white' onClick={logout}  > 
            <img src={LogOut} alt=''></img>  
          </button>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
    </div>
    </div>
  )
}