import React, { Component } from "react";

const Post_form = () => (
  <div className="form-post">
  <input type="text" placeholder="Cual es tu estado?" className="form-item--input" />
  <button className="form-item-btn--update">Actualizar</button>
  <button className="form-item-btn-nuevo">Nuevo post</button>
  </div>
);

export { Post_form };
