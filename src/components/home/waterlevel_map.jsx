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
