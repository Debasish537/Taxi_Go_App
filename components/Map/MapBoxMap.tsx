// import * as React from 'react';
// import Map, { Marker } from 'react-map-gl/mapbox';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { UserLocationContext } from '@/context/UserLocationContext';
// import { useContext } from 'react';
// import { useUser } from '@clerk/clerk-react';

// function MapBoxMap() {
//     const { userLocation, setUserLocation } = useContext(UserLocationContext)
//     useUser()
//     return (
//         <div className='mt-5 border-[2px]'>
//             <h2 className='text-[20px] font-bold'>Map</h2>
//             <div className='rounded-lg overflow-hidden'>

//                 {userLocation ? <Map
//                     mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//                     initialViewState={{
//                         longitude: userLocation?.lng,
//                         latitude: userLocation?.lat,
//                         zoom: 14
//                     }}
//                     style={{ width: '100%', height: 580, borderRadius: 10 }}
//                     mapStyle="mapbox://styles/mapbox/streets-v9">
//                     <Marker longitude={userLocation?.lng} latitude={userLocation?.lat} anchor="bottom" >
//                         <img src="https://cdn-icons-png.flaticon.com/512/14831/14831599.png" 
//                         className='w-10 h-10'/>
//                         useUser().logo
//                     </Marker>
//                 </Map> : null}
//             </div>

//         </div>

//     );
// }

// export default MapBoxMap;



//Ueful one code


// 'use client'

// import * as React from 'react'
// import Map, { Marker } from 'react-map-gl/mapbox'
// import 'mapbox-gl/dist/mapbox-gl.css'
// import { UserLocationContext } from '@/context/UserLocationContext'
// import { useContext } from 'react'
// import { useUser } from '@clerk/clerk-react'

// function MapBoxMap() {
//   const { userLocation } = useContext(UserLocationContext)
//   const { user } = useUser()

//   return (
//     <div className='mt-5 border-[2px]'>
//       <h2 className='text-[20px] font-bold mb-2'>Map</h2>
//       <div className='rounded-lg overflow-hidden'>
//         {userLocation && (
//           <Map
//             mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//             initialViewState={{
//               longitude: userLocation.lng,
//               latitude: userLocation.lat,
//               zoom: 14,
//             }}
//             style={{ width: '100%', height: 600, borderRadius: 10 }}
//             mapStyle='mapbox://styles/mapbox/streets-v9'
//           >
//             <Marker
//               longitude={userLocation.lng}
//               latitude={userLocation.lat}
//               anchor='bottom'
//             >
//               <div className='relative w-[40px] h-[55px] animate-bounce cursor-pointer'>
//                 {/* SVG red pin */}
//                 <svg
//                   width='40'
//                   height='55'
//                   viewBox='0 0 24 24'
//                   fill='red'
//                   xmlns='http://www.w3.org/2000/svg'
//                 >
//                   <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
//                   <circle cx="12" cy="9" r="2.5" fill="white" />
//                 </svg>

//                 {/* User avatar inside the red pin */}
//                 <div className='absolute top-[6px] left-[6px] w-[28px] h-[28px] rounded-full overflow-hidden border-[2px] border-white shadow'>
//                   <img
//                     src={
//                       user?.imageUrl ||
//                       'https://cdn-icons-png.flaticon.com/512/149/149071.png'
//                     }
//                     alt='User'
//                     className='w-full h-full object-cover'
//                   />
//                 </div>
//               </div>
//             </Marker>
//           </Map>
//         )}
//       </div>
//     </div>
//   )
// }

// export default MapBoxMap






// 'use client'

// import React from 'react'

// function MapBoxMap() {
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2 text-gray-700">Live Map</h2>

//       {/* Responsive Map Container */}
//       <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-300" style={{ paddingTop: '56.25%' }}>
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29990.681855943945!2d84.97574010000001!3d20.015428900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1751222462722!5m2!1sen!2sin"
//           className="absolute top-0 left-0 w-full h-full"
//           allowFullScreen
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         ></iframe>
//       </div>
//     </div>
//   )
// }

// export default MapBoxMap






// 'use client'

// import React, { useEffect, useRef, useState } from 'react'
// import mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

// function MapBoxMap() {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null)
//   const mapRef = useRef<mapboxgl.Map | null>(null)
//   const [lng, setLng] = useState(84.9757)
//   const [lat, setLat] = useState(20.0154)
//   const [zoom, setZoom] = useState(13)

