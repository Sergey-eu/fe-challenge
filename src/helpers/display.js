import React from 'react';

export const DisplayFormikState = (props) =>
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '20px',
        padding: '.5rem',
      }}
    >
      <strong>values</strong> ={' '}
      {props && JSON.stringify(props, null, 2)}
      <br />
    </pre>
  </div>
