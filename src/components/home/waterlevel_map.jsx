import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import { Icon, divIcon, point } from "leaflet";
import Widget from "../home/waterlevel_widget"; 

export default function WaterlevelMap({setLocations, location}) {

  setLocations(dummyMarkers[0])
  console.log('waterlevel map', dummyMarkers[0])

  const handleMarkerClick = (marker) => {
    setLocations(marker);
    console.log(marker);
  }
    return (
      <>
          {dummyMarkers.map((dummyMarker, index) => (
            <Marker
              key={`dummy-${index}`}
              position={dummyMarker.position}
              icon={blueCircleIcon}
              eventHandlers={{ click: () => handleMarkerClick(dummyMarker) }}
            >
              <Popup>{dummyMarker.name}</Popup>
            </Marker>
          ))}
      </>
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