//   // Initialize map on mount
//   useEffect(() => {
//     if (mapContainerRef.current && !mapRef.current) {
//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [lng, lat],
//         zoom: zoom,
//       })
//     }
//   }, [])

//   const handleLocateUser = () => {
//     if (!navigator.geolocation) {
//       alert('Geolocation is not supported by your browser.')
//       return
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords
//         alert(`📍 You are at:\nLatitude: ${latitude}, Longitude: ${longitude}`)

//         if (mapRef.current) {
//           mapRef.current.flyTo({ center: [longitude, latitude], zoom: 14 })

//           new mapboxgl.Marker({ color: 'red' })
//             .setLngLat([longitude, latitude])
//             .setPopup(new mapboxgl.Popup().setText('You are here'))
//             .addTo(mapRef.current)
//         }
//       },
//       (error) => {
//         if (error.code === error.PERMISSION_DENIED) {
//           alert('Permission denied. Please enable location in your browser.')
//         } else {
//           alert('Unable to retrieve your location.')
//         }
//       }
//     )
//   }

//   return (
//     <div className="p-5">
//       <h2 className="text-[20px] font-semibold mb-3">🗺️ MapBox with User Location</h2>

//       <div className="relative border rounded-lg overflow-hidden shadow-md">
//         <div ref={mapContainerRef} className="w-full h-[450px]" />

//         <div className="absolute top-0 left-0 w-full p-2 bg-black/60 text-white flex justify-between text-sm z-10">
//           <button
//             onClick={handleLocateUser}
//             className="hover:text-yellow-400 hover:underline transition"
//           >
//             📍 User Location View
//           </button>
//           <span className="text-xs opacity-70">Mapbox</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MapBoxMap






// 'use client'

// import React, { useEffect, useRef, useState } from 'react'
// import mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'

// // ✅ Use your public token here
// mapboxgl.accessToken =
//   'pk.eyJ1IjoiZGViYXNpc2gtNTM3IiwiYSI6ImNtY2hsMW12ZTA3aTAycXBkYWxqc3hxajYifQ.zUIY-1achWpug5ObVVevug'

// function MapBoxMap() {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null)
//   const mapRef = useRef<mapboxgl.Map | null>(null)
//   const [lng, setLng] = useState(84.9757)
//   const [lat, setLat] = useState(20.0154)
//   const [zoom, setZoom] = useState(13)

//   // 🧭 Initialize map
//   useEffect(() => {
//     if (mapContainerRef.current && !mapRef.current) {
//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: 'mapbox://styles/mapbox/streets-v11', // ✅ User-friendly style
//         center: [lng, lat],
//         zoom: zoom
//       })
//     }
//   }, [])

//   // 📍 Get user location
//   const handleLocateUser = () => {
//     if (!navigator.geolocation) {
//       alert('Geolocation is not supported by your browser.')
//       return
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords
//         alert(`📍 You are at:\nLatitude: ${latitude}, Longitude: ${longitude}`)

//         if (mapRef.current) {
//           mapRef.current.flyTo({ center: [longitude, latitude], zoom: 14 })

//           new mapboxgl.Marker({ color: 'red' })
//             .setLngLat([longitude, latitude])
//             .setPopup(new mapboxgl.Popup().setText('You are here'))
//             .addTo(mapRef.current)
//         }
//       },
//       (error) => {
//         if (error.code === error.PERMISSION_DENIED) {
//           alert('Permission denied. Please enable location in your browser.')
//         } else {
//           alert('Unable to retrieve your location.')
//         }
//       }
//     )
//   }

//   return (
//     <div className="p-5">
//       <h2 className="text-[20px] font-semibold mb-3">🗺️ MapBox with User Location</h2>

//       <div className="relative border rounded-lg overflow-hidden shadow-md">
//         {/* ✅ Increased Height */}
//         <div ref={mapContainerRef} className="w-full h-[600px]" />

//         {/* 📍 User Location Button */}
//         <div className="absolute top-0 left-0 w-full p-2 bg-black/60 text-white flex justify-between text-sm z-10">
//           <button
//             onClick={handleLocateUser}
//             className="hover:text-yellow-400 hover:underline transition"
//           >
//             📍 User Location View
//           </button>
//           <span className="text-xs opacity-70">Mapbox</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MapBoxMap



// 'use client'

