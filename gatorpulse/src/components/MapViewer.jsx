// import React, { useState, useCallback, useEffect } from 'react';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import Header from './Header'

// const containerStyle = {
//   width: '50vw',
//   height: '50vh'
// };

// const center = {
//   lat: 29.64833,
//   lng: -82.34944
// };

// export default function MapViewer({page, setPage}) {
//   const [markers, setMarkers] = useState([]);
//   const [selectedDate, setSelectedDate] = useState([new Date()])

//   const libraries = ['places'];

//   useEffect(() => setPage('mapview'), []);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
//     libraries,
//   });

// //   const onMapClick = useCallback((event) => {
// //     setMarkers((current) => [
// //       ...current,
// //       {
// //         lat: event.latLng.lat(),
// //         lng: event.latLng.lng(),
// //         time: new Date()
// //       }
// //     ]);
// //   }, []);

// //   if (!isLoaded) return <div>Loading Map...</div>;

//   return (
//     <div className="w-screen h-screen flex justify-center items-center bg-white">
//       <Header page={page} selectedDate={selectedDate} setSelectedDate={setSelectedDate}></Header>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={15}
//         onClick={onMapClick}
//       >
//         {markers.map((marker, idx) => (
//           <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }} />
//         ))}
//       </GoogleMap>
//     </div>
//   );
// }
// import React, { useState, useEffect, useCallback } from 'react';
// import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


// const containerStyle = {
//   width: '50vw',
//   height: '50vh',
// };

// const libraries = ['places', 'marker'];

// const center = {
//   lat: 29.64833,
//   lng: -82.34944
// };

// export default function MapViewer({ page, setPage }) {
//   const { isLoaded, loadError } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
//     libraries,
//   });

//   useEffect(() => {setPage('mapview')}, []);

//   const [markers, setMarkers] = useState([]);
//   const [map, setMap] = useState(null);
//   const [ posts, setPosts ] = useState([]);
//   const placesService = map ? new window.google.maps.places.PlacesService(map) : null;

//   const onLoad = useCallback((mapInstance) => {
//     setMap(mapInstance);
//   }, []);

//   const onUnmount = useCallback(() => {
//     setMap(null);
//   }, []);

//   const fetchPosts = async () => {
//     const response = await fetch("http://localhost:5000/getAllPostsAndProfiles", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//     const data = await response.json();
//     const postData = data.posts;
//     setPosts(Object.values(postData));
//   }
//   fetchPosts();

//   useEffect(() => {
//     if (isLoaded && placesService && posts && posts.length > 0) {
//       posts.forEach((post) => {
//         const placeId = post.location.place_id;
//         const request = {
//           placeId: placeId,
//           fields: ['geometry'],
//         };

//         placesService.getDetails(request, (place, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
//             setMarkers((prevMarkers) => [
//               ...prevMarkers,
//               {
//                 location: {
//                     lat: place.geometry.location.lat(),
//                     lng: place.geometry.location.lng(),
//                 },
//                 placeId: placeId, 
//                 title: post.title + " " + post.time,
//               },
//             ]);
//           } else {
//             console.error(`Could not retrieve details for Place ID: ${placeId}`, status);
//           }
//         });
//       });
//     }
//   }, [isLoaded, placesService, posts]);

//   if (loadError) {
//     return <div>Error loading maps.</div>;
//   }

//   if (!isLoaded) {
//     return <div>Loading Maps...</div>;
//   }

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={15}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {markers.map((marker) => (
//         <Marker key={marker.placeId} position={{ lat: marker.location.lat, lng: marker.location.lng }}/>
//       ))}
//     </GoogleMap>
//   );
// }
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import Header from './Header'

const containerStyle = {
    width: '80vw',
    height: '70vh',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    border: '1px solid #eee',
};

const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
      { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ color: '#dcdcdc' }],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#bdbdbd' }],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#eeeeee' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#e5e5e5' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#dadada' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{ color: '#e0e0e0' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{ color: '#eeeeee' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#c9c9c9' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
    ],
  };

const libraries = ['places', 'marker'];

const center = {
  lat: 29.64833,
  lng: -82.34944,
};

export default function MapViewer({ page, setPage }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries,
  });
  const [ selectedDate, setSelectedDate ] = useState([new Date()]);

  useEffect(() => {
    setPage('mapview');
  }, [setPage]);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMarkerClick = useCallback((marker) => {
    setSelectedMarker(marker);
  }, []);

  const onCloseInfoWindow = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [posts, setPosts] = useState([]);
  const placesService = map ? new window.google.maps.places.PlacesService(map) : null;
  const processedPlaceIds = useRef(new Set());

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const fetchPosts = useCallback(async () => {
    const response = await fetch("http://localhost:5000/getAllPostsAndProfiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const postData = data.posts;
    setPosts(Object.values(postData));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (isLoaded && placesService && posts && posts.length > 0) {
      posts.forEach((post) => {
        const placeId = post.location.place_id;
        if (placeId && !processedPlaceIds.current.has(placeId)) {
          processedPlaceIds.current.add(placeId);

          const request = {
            placeId: placeId,
            fields: ['geometry.location'],
          };


          placesService.getDetails(request, (place, status) => {

            if (status === window.google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
              setMarkers((prevMarkers) => [
                ...prevMarkers,
                {
                  location: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                  placeId: placeId,
                  title: `${post.title}   ${post.time}   ${post.date[0].substring(5, 10)}`,
                },
              ]);
            } else {
              console.error(`Could not retrieve details for Place ID: ${placeId}`, status);
            }
          });
        } else if (placeId) {
        //   console.log(`Skipping already processed Place ID: ${placeId}`);
        }
      });
    }
  }, [isLoaded, placesService, posts]);

  if (loadError) {
    return <div>Error loading maps.</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: '#f8f8f8' }}>
      <Header page={page} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.placeId}
            position={marker.location}
            title={marker.title}
            onClick={() => onMarkerClick(marker)}
          >
          {selectedMarker === marker && (
            <InfoWindow onCloseClick={onCloseInfoWindow}>
              <div>{marker.title}</div>
            </InfoWindow>
          )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
}