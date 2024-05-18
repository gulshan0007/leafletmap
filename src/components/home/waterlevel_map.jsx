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
  { position: [19.1, 72.9], name: "Dummy Marker 1" },
  { position: [19.11, 72.92], name: "Dummy Marker 2" },
  { position: [19.12, 72.94], name: "Dummy Marker 3" },
  { position: [19.13, 72.96], name: "Dummy Marker 4" }
];
