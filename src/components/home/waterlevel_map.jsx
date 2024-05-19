import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import { Icon, divIcon, point } from "leaflet";
import Widget from "../home/waterlevel_widget"; 

export default function Base2() {
  const [selectedOption, setSelectedOption] = useState(dummyMarkers[0]);


  const handleMarkerClick = (marker) => {
    setSelectedOption(marker);
  }
    return (
      <div className="h-full w-full relative z-10">
        <MapContainer
          className='h-full w-full relative z-10'
          center={[19.14, 72,2]}
          zoom={12.4}
          minZoom={12.4}
          maxZoom={21}
          maxBounds={[
            [19.4, 72.6],
            [18.85, 73.2]
          ]}
        >
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* First type of markers */}
          

          {/* Second type of markers */}
          {dummyMarkers.map((dummyMarker, index) => (
            <Marker
              key={`dummy-${index}`}
              position={dummyMarker.position}
              icon={blueCircleIcon}
              eventHandlers={{ click: () => setSelectedOption(dummyMarker) }}
            >
              <Popup>{dummyMarker.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
        {selectedOption && (
          <div className="absolute top-20 left-10 z-20">
            <Widget selectedOption={selectedOption} />
          </div>
        )}
      </div>
    );
  }


// Define a blue circle icon for the second type of markers
const blueCircleIcon = divIcon({
  className: "blue-circle-icon",
  iconSize: [12, 12],
  html: `<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%;"></div>`
});

// Define dummy markers for the second type of markers
const dummyMarkers = [
  { position: [19.12416667, 72.84694444], name: "Andheri Subway (bandh)" },
  { position: [19.12416867, 72.84685544], name: "Andheri Subway Pole (Alternate location)" },
  { position: [19.03127051, 72.85837318], name: "Gandhi Market below the King Circle bridge" },
  { position: [19.00870649, 72.84182174], name: "Hindmata (Pole 1)" },
  { position: [19.07529221, 72.84067776], name: "Khar Subway" },
  { position: [19.07525531, 72.84044246], name: "Khar subway (alternate location pole)" },
  { position: [19.07351796, 72.84974291], name: "Mumbai university" },
  { position: [18.97377629, 72.82290942], name: "Nair Hospital (Outside HDFC bank)" },
  { position: [18.9740177, 72.82299581], name: "Nair hospital (alternate location street pole)" },
  { position: [18.96205825, 72.81331529], name: "Nana chowk (Shri Krishna Hotel)" },
  { position: [19.06087774, 72.89412691], name: "16th Postal colony road" },
  { position: [19.13038919, 72.89581639], name: "BMC's 8 MLD plant behind L&T, Filterpada" }
];