// import * as React from 'react'
// import Map, { Marker } from 'react-map-gl/mapbox'
// import 'mapbox-gl/dist/mapbox-gl.css'
// import { UserLocationContext } from '@/context/UserLocationContext'
// import { useContext, useEffect, useRef } from 'react'
// import { useUser } from '@clerk/clerk-react'
// import Markers from './Markers'
// import { SourceCordiContext } from '@/context/SourceCordiContext'
// import { DestinationCordiContext } from '@/context/DestinationCordiContext'
// function MapBoxMap() {
//     const mapRef = useRef<any>('');
//     const { userLocation, setUserLocation } = useContext(UserLocationContext)
//     const { user } = useUser()
//     const { sourceCordinates, setSourceCordinates } = useContext(SourceCordiContext)
//     const { destinationCordinates, setDestinationCordinates } = useContext(DestinationCordiContext)
//     useEffect(() => {
//         if (sourceCordinates) {
//             mapRef.current?.flyTo({
//                 center: [sourceCordinates.lng,
//                 sourceCordinates.lat],
//                 duration: 2500
//             })
//         }
//     }, [sourceCordinates])


//     useEffect(() => {
//         if (destinationCordinates) {
//             mapRef.current?.flyTo({
//                 center: [destinationCordinates.lng,
//                 destinationCordinates.lat],
//                 duration: 2500
//             })
//         }
//     }, [destinationCordinates])


//     return (
//         <div className='mt-5 border-[2px]'>
//             <h2 className='text-[20px] font-bold mb-2'>Map</h2>
//             <div className='rounded-lg overflow-hidden'>
//                 {userLocation ? (
//                     <Map
//                         ref={mapRef}
//                         mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//                         initialViewState={{
//                             longitude: userLocation.lng,
//                             latitude: userLocation.lat,
//                             zoom: 14,
//                         }}
//                         style={{ width: '100%', height: 600, borderRadius: 10 }}
//                         mapStyle='mapbox://styles/mapbox/streets-v9'
//                     >
//                         {/* You can add <Marker> here if needed */}
//                         <Markers />
//                     </Map>
//                 ) : null}
//             </div>
//         </div>
//     )
// }

// export default MapBoxMap





// 'use client'

// import * as React from 'react'
// import Map, { Marker, MapRef } from 'react-map-gl/mapbox' // ✅ changed: imported MapRef for correct typing
// import 'mapbox-gl/dist/mapbox-gl.css'
// import { UserLocationContext } from '@/context/UserLocationContext'
// import { useContext, useEffect, useRef, useState } from 'react' // ✅ changed: added useState
// import { useUser } from '@clerk/clerk-react'
// import Markers from './Markers'
// import { SourceCordiContext } from '@/context/SourceCordiContext'
// import { DestinationCordiContext } from '@/context/DestinationCordiContext'
// import { DirectionDataContext } from '@/context/DirectionDataContext'
// import MapBoxRoute from './MapBoxRoute'


// const MAPBOX_DRIVING_ENDPOINTS = "https://api.mapbox.com/directions/v5/mapbox/driving/";

// const session_token=crypto.randomUUID()
// function MapBoxMap() {
//   const mapRef = useRef<MapRef | null>(null) // ✅ changed: correct ref type to MapRef
//   const { userLocation } = useContext(UserLocationContext)
//   const { user } = useUser()
//   const { sourceCordinates } = useContext(SourceCordiContext)
//   const { destinationCordinates } = useContext(DestinationCordiContext)
//   const [loading, setLoading] = useState(!userLocation) // ✅ added: loading state
//   const {directionData,setDirectionData} = useContext(DirectionDataContext)

//   // ✅ added: useEffect to fly to source coordinates
//   useEffect(() => {
//     if (mapRef.current && sourceCordinates?.lng && sourceCordinates?.lat) {
//       mapRef.current.flyTo({
//         center: [sourceCordinates.lng, sourceCordinates.lat],
//         duration: 2000,
//       })
//     }
//   }, [sourceCordinates])

//   // ✅ added: useEffect to fly to destination coordinates
//   useEffect(() => {
//     if (mapRef.current && destinationCordinates?.lng && destinationCordinates?.lat) {
//       mapRef.current.flyTo({
//         center: [destinationCordinates.lng, destinationCordinates.lat],
//         duration: 2000,
//       })
//     }
//     if(sourceCordinates && destinationCordinates){
//         getDirectionRoute();
//     }
//   }, [destinationCordinates])

//   // ✅ added: loading toggle after user location loads
//   useEffect(() => {
//     if (userLocation) setLoading(false)
//   }, [userLocation])



