import React, { Component } from "react";
import NuevoPost from "./NuevoPost";

const Post_form = () => (
  <div className="form-post">
    <input
      type="text"
      placeholder="Cual es tu estado?"
      className="form-item--input"
    />
    <button className="form-item-btn--update">Actualizar</button>
    <NuevoPost />
  </div>
);

export { Post_form };
