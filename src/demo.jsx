import React, { useState } from 'react';
import Base from './base'; // Assuming Base contains the map component
import Iii from './iii'; // Assuming Iii contains the widget component
import Iii2 from './Iil2';

function Demo() {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
     <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', fontSize: '2rem', marginTop: '20px' }}>Mumbai Flood Warning System</h1>
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      
      <div style={{ width: '100%', height: '87%', overflow: 'hidden' }}>
        <Base setSelectedOption = {setSelectedOption} />
      </div>
      <div style={{  width: '40%',height: '50%'}}>
        <Iii selectedOption={selectedOption}/>
        <Iii2 selectedOption={selectedOption}/>
      </div>
      
    </div>
    </>
  );
}

export default Demo;
