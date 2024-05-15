import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, CircleMarker } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css';

// Import the default icon images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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
    <div style={{ height: 'calc(100vh - 64px)', width: '100%' }}>
      <MapContainer 
        center={[19.2, 72.8]} 
        zoom={12.4}
        style={{ height: '100%', width: '100%' }}
        minZoom={12.4}
        maxZoom={20}
        maxBounds={[
          [19.7, 72.4], 
          [18.85, 73.2]  
        ]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
    </div>
  );
}

export default Map;
