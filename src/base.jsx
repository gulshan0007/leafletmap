import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Icon, divIcon, point } from "leaflet";
import Widget from "./components/widget/Widget";
import { useState } from "react";
// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};



// markers
const markers = [
  {
    geocode: [19.127002161752944, 72.91708886677513],
    popUp: "IIT Bombay, Powai"
  },
  {
    geocode: [19.114554014236226, 72.91421353880206],
    popUp: "Hello, I am pop up 2"
  },
  {
    geocode: [19.12262311578772, 72.91258275577255],
    popUp: "Hello, I am pop up 3"
  },
  {
    geocode: [19.12416667, 72.84694444],
    popUp: "Andheri"
  },
  {
    geocode: [19.1241686680025, 72.8468554438595],
    popUp: "Andheri Subway Pole (Alternate location)"
  },
  {
    geocode: [19.0312705103025, 72.8583731792308],
    popUp: "Gandhi Market below the King Circle bridge"
  },
  {
    geocode: [19.0087064916103, 72.8418217416758],
    popUp: "Hindmata (Pole 1)"
  },
  {
    geocode: [19.0752922134756, 72.8406777629685],
    popUp: "Khar Subway"
  },
  {
    geocode: [19.07525531357, 72.8404424629824],
    popUp: "Khar subway (alternate location pole)"
  },
  {
    geocode: [19.07351795939, 72.849742912322],
    popUp: "Mumbai university"
  },
  {
    geocode: [18.9737762859627, 72.8229094208657],
    popUp: "Nair Hospital(Outside HDFC bank)"
  },
  {
    geocode: [18.974017695317, 72.8229958095177],
    popUp: "Nair hospital (alternate location street pole)"
  },
  {
    geocode: [18.962058249403, 72.8133152934623],
    popUp: "Nana chowk (Shri Krishna Hotel)"
  },
  {
    geocode: [19.0608777390773, 72.8941269148299],
    popUp: "16th Postal colony road"
  },
  {
    geocode: [19.1303891889621, 72.8958163864595],
    popUp: "BMC’s 8 MLD plant behind L&T, Filterpada"
  },
  {
    geocode: [19.11227, 72.84067],
    popUp: "Andheri"
  },
  {
    geocode: [18.9461, 72.82481],
    popUp: "B ward"
  },
  {
    geocode: [19.05039, 72.83748],
    popUp: "Bandra"
  },
  {
    geocode: [18.97242, 72.832],
    popUp: "Byculla"
  },
  {
    geocode: [18.9614, 72.83339],
    popUp: "C ward"
  },
  {
    geocode: [19.05456, 72.89361],
    popUp: "Chembur"
  },
  {
    geocode: [19.1784, 72.8368],
    popUp: "Chincholi"
  },
  {
    geocode: [18.91547, 72.82608],
    popUp: "Colaba"
  },
  {
    geocode: [18.96262, 72.81316],
    popUp: "D Ward"
  },
  {
    geocode: [19.24758, 72.86253],
    popUp: "Dahisar"
  },
  {
    geocode: [19.17503, 72.86099],
    popUp: "Dindoshi"
  },
  {
    geocode: [19.02942, 72.85461],
    popUp: "F North"
  },
  {
    geocode: [19.00593, 72.83973],
    popUp: "F South"
  },
  {
    geocode: [19.00832, 72.83038],
    popUp: "G South"
  },
  {
    geocode: [19.17205, 72.96637],
    popUp: "Gowanpada"
  },
  {
    geocode: [19.05639, 72.8354],
    popUp: "H West ward"
  },
  {
    geocode: [19.12036, 72.85237],
    popUp: "K East ward"
  },
  {
    geocode: [19.11694, 72.84639],
    popUp: "K West ward"
  },
  {
    geocode: [19.20361, 72.85056],
    popUp: "Kandivali"
  },
  {
    geocode: [19.08449, 72.88607],
    popUp: "Kurla"
  },
  {
    geocode: [19.07065, 72.8792],
    popUp: "L ward"
  },
  {
    geocode: [19.05497, 72.89578],
    popUp: "M West ward"
  },
  {
    geocode: [19.19625, 72.82244],
    popUp: "Malvani"
  },
  {
    geocode: [19.10945, 72.87761],
    popUp: "Marol"
  },
  {
    geocode: [18.94044, 72.83442],
    popUp: "MCGM 1"
  },
  {
    geocode: [18.95782, 72.83264],
    popUp: "Memonwada"
  },
  {
    geocode: [19.17516, 72.94255],
    popUp: "Mulund"
  },
  {
    geocode: [19.08393, 72.90644],
    popUp: "N ward"
  },
  {
    geocode: [18.9737, 72.8227],
    popUp: "Nair Hospital"
  },
  {
    geocode: [18.92307, 72.8261],
    popUp: "Nariman Fire"
  },
  {
    geocode: [19.03552, 72.86689],
    popUp: "Rawali camp"
  },
  {
    geocode: [19.13903, 72.93045],
    popUp: "S ward"
  },
  {
    geocode: [19.01231, 72.83742],
    popUp: "SWD Workshop dadar"
  },
  {
    geocode: [19.23324, 72.85449],
    popUp: "Thakare natya"
  },
  {
    geocode: [19.10094, 72.91817],
    popUp: "Vikhroli"
  },
  {
    geocode: [19.09292, 72.8441],
    popUp: "vileparle W"
  },
  {
    geocode: [19.01306, 72.82333],
    popUp: "Worli"
  }
];


export default function Base() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedOption(marker);
    console.log("Marker clicked, marker:", marker);
  };

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
        {/* Mapping through the markers */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon} eventHandlers={{ click: () => handleMarkerClick(marker) }}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* <Widget selectedOption={selectedOption} width="100%" height="100%" /> */}
    </MapContainer>
  );
}
