  import React, { useState } from 'react';
  import Base from '../base'; // Assuming Base contains the map component
  import Base2 from '../base2';
  import Map from '../components/home/crowdsource_map';
  import Widget from '../components/home/rainfall_widget'; // Import the Widget component
  import Widget2 from '../components/widget/Widget2'; // Import the Widget component
  import Header from '../components/Header';
import RainFallMap from '../components/home/rainfall_map';
import WaterlevelMap from '../components/home/waterlevel_map';
  // Import the Widget component

  function Home() {
    const [selectedTab, setSelectedTab] = useState(1);

    return (
    <div className='h-screen w-screen'>
      <Header />
      <div className='w-full h-full relative'> 
        <div className="absolute z-20 top-10 left-1/3  w-screen/4 shadow mx-auto flex justify-center align-middle">
          <span
              className={`h-[3rem] w-[10rem] flex flex-col justify-center text-center cursor-pointer rounded-l-xl ${selectedTab === 1 ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-'}`}
              onClick={() => setSelectedTab(1)}
          >Rainfall</span>
          <span
              className={`h-[3rem] w-[10rem] flex flex-col justify-center text-center cursor-pointer ${selectedTab === 2 ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => setSelectedTab(2)}
          >Waterlevel</span>
          <span
              className={`h-[3rem] w-[10rem] flex flex-col justify-center text-center cursor-pointer rounded-r-xl ${selectedTab === 3 ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => setSelectedTab(3)} 
          >Public Data</span>
        </div>

        <div className='h-full w-full z-10'>
          {selectedTab === 1 && <RainFallMap/>}
          {selectedTab === 2 && <WaterlevelMap/>}
          {selectedTab === 3 && <Map />}
        </div>
      </div>
    </div>
    );
  }

  export default Home;

