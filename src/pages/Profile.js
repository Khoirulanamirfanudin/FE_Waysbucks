import React from "react";
import {  Container } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import QRCode from "react-qr-code";
//images
import PhotoProfile from "../assets/blank-profile.png";
import logo from "../img/group.png"
import NavbarBucks from "../components/NavbarBucks";
// import Rupiah from "rupiah-format";
import ModalProfile from "../components/ModalProfile";
import "../CSS/Index.css"



const Profile = () => {

    const [state] = useContext(UserContext);

    let { data: ProfileTransactions } = useQuery(
      "transactionsCache",
      async () => {
        const response = await API.get("/user-transaction");
        return response.data.data;
      }
    );
  
    let { data: Profile, refetch } = useQuery("profileCache", async () => {
      const response = await API.get("/user-profile");
  
      return response.data.data.profile;
    });
  
    
    return (
        <>
        <NavbarBucks/>
         <Container className="profileContainer">
        <div className="profileLeft">
          <h1>My Profile</h1>
          <ModalProfile refetch={refetch} />

          <div className="biodata">
            <img
              src={
                Profile?.image === "http://localhost:5000/uploads/"
                  ? PhotoProfile
                  : Profile?.image
              }
              alt="Profile"
            />
            <ul>
              <li className="biodataTitle">FULL NAME</li>
              <li className="biodataContent">{state.user.fullname}</li>
              <li className="biodataTitle">Email</li>
              <li className="biodataContent">{state.user.email}</li>
            </ul>
          </div>
        </div>

        <div className="profileRight">
          <h1>My Transaction</h1>
          {ProfileTransactions?.map((item, index) => (
            <div className={item?.status === "" ? "fd" : "profileCard mb-5"} key={index}>
              <div className="contentCardLeft">
                {item?.carts?.map((cart, idx) => (
                  <div className="mapContent" key={idx}>
                    <img
                      src={
                        "http://localhost:5000/uploads/" + cart?.product?.image
                      }
                      alt="coffee"
                    />
                    <ul>
                      <li className="profileCardTitle">
                        {cart?.product?.title}
                      </li>
                      <li className="profileCardDate">
                        <strong>Saturday</strong>,20 Oktober 2022
                      </li>
                      <li className="profileCardToping">
                        <strong className="inline">
                          Toping :{" "}
                          {cart.topping.map((topping, idx) => (
                            <span key={idx}>{topping?.title},</span>
                          ))}
                        </strong>
                      </li>
                      <li className="profileCardPrice">
                        Price: {cart?.product?.price}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <div
                className={
                  item?.status === "Success"
                    ? "contentCardRight Success"
                    : item?.status === "Cancel"
                    ? "contentCardRight Cancel"
                    : item?.status === "pending"
                    ? "contentCardRight Pending"
                    : "contentCardRight Otw"
                }
              >
                <img src={logo} alt="logo" />

                <QRCode value="git re" bgColor="transparent" size={80} />
                <span>
                  <p>{item?.status}</p>
                </span>
                <p className="profileSubTotal">
                  Sub Total : {item?.total}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
        </>
    )
}

export default Profile