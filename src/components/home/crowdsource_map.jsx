import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function CrowdSourceMap() {
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
        <Marker key={`${marker.latitude}-${marker.longitude}`} position={[marker.latitude, marker.longitude]}>
          <Popup>
            <div>
              <h3>Location Information</h3>
              <p>Water Level: {marker.waterlevel}</p>
            </div>
          </Popup>
          <CircleMarker 
            center={[marker.latitude, marker.longitude]} 
            radius={marker.waterlevel / 2} 
            color="blue"
          />
        </Marker>
      ));
      setMarkers(leafletMarkers);
    }
  }, [mapData]);

  if (!mapData) {
    return <p>Loading map data...</p>;
  }

  return (
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
  );
}

export default CrowdSourceMap;
