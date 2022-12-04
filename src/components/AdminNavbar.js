/* eslint-disable jsx-a11y/alt-text */


import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState, useRef, useContext } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';


// files
// import PhotoProfile from "../img/blank-profile.png";
import AddProduct from "../img/+Product.png";
import AddToping from "../img/+topping.png";
import Logout from "../img/Logout.png";
import logo from "../img/logo.png"


export default function AdminNavbar(){
    const [state, dispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const [muncul, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick = (event) => {
    setShow(!muncul);
    setTarget(event.target);
    
  };

    const logout = () => {
        dispatch({
          type: "LOGOUT",
        });
        navigate("/");
      };

      return(
        <>
        <Navbar>
        <Container>
          <Navbar.Brand>
          <Link to={state.user.status === "user" ? "/" : "/transaction"}>
            <img
              alt="logo"
              src={logo}
              width="70"
              height="70"
              className="d-inline-block align-top"
            />
          </Link>
          </Navbar.Brand>

          <div ref={ref}>

            <Button className='bg-white border border-0' onClick={handleClick}><img src = {require ('../img/Ellipse 1.png')} className="userImg" width="50" height="50" /></Button>
            <Overlay
            show={muncul}
            target={target}
            placement="bottom-end"
            container={ref}
            containerPadding={20}
            >
            <Popover id="popover-contained" className='popover' style={{width:"230px"}} >
                <Popover.Body>
                <button className='border border-0 bg-white mb-3' > 
                <Link to="/addproduct">
                    <img src={AddProduct} alt=''></img>               
                </Link>
                </button> 

                <button className='border border-0 bg-white mt-3' > 
                <Link to="/addtopping">
                    <img src={AddToping} alt=''></img>               
                </Link>
                </button> 
                
                </Popover.Body>
                <hr></hr>
                <Popover.Body>
                <button className='border border-0 bg-white' onClick={logout}  > 
                <img src={Logout} alt=''></img>  
                </button>
                </Popover.Body>
            </Popover>
            </Overlay>
            </div>
      </Container>
      </Navbar>
        </>
      );
}