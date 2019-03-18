import React, { Component } from "react";

const Nav = () => (
  <nav className="nav">
    <h1 className="nav-item--titulo">Post de personas</h1>
    <ul className="nav-item-list">
      <li className="list-item active">
        <a href="#">Feed</a>
      </li>
      <li className="list-item">
        <a href="#">Logout</a>
      </li>
    </ul>
  </nav>
);

export { Nav };
