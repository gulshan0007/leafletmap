import React, { useState } from 'react';
import Base from './base'; // Assuming Base contains the map component
import Iii from './iii'; // Assuming Iii contains the widget component
import Iii2 from './Iil2';
import Widget from './components/widget/Widget';
import Widget2 from './components/widget/Widget2';
import Map from './components/crowdsrouce/map';

function Demo() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState(null);
  return (
    <div className='flex flex-col h-screen w-screen absolute top-0'>
      <header className='bg-white h-16 flex items-center justify-center shadow-2xl border-b-2 border-black'>
        <h1 className="text-center font-bold text-2xl">Mumbai Flood Warning System</h1>
      </header>
      <div className='flex w-full h-full'>
        <div className='w-3/6 border-r-2 border-black'>
          <Base setSelectedOption={setSelectedOption} selectedOption={selectedOption} setSelectedOption1={setSelectedOption1} selectedOption1={selectedOption1}/>   
        </div>
        <div className='w-3/6 pl-4 pr-4 shadow-2xl border-b-2 border-black'>
          <Map />
        </div>
        <div className='w-2/6'>
          <Widget selectedOption={selectedOption} height={'50%'}/>
          <Widget2 selectedOption={selectedOption1} height={'50%'}/>
        </div>  
      </div>
    </div>
  );
}

export default Demo;
