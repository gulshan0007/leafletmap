import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Icon, divIcon, point } from "leaflet";
import Widget from "./components/widget/Widget";
import { useEffect, useState } from "react";
import { fetchStations } from "./utils/widgetAPI";
// create custom icon

const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38] // size of the icon
});



export default function Base(props) {
  const [stations, setStations] = useState([]);
  const { setSelectedOption } = props; 

  const handleMarkerClick = (marker) => {
    setSelectedOption(marker)
    console.log("Marker clicked, marker:", marker);
  };

  useEffect(() => {
    const fetchStationsData = async () => {
        try {
            const data = await fetchStations();
            setStations(data);
        } catch (error) {
            console.error('Error fetching stations:', error);
        }
    }

    fetchStationsData();

    console.log('stations:', stations);
}, []);

  if (!stations) {
    return <div>.</div>;
  }

  else {  
  return (
    <MapContainer center={[19.125704678751553, 72.90880620559894]} zoom={13}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {stations.map((station, index) => (
          <Marker 
            key={index} 
            position={{ lat: station.latitude, lng: station.longitude }} 
            icon={customIcon} 
            eventHandlers={{ click: () => handleMarkerClick(station) }}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

    </MapContainer>
  );
  }
}


const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

