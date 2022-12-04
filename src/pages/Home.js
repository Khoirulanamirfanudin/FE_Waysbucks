import React from "react"
import jumbotronRectangle from '../img/jumbotronRectangle.png'
import jumboImg from '../img/jumboImg.jpg'
import { Stack } from "react-bootstrap";
import CardProduct from "../components/CardProduct";
import Container from 'react-bootstrap/Container';
import '../CSS/Index.css'
import NavbarBucks from "../components/NavbarBucks";
const Home = () =>{
    return(
    <>
    <NavbarBucks/>
   
    <Stack direction="horizontal" gap={3}>
      <div className="jumboContainer">
        <div className="jumboRect">
            <p className="jumboTitle">WAYSBUCKS</p>
            <p className="jumboSubTitle">Things are changing, but we're still here for you</p>
            <p className="jumboDescription">We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available<br/><br/>Let's Order...</p>
            <img src={jumbotronRectangle} alt="" />
        </div>
        <div className="jumboImg">
            <img src={jumboImg} alt="" />
        </div>
      </div>  
    </Stack>

    <div className="">
        <p className="Order">Let's order</p>
    </div>

    <Stack direction="horizontal" gap={3} className='' style={{margin: "50px auto 20px", width: "1072px", height: "392px"}}>
    <Container>
        <CardProduct/>
    </Container>
    </Stack>


    </>

    )
}

export default Home