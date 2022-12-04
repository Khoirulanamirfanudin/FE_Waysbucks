import React from "react";
import { Modal } from "react-bootstrap";

export function Popup({show,Hide}) {
    return (
    <>
    <Modal
        show={show} onHide={Hide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <h4 className="text-success p-5 text-center">
        Thank you for ordering in us, please wait to verify you order
        </h4>

    </Modal>
        </>
    )
}

