import React, { useState } from 'react';
import Map from '../components/home/crowdsource_map'; 
import RainFallMap from '../components/home/rainfall_map';
import WaterlevelMap from '../components/home/waterlevel_map';
import { MapContainer, TileLayer } from 'react-leaflet';
import Form from '../components/home/form';
import RainfallWidget from '../components/home/rainfall_widget';
import WaterlevelWidget from '../components/home/waterlevel_widget';

  function Home() {
    const [selectedTab, setSelectedTab] = useState(1);

    const [rainfallLocations, setRainfallLocations] = useState(null);
    const [waterlevelLocations, setWaterlevelLocations] = useState(null);


    return (
    <div className='h-screen w-screen'>
      
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

        <div className='h-full w-full relative z-10'>
          <MapContainer
            className='h-full w-full relative z-10'
            center={[19.14, 72,2]}
            zoom={13}
            minZoom={11}
            maxZoom={21}
            maxBounds={[
              [19.4, 72.6],
              [18.85, 73.2]
            ]}
          >
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
              {selectedTab === 1 && <RainFallMap  setLocations={setRainfallLocations} location={rainfallLocations}/> }
              {selectedTab === 2 && <WaterlevelMap setLocations={setWaterlevelLocations} location={waterlevelLocations} />}
              {selectedTab === 3 && <Map />}
          </MapContainer> 

          {selectedTab === 1 &&
            rainfallLocations && (
              <div className="absolute top-28 left-10 z-20">
                <RainfallWidget selectedOption={rainfallLocations} />
              </div>
            )
          }

          {selectedTab === 2 &&
            waterlevelLocations && (
              <div className="absolute top-28 left-10 z-20">
                <WaterlevelWidget selectedOption={waterlevelLocations} />
              </div>
            )
          }

          {selectedTab === 3 && 
            <div className='absolute top-28 left-10 p-4bg-opacity-50 rounded-lg shadow-lg z-20'>
              <Form />
            </div>
          }
        </div>
      </div>
    </div>
    );
  }

  export default Home;

