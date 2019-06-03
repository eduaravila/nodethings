import React, { Component } from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faSpinner);

//
import { Nav } from "./components/nav";
import { Post_form } from "./components/post_form";
import { Posts } from "./components/posts";
import "./assets/css/main.scss";
import "./assets/css/bootstrap.min.css";
import NuevoPost from "./components/NuevoPost";
const App = () => (
  <div>
    <Nav />
    <Post_form />
    <Posts posts={[]} />
  </div>
);

ReactDOM.render(<App />, document.querySelector(".root"));
