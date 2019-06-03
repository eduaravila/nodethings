import React, { useState } from "react";
import { Form, Button, Image, Col } from "react-bootstrap";
import "@babel/polyfill"
import axios from "axios";

const enviarPost = async (titulo, contenido) => {
  console.log("click");

  try {
    await axios.post("http://localhost:3000/graphql/", {
      query: `
      nuevoPost(titulo:${titulo},contenido:${contenido})
      `
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

const NuevoPostForm = () => {
  const [imagen, setImagen] = useState("");
  const [titulo, setTitulo] = useState(null);
  const [contenido, setContenido] = useState("");

  return (
    <div>
      <Form>
        <Form.Group controlId="formControlTitle">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Agrega un titulo"
            value={!!titulo ? titulo : ""}
            onChange={e => setTitulo(e.target.value)}
          />
          <Form.Text className="text-muted">Agrega un titulo chido</Form.Text>
        </Form.Group>

        <Form.Group controlId="formControlImage">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            onChange={e => {
              console.log(e.target.files);
              if (e.target.files.length <= 0) {
                setImagen(null);
                return;
              }
              let reader = new FileReader();
              reader.onload = i => {
                setImagen(i.target.result);
              };
              reader.readAsDataURL(e.target.files[0]);
            }}
            placeholder="Selecciona una imagen"
          />
          {!!imagen && (
            <Col xs={6} md={4}>
              <Image src={imagen} thumbnail />
            </Col>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            value={!!contenido ? contenido : ""}
            onChange={e => setContenido(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          className="btn-block"
          onClick={() => enviarPost()}
        >
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default NuevoPostForm;
