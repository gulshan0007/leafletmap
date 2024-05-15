import React, { useState } from 'react';
import Base from './base'; // Assuming Base contains the map component
import Map from './components/crowdsrouce/map';
import Widget from './components/widget/Widget'; // Import the Widget component

function Demo() {
  const [selectedTab, setSelectedTab] = useState('Base');
  const [selectedOption, setselectedOption] = useState(null); // State to hold selected marker data

  // Function to handle marker click
  const handleMarkerClick = (marker) => {
    setselectedOption(marker);
    setSelectedTab('Base'); // Switch tab to Map when marker is clicked
  };

  const setSelectedOption = (option) => {
    console.log(option); // Just for testing
  };

  return (
    <div className='flex flex-col h-screen w-screen absolute top-0'>
      <header className='bg-white h-16 flex items-center justify-center shadow-2xl border-b-2 border-black'>
        <h1 className="text-center font-bold text-2xl">Mumbai Flood Warning System</h1>
      </header>
      <div className=' flex w-full h-full'>
        <div className='w-full pl-2 pr-2 shadow-2xl border-b-2 border-black'>
          <div 
            role="tablist"
            aria-label="tabs"
            className="max-w-3xl mx-auto px-8 sm:px-0 sm:w-7/12 sm:mx-auto"
          >
            <div className="relative w-max mx-auto h-12 grid grid-cols-3 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-2xl shadow-900/20 transition">
              <div className="absolute indicator h-11 my-auto top-0 bottom-0 left-0 rounded-full bg-white shadow-md"></div>
              <button
                role="tab"
                aria-selected={selectedTab === 'Base'}
                aria-controls="panel-1"
                id="tab-1"
                tabIndex={selectedTab === 'Base' ? 0 : -1}
                className={`relative block h-10 px-6 tab rounded-full ${selectedTab === 'Base' ? 'bg-gray-200 text-black-900 font-bold text-lg' : 'bg-gray-100 hover:bg-gray-200 text-white-700'}`}
                onClick={() => setSelectedTab('Base')}
              >
                <span className="text-gray-800">Base</span>
              </button>
              <button
                role="tab"
                aria-selected={selectedTab === 'Map'}
                aria-controls="panel-2"
                id="tab-2"
                tabIndex={selectedTab === 'Map' ? 0 : -1}
                className={`relative block h-10 px-6 tab rounded-full ${selectedTab === 'Map' ? 'bg-gray-200 text-gray-900 font-bold text-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                onClick={() => setSelectedTab('Map')}
              >
                <span className="text-gray-800">Map</span>
              </button>
              
            </div>
          </div>
          
          {selectedTab === 'Base' && <Base handleMarkerClick={handleMarkerClick} setSelectedOption={setSelectedOption} />} {/* Pass setSelectedOption as prop */}
          {selectedTab === 'Map' && <Map />}
        </div>
        {selectedOption && selectedTab === 'Base' && (
          <div className="absolute top-0 left-0 w-full h-full">
            <Widget selectedOption={selectedOption} /> {/* Render Widget component */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Demo;
