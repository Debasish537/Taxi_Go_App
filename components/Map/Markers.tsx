// import { UserLocationContext } from '@/context/UserLocationContext'
// import React, { useContext } from 'react'
// import { Marker } from 'react-map-gl/mapbox'
// function Markers() {

//     const { userLocation, setUserLocation } =
//         useContext(UserLocationContext)

//     return (
//         <div>
//             {/** User Marker */}
//             <Marker
//             longitude={userLocation.lng}
//             latitude={userLocation.lat}
//             anchor='bottom'
//         >
//             <div className='relative w-[40px] h-[55px] animate-bounce cursor-pointer'>
//                 {/* SVG red pin */}
//                 <svg
//                     width='40'
//                     height='55'
//                     viewBox='0 0 24 24'
//                     fill='red'
//                     xmlns='http://www.w3.org/2000/svg'
//                 >
//                     <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
//                     <circle cx="12" cy="9" r="2.5" fill="white" />
//                 </svg>

//                 {/* User avatar inside the red pin */}
//                 <div className='absolute top-[6px] left-[6px] w-[28px] h-[28px] rounded-full overflow-hidden border-[2px] border-white shadow'>
//                     <img
//                         src={
//                             'https://cdn-icons-png.flaticon.com/512/149/149071.png'
//                         }
//                         alt='User'
//                         className='w-full h-full object-cover'
//                     />
//                 </div>
//             </div>
//         </Marker></div>
//     )
// }

// export default Markers



// 'use client'

// import React, { useContext } from 'react'
// import { Marker } from 'react-map-gl/mapbox'
// import { UserLocationContext } from '@/context/UserLocationContext'
// import { useUser } from '@clerk/clerk-react'
// import { SourceCordiContext } from '@/context/SourceCordiContext'
// import { DestinationCordiContext } from '@/context/DestinationCordiContext'

// function Markers() {
//     const { userLocation } = useContext(UserLocationContext)
//     const { user } = useUser()
//     const { sourceCordinates } = useContext(SourceCordiContext)
//     const { destinationCordinates } = useContext(DestinationCordiContext)

//     return (
//         <div>
//             {/* ✅ User Marker */}
//             {userLocation && (
//                 <Marker
//                     longitude={userLocation.lng}
//                     latitude={userLocation.lat}
//                     anchor="bottom"
//                 >
//                     <div className="relative w-[40px] h-[55px] animate-bounce cursor-pointer">
//                         {/* SVG red pin */}
//                         <svg
//                             width="40"
//                             height="55"
//                             viewBox="0 0 24 24"
//                             fill="red"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
//                             <circle cx="12" cy="9" r="2.5" fill="white" />
//                         </svg>

//                         {/* User avatar inside red pin */}
//                         <div className="absolute top-[6px] left-[6px] w-[28px] h-[28px] rounded-full overflow-hidden border-[2px] border-white shadow">
//                             <img
//                                 src={
//                                     user?.imageUrl ||
//                                     'https://cdn-icons-png.flaticon.com/512/149/149071.png'
//                                 }
//                                 alt="User"
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                     </div>
//                 </Marker>
//             )}

//             {/* ✅ Source Marker */}
//             {sourceCordinates?.lng && sourceCordinates?.lat && (
//                 <Marker
//                     longitude={sourceCordinates.lng}
//                     latitude={sourceCordinates.lat}
//                     anchor="bottom"
//                 >
//                     <img
//                         src="https://cdn-icons-png.flaticon.com/512/149/149060.png"
//                         alt="Source"
//                         title="Pickup Location"
//                         className="w-[30px] h-[30px] drop-shadow-md"
//                     />
//                 </Marker>
//             )}

//             {/* ✅ Destination Marker */}
//             {destinationCordinates?.lng && destinationCordinates?.lat && (
//                 <Marker
//                     longitude={destinationCordinates.lng}
//                     latitude={destinationCordinates.lat}
//                     anchor="bottom"
//                 >
//                     <img
//                         src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
//                         alt="Destination"
//                         title="Drop Location"
//                         className="w-[30px] h-[30px] drop-shadow-md"
//                     />
//                 </Marker>
//             )}
//         </div>
//     )
// }

// export default Markers








'use client'

import React, { useContext } from 'react'
import { Marker } from 'react-map-gl/mapbox'
import { UserLocationContext } from '@/context/UserLocationContext'
import { useUser } from '@clerk/clerk-react'
import { SourceCordiContext } from '@/context/SourceCordiContext'
import { DestinationCordiContext } from '@/context/DestinationCordiContext'
import { DirectionDataContext } from '@/context/DirectionDataContext' // ✅ Direction context

function Markers() {
  const { userLocation } = useContext(UserLocationContext)
  const { user } = useUser()
  const { sourceCordinates } = useContext(SourceCordiContext)
  const { destinationCordinates } = useContext(DestinationCordiContext)
  const { directionData } = useContext(DirectionDataContext)

  // ✅ Extract distance & duration info
  const routeInfo = directionData?.routes?.[0]?.legs?.[0]
  const distance = routeInfo?.distance ? (routeInfo.distance / 1000).toFixed(2) + ' km' : null
  const duration = routeInfo?.duration ? Math.ceil(routeInfo.duration / 60) + ' min' : null

  return (
    <div>
      {/* ✅ User Marker */}
      {userLocation && (
        <Marker
          longitude={userLocation.lng}
          latitude={userLocation.lat}
          anchor="bottom"
        >
          <div className="relative w-[40px] h-[55px] animate-bounce cursor-pointer">
            {/* SVG red pin */}
            <svg
              width="40"
              height="55"
              viewBox="0 0 24 24"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" fill="white" />
            </svg>

            {/* ✅ Avatar */}
            <div className="absolute top-[6px] left-[6px] w-[28px] h-[28px] rounded-full overflow-hidden border-[2px] border-white shadow">
              <img
                src={
                  user?.imageUrl ||
                  'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                }
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Marker>
      )}

      {/* ✅ Source Marker */}
      {sourceCordinates?.lng && sourceCordinates?.lat && (
        <Marker
          longitude={sourceCordinates.lng}
          latitude={sourceCordinates.lat}
          anchor="bottom"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149060.png"
            alt="Source"
            title="Pickup Location"
            className="w-[30px] h-[30px] drop-shadow-md"
          />
        </Marker>
      )}

      {/* ✅ Destination Marker + Distance/Duration Overlay */}
      {destinationCordinates?.lng && destinationCordinates?.lat && (
        <Marker
          longitude={destinationCordinates.lng}
          latitude={destinationCordinates.lat}
          anchor="bottom"
        >
          <div className="relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="Destination"
              title="Drop Location"
              className="w-[30px] h-[30px] drop-shadow-md"
            />

            {/* ✅ Distance & Duration Tooltip */}
            {distance && duration && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-[10]">
                🚗 {distance}, ⏱️ {duration}
              </div>
            )}
          </div>
        </Marker>
      )}
    </div>
  )
}

export default Markers
