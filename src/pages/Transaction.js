
import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import ModalTransaction from "../components/modal/ModalTransaction"
import "../CSS/Index.css"

const Transaction = () => {
    const [showTrans, setShowTrans] = useState(false);
    const [idOrder, setIdOrder] = useState(null);
  
    const handleClose = () => setShowTrans(false);
    const handleShow = (id) => {
      setIdOrder(id);
      setShowTrans(true);
    };
  
    // Fetching product data from database
    let { data: transactions } = useQuery("transactionsCache", async () => {
      const response = await API.get("/transactions");
      return response.data.data;
    });
    return(
        <>
        <AdminNavbar/>
      <Container className="tableContainer">
        <h1>Income Transaction</h1>
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>Income</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => (
                <tr
                  onClick={() => handleShow(item?.id)}
                  key={index}
                  className={item.status === "" ? "dnone" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{item?.user.fullname}</td>
                  <td>{item?.user.profile?.address}</td>
                  <td>{item?.user.profile?.postal_code}</td>
                  <td className="tablePrice">{item?.total}</td>
                  <td
                    className={
                      item?.status === "Success"
                        ? "tableSuccess"
                        : item?.status === "Cancel"
                        ? "tableCancel"
                        : item?.status === "pending"
                        ? "tableWaiting"
                        : "tableOtw"
                    }
                  >
                    {item?.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <ModalTransaction
          showTrans={showTrans}
          close={handleClose}
          id={idOrder}
        />
      </Container>
        </>
    )
}

export default Transaction