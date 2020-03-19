import React from 'react';
import { Link } from 'react-router-dom';

const Step404 = () => {
  return (
    <div className='mui--text-center'>
      <h3>This step was not found</h3>
      <br />
      <p>You can start from the <Link to='/form/step1'>first step</Link> or return to the <Link to='/'>homepage</Link></p>
    </div>
  );
}

export default Step404;
