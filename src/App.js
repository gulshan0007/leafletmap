import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";

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
    popUp: "Hello, I am pop up 1"
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
    popUp: "Andheri Subway (bandh)"
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
    geocode: [19.0752922134756,72.8406777629685],
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
  }
];

export default function App() {
  return (
    <MapContainer center={[19.125704678751553, 72.90880620559894]} zoom={13}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* WATERCOLOR CUSTOM TILES */}
      {/* <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      /> */}
      {/* GOOGLE MAPS TILES */}
      {/* <TileLayer
        attribution="Google Maps"
        // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      /> */}

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}

        {/* Hard coded markers */}
        {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>This is popup 1</Popup>
        </Marker>
        <Marker position={[51.504, -0.1]} icon={customIcon}>
          <Popup>This is popup 2</Popup>
        </Marker>
        <Marker position={[51.5, -0.09]} icon={customIcon}>
          <Popup>This is popup 3</Popup>
        </Marker>
       */}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
