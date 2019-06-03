import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import NuevoPostForm from "./NuevoPostForm";
const NuevoPost = () => {
  const [mostrar, toggleMostrar] = useState(false);

  return (
    <>
      <Button
        className="form-item--btn-nuevo"
        onClick={() => toggleMostrar(true)}
      >
      Agregar post
      </Button>

      <Modal show={mostrar} onHide={() => toggleMostrar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NuevoPostForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NuevoPost;
