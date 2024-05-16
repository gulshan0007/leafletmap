import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import { fetchStations } from "./utils/widgetAPI";
import { Icon, divIcon, point } from "leaflet";
import Widget from "./components/widget/Widget"; // Import the Widget component

export default function Base(props) {
  const [stations, setStations] = useState([]);
  const { setSelectedOption, selectedOption } = props;

  const handleMarkerClick = (marker) => {
    setSelectedOption(marker);
  };

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
        if (!selectedOption) {
          setSelectedOption(data[0]);
        }
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStationsData();
  }, []);

  if (!stations) {
    return <div>.</div>;
  } else {
    return (
      <div className="h-full w-full relative">
        <MapContainer center={[19.125704678751553, 72.90880620559894]} zoom={13}>
          {/* OPEN STREEN MAPS TILES */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* First type of markers */}
          <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
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
        {/* Widget Component */}
        {selectedOption && (
          <div className="absolute top-10 left-10 z-50">
            <Widget selectedOption={selectedOption} />
          </div>
        )}
      </div>
    );
  }
}

// Define a custom icon for the first type of markers
const customIcon = new Icon({
  iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38] // size of the icon
});

// Define a blue circle icon for the second type of markers
const blueCircleIcon = divIcon({
  className: "blue-circle-icon",
  iconSize: [12, 12],
  html: `<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%;"></div>`
});

// Define dummy markers for the second type of markers

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};
