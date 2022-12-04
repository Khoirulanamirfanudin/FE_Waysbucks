import React from "react";
import { Card, Stack } from "react-bootstrap";
// import '../CSS/Index.css'
import { Link, } from "react-router-dom";
import { useState} from "react";
import { API } from "../config/api";
import { useQuery } from 'react-query';
import { useContext } from "react";
import { UserContext } from "../context/userContext";



export default function CardProduct() {
  // const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [state] = useContext(UserContext); // user data
  const handleClick = () => modalLoginShow(true)
  
 


  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });
   
    return (
    <>
    
    <Stack direction="horizontal" gap={3} className='' style={{margin: "50px auto 20px", width: "1072px", height: "392px"}} >

        {/* card */}
        
        {products?.map((item, index) => (
        <Card style={{ width: '18rem', borderRadius: '13px', background: "#F7DADA", border: "none", textDecoration:"none" }} key={index} item={item} show={modalLoginShow} setShow={setModalLoginShow}>
       
        <Link to={state.isLogin === true ? `/product/${item.id}` :""} onClick={state.isLogin === false ? handleClick : ""}>
        <Card.Img variant="top" src={item.image} />
        </Link>
          <Card.Body >
            <Card.Title style={{ color: "#BD0707", fontSize: "18px", }}><b>{item.title}</b></Card.Title>
            <Card.Text style={{ fontSize: "14px" }}>
                Rp. {item.price}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}

    
    </Stack>
    </>
    );
    };

