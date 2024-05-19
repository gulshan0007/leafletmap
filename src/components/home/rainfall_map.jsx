import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import { fetchStations } from "../../utils/widgetAPI";
import { Icon, divIcon, point } from "leaflet";
import Widget from "./rainfall_widget"; 

export default function RainFallMap({location, setLocations}) {
  const [stations, setStations] = useState([]);
  

  const handleMarkerClick = (marker) => {
    setLocations(marker);
  };

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
        if (!location) {
          setLocations(data[1]);
          console.log('rainfall map', location.id)

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
      <>
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
        </>
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