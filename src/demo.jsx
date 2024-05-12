import React, { useState } from 'react';
import Base from './base'; // Assuming Base contains the map component
import Iii from './iii'; // Assuming Iii contains the widget component

function Demo() {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ width: '60%', height: '100%', overflow: 'hidden' }}>
        <Base setSelectedOption = {setSelectedOption} />
      </div>
      <div style={{ width: '40%', height: '100%', overflow: 'hidden' }}>
        <Iii selectedOption={selectedOption}/>
      </div>
    </div>
  );
}

export default Demo;
