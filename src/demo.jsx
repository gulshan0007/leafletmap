import React, { useState } from 'react';
import Base from './base'; // Assuming Base contains the map component
import Base2 from './base2';
import Map from './components/crowdsrouce/map';
import Widget from './components/widget/Widget'; // Import the Widget component
import Widget2 from './components/widget/Widget2'; // Import the Widget component
import Header from './components/Header';
// Import the Widget component

function Demo() {
  const [selectedTab, setSelectedTab] = useState('Base');
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState(null);

  // Function to handle marker click
  const handleMarkerClick = (marker) => {
    setSelectedOption(marker);
  };

  return (
    <>
    <Header/>
    <div className='flex flex-col h-screen w-screen absolute top-20 right-0'>
      
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
              <button
                role="tab"
                aria-selected={selectedTab === 'Base2'}
                aria-controls="panel-1"
                id="tab-1"
                tabIndex={selectedTab === 'Base2' ? 0 : -1}
                className={`relative block h-10 px-6 tab rounded-full ${selectedTab === 'Base2' ? 'bg-gray-200 text-black-900 font-bold text-lg' : 'bg-gray-100 hover:bg-gray-200 text-white-700'}`}
                onClick={() => setSelectedTab('Base2')}
              >
                <span className="text-gray-800">Base2</span>
              </button>
              
            </div>
          </div>
          
          {selectedTab === 'Base' && <Base setSelectedOption={setSelectedOption} />} {/* Pass setSelectedOption as prop */}
          {selectedTab === 'Base2' && <Base2 setSelectedOption={setSelectedOption1} />} {/* Pass setSelectedOption as prop */}
          {selectedTab === 'Map' && <Map />}
        </div>
      </div>
      {selectedOption && selectedTab === 'Base' && (
        <div className="absolute top-10 left-10 z-50">
          <Widget selectedOption={selectedOption} /> {/* Render Widget component */}
        </div>
      )}
      {selectedOption && selectedTab === 'Base2' && (
        <div className="absolute top-10 left-10 z-50">
          <Widget2 selectedOption1={selectedOption1} /> {/* Render Widget component */}
        </div>
      )}
    </div>
    </>
  );
}

export default Demo;

