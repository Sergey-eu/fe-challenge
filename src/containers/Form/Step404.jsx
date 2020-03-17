import React from "react";
import { Link } from "react-router-dom";

const Step404 = () => {
  return (
    <div className='mui--text-center mui-page-title'>
      <h1>This step was not found</h1>
      <p>You can start from the <Link to="/form/step1">first step</Link> or return to the <Link to="/">homepage</Link></p>
    </div>
  );
}

export default Step404;
