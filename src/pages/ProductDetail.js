/* eslint-disable jsx-a11y/alt-text */
import React, { useParams } from "react-router-dom";
import {Container, Card, Button, }from 'react-bootstrap';
// import item from "../components/item";
import '../CSS/Index.css';
import { useState } from "react";
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import NavbarBucks from "../components/NavbarBucks";


 export default  function ProductDetail() {
  const [show, setShow] = useState(false);

  const handleCheck = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  // toping
  const [toping, setToping] = useState([]); //price
  const [topping_id, setIdToping] = useState([]); //id

  // check mark
  const handleChange = (e) => {
    let updateToping = [...toping];
    if (e.target.checked) {
      updateToping = [...toping, e.target.value];
    } else {
      updateToping.splice(toping.indexOf(e.target.value));
    }
    setToping(updateToping);

    let toppingId = [...topping_id];
    if (e.target.checked) {
      toppingId = [...topping_id, parseInt(e.target.id)];
    } else {
      toppingId.splice(topping_id.indexOf(e.target.id));
    }

    setIdToping(toppingId);
  };

  // fatching
  let { id } = useParams();
  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  let { data: toppings } = useQuery("toppingsCache", async () => {
    const response = await API.get("/toppings");
    return response.data.data;
  });

  // price sum
  let resultTotal = toping.reduce((a, b) => {
    return a + parseInt(b);
  }, 0);

  let subtotal = product?.price + resultTotal;
  let qty = 1;

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await API.post("/transaction", config);

      const body = JSON.stringify({
        topping_id: topping_id,
        subtotal: subtotal,
        product_id: parseInt(id),
        qty: qty,
      });

      await API.post("/cart", body, config);

      setIdToping([]);
      setToping([]);
    } catch (error) {
      console.log(error);
    }
  });

    return (
        <>
        <NavbarBucks/>
        <Container className="mt-5 ps-5 d-flex">
        <div>
            <img src = {product?.image} className="coffee" />
            
        </div>

        <div className="ms-5">
            <div>
             <h1 className="titleProduct">{product?.title}</h1>
            </div>

            <div className="priceProduct">
            Rp. {product?.price}
            </div>

            <div className="mt-3">
                <div className="T">Toping</div>
                <>
                <div className="Topping">
                {toppings?.map((item, index)=>(
                <Card className="cardtopping" key={index} >
                   
            
                <Card.Img className="topimg" src={item?.image} />
                <input
                  type="checkbox"
                  id={item?.id}
                  onChange={handleChange}
                  value={item?.price}
                  name="toping"
                />

               
                <Card.Body >
                <Card.Title className="titletopping" style={{ color: "#BD0707", }}>{item?.title}</Card.Title>
                    
                </Card.Body>
                </Card>
                ))}
                </div>
                </>
            </div>

            {/* <div>{getFormattedPrice(price)}</div> */}

            <div className="Total">
             <div>Total</div>
             <div>Rp. {product?.price + resultTotal} </div>
            </div>

            <div>
            <Button className="AddCart" variant="danger" onClick={(e) => handleSubmit.mutate(e)}>Add Cart</Button>
            </div>
               
                   
        </div>
         
        
        </Container>
        </>
        
        
        )

}



