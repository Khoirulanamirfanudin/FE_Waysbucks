// dependencies
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { API } from "../../config/api";
import QRCode from "react-qr-code";

// logo
import Logo from "../../img/logo.png"

export default function ModalTransaction({ showTrans, close, id }) {
  const [transaction, serTransaction] = useState([]);

  useEffect(() => {
    API.get("/transaction/" + id)
      .then((res) => {
        serTransaction(res.data.data);
      })
      .catch((err) => console.log("error", err));
  });

  return (
    <Modal show={showTrans} onHide={close} className="modal-transaction">
      <div className="profileCard">
        <div className="contentCardLeft">
          {transaction?.carts?.map((item, index) => (
            <div className="mapContent" key={index}>
              <img
                src={"http://localhost:5000/uploads/" + item.product.image}
                alt="coffee"
              />
              <ul>
                <li className="profileCardTitle">{item.title}</li>
                <li className="profileCardDate">
                  <strong>Saturday</strong>,20 Oktober 2022
                </li>
                <li className="profileCardToping">
                  <strong className="inline">
                    Toping :{" "}
                    {item.topping.map((topping, idx) => (
                      <span key={idx}>{topping.title},</span>
                    ))}
                  </strong>
                </li>
                <li className="profileCardPrice">
                  Price: {item?.subtotal}
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div
          className={
            transaction?.status === "Success"
              ? "contentCardRight Success"
              : transaction?.status === "Cancel"
              ? "contentCardRight Cancel"
              : "contentCardRight Otw"
          }
        >
          <img src={Logo} alt="logo" />
          <QRCode value="test" bgColor="transparent" size={80} />
          <span>
            <p>{transaction?.status}</p>
          </span>
          <p className="profileSubTotal">
            Sub Total : {transaction?.total}
          </p>
        </div>
      </div>
    </Modal>
  );
}