//   const getDirectionRoute=async() =>{
//     const res=await fetch(MAPBOX_DRIVING_ENDPOINTS+
//         sourceCordinates.lng+","+
//         sourceCordinates.lat+","+
//         destinationCordinates.lng+","+
//         destinationCordinates.lat+
//         "?overview=full&geometries=geojson"+
//         "&access_token="+process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
//         {
//             headers:{
//                 "Content-Type":"application/json",

//             }
//         }
//     );
//     const result= await res.json();
//     console.log(result);
//     setDirectionData(result);
//   }
//   return (
//     <div className='mt-5 border-[2px]'>
//       <h2 className='text-[20px] font-bold mb-2'>Map</h2>
//       <div className='rounded-lg overflow-hidden'>
//         {loading ? ( // ✅ changed: added loading message instead of null
//           <div className='text-center p-6 text-gray-600 animate-pulse'>
//             📍 Determining your location...
//           </div>
//         ) : (
//           <Map
//             ref={mapRef} // ✅ changed: assigned ref to the map instance
//             mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//             initialViewState={{
//               longitude: userLocation.lng,
//               latitude: userLocation.lat,
//               zoom: 14,
//             }}
//             style={{ width: '100%', height: 600, borderRadius: 10 }}
//             mapStyle='mapbox://styles/mapbox/streets-v9'
//           >
//             <Markers /> {/* ✅ unchanged: still renders marker component */}
//             {directionData?.routes? (
//                 <MapBoxRoute 
//                 coordinates={directionData?.routes[0]?.geometry?.coordinates}
//                 />
//             ): null}
//           </Map>
//         )}
//       </div>

//     </div>
//   )
// }

// export default MapBoxMap




'use client'

import * as React from 'react'
import Map, { Marker, MapRef } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { UserLocationContext } from '@/context/UserLocationContext'
import { SourceCordiContext } from '@/context/SourceCordiContext'
import { DestinationCordiContext } from '@/context/DestinationCordiContext'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import { useUser } from '@clerk/clerk-react'
import Markers from './Markers'
import MapBoxRoute from './MapBoxRoute'
import DistanceTime from './DistanceTime'

const MAPBOX_DRIVING_ENDPOINTS = "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = crypto.randomUUID();

export default function MapBoxMap() {
  const mapRef = useRef<MapRef>(null);
  const { userLocation } = useContext(UserLocationContext)
  const { sourceCordinates } = useContext(SourceCordiContext)
  const { destinationCordinates } = useContext(DestinationCordiContext)
  const { directionData, setDirectionData } = useContext(DirectionDataContext)
  const [loading, setLoading] = useState(!userLocation)
  const { user } = useUser()

  useEffect(() => {
    if (mapRef.current && sourceCordinates?.lng && sourceCordinates?.lat) {
      mapRef.current.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2000,
      })
    }
  }, [sourceCordinates])

  useEffect(() => {
    if (mapRef.current && destinationCordinates?.lng && destinationCordinates?.lat) {
      mapRef.current.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2000,
      })
      getDirectionRoute();
    }
  }, [destinationCordinates])

  useEffect(() => {
    if (userLocation) setLoading(false)
  }, [userLocation])

  const getDirectionRoute = async () => {
    try {
      const res = await fetch(
        `${MAPBOX_DRIVING_ENDPOINTS}${sourceCordinates.lng},${sourceCordinates.lat};${destinationCordinates.lng},${destinationCordinates.lat}` +
        `?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );
      if (!res.ok) {
        console.error("Directions fetch error:", res.statusText);
        return;
      }
      const result = await res.json();
      console.log("Route data:", result);
      setDirectionData(result);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }

  return (
    <div className="mt-5 border-[2px]">
      <h2 className="text-[20px] font-bold mb-2">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {loading ? (
          <div className="text-center p-6 text-gray-600 animate-pulse">
            📍 Determining your location...
          </div>
        ) : (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation.lng,
              latitude: userLocation.lat,
              zoom: 14,
            }}
            style={{ width: '100%', height: 600, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {directionData?.routes?.[0]?.geometry?.coordinates && (
              <MapBoxRoute coordinates={directionData.routes[0].geometry.coordinates} />
            )}
          </Map>
        )}
      </div>
      <div className='absolute bottom-[30px] z-20 right-[20px] hidden md:block font-semibold'>
        <DistanceTime/>
      </div>
    </div>
  )
}
