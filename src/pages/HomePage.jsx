import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
 
  render() {
    return (
      <>
        <h1>FE challenge:</h1>
        <h3>Fill the form. </h3>
        <Link to="/form/step1">Start</Link>
      </>
      );
  }
}

export default Home;
