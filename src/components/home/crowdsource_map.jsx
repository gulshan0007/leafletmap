import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, CircleMarker } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css';

// Import the default icon images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Widget from './rainfall_widget';
import Form from './form';

// Configure the default icon
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Set the default icon to be used for all markers
L.Marker.prototype.options.icon = DefaultIcon;

function Map() {
  const [markers, setMarkers] = useState([]);
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/crowdsource/map/');
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid map data format');
        }
        setMapData(response.data); 
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (mapData) { 
      const leafletMarkers = mapData.map((marker) => (
        <Marker key={marker.latitude + marker.longitude} position={[marker.latitude, marker.longitude]}>
          <CircleMarker center={[marker.latitude, marker.longitude]} radius={marker.waterlevel / 2}>
          </CircleMarker>
        </Marker>
      ));
      setMarkers(leafletMarkers);
    }
  }, [mapData]);

  if (!mapData) {
    return <p>Loading map data...</p>;
  }

  return (
    <div className="h-full w-full relative">
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
        {markers}
      </MapContainer>
      <div className='absolute top-28 left-10 p-4bg-opacity-50 rounded-lg shadow-lg z-20'>
        <Form />
      </div>
   
    </div>
  );
}

export default Map;
