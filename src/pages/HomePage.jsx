import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {
    return (
      <div className='mui--text-center'>
        <h1 className='mui-page-title mui--text-center'>FE challenge</h1>
        <Link to='/form/step1' className='mui-btn mui-btn--primary'>Go to form</Link>
      </div>
    );
  }
}

export default Home;
