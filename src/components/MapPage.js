// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// const MapPage = () => {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation([position.coords.latitude, position.coords.longitude]);
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   return (
//     <div style={{ height: '100vh' }}>
//       {userLocation ? (
//         <MapContainer center={userLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker position={userLocation}>
//             <Popup>You are here</Popup>
//           </Marker>
//         </MapContainer>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default MapPage;
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const MapPage = () => {
  return (
    <div style={{ height: '100vh' }}>
      <LeafletMap />
    </div>
  );
};

export default MapPage;
