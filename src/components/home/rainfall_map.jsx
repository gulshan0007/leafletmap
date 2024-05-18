import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import { fetchStations } from "../../utils/widgetAPI";
import { Icon, divIcon, point } from "leaflet";
import Widget from "./rainfall_widget"; 

export default function RainFallMap(props) {
  const [stations, setStations] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

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
        {selectedOption && (
          <div className="absolute top-28 left-10 z-20">
            <Widget selectedOption={selectedOption} />
          </div>
        )}
      </div>
    );
  }
}

const customIcon = new Icon({
  iconUrl: require("../../icons/placeholder.png"),
  iconSize: [40, 40] 
});


const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};