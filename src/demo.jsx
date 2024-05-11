import React from 'react';
import Base from './base'; // Assuming Base contains the map component
import Iii from './iii'; // Assuming Iii contains the widget component

function Demo() {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ width: '60%', height: '100%', overflow: 'hidden' }}>
        <Base />
      </div>
      <div style={{ width: '40%', height: '100%', overflow: 'hidden' }}>
        <Iii />
      </div>
    </div>
  );
}

export default Demo;
