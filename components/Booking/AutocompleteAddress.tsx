// import React, { useEffect, useState } from 'react'
// import { clearTimeout } from 'timers';

// function AutocompleteAddress() {
//     const [source, setSource] = useState<any>('')
//     const [addressList, setAddressList] = useState<any>([]);

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(() => {
//             getAddressList()
//         }, 1000)

//         return () => clearTimeout(delayDebounceFn)

//     }, [source])


//     const getAddressList = async () => {
//         const res = await fetch('/api/search-address?q=' + source, {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         const result = await res.json();
//         setAddressList(result)
//     }
//     return (
//         <div className='mt-5'>
//             <div>
//                 <label htmlFor="" className='text-gray-400'>Where From?</label>
//                 <input type="text" className='bg-white 
//             border-[1px] w-full rounded-md outline-none
//             focus:border-blue-500' value={source} onChange={(e) => setSource(e.target.value)} />
//                 {addressList?.suggest ?
//                     <div className='shadow-md p-1 rounded absolute w-full bg-white'>
//                         {addressList?.suggest.map((item: any, index: number) => (
//                             <h2 className='p-3 hover:bg-gray-100 cursor-pointer' )onClick={() => {
//                                 setSource(item.full_address);
//                                 setAddressList([]) }} >
//                             {item.full_address}</h2>
//                         ))}

//                     </div> : null}


//             </div>
//             <div className='mt-3'>
//                 <label htmlFor="" className='text-gray-400'>Where To?</label>
//                 <input type="text" className='bg-white 
//             border-[1px] w-full rounded-md outline-none
//             focus:border-blue-500'/>
//             </div>
//         </div>
//     )
// }

// export default AutocompleteAddress





// 'use client'
// import React, { useEffect, useState } from 'react'

// function AutocompleteAddress() {
//   const [source, setSource] = useState<string>('') // ✅ initialized as empty string
//   const [addressList, setAddressList] = useState<any[]>([])

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (source.trim() !== '') getAddressList()
//     }, 1000)

//     return () => clearTimeout(delayDebounceFn) // ✅ now uses browser API
//   }, [source])

//   const getAddressList = async () => {
//     const res = await fetch('/api/search-address?q=' + source, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     const result = await res.json()
//     setAddressList(result?.suggest || [])
//   }

//   return (
//     <div className='mt-5'>
//       <div>
//         <label className='text-gray-400'>Where From?</label>
//         <input
//           type='text'
//           className='bg-white border w-full rounded-md outline-none focus:border-blue-500 p-2'
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />

//         {addressList.length > 0 && (
//           <div className='mt-2'>
//             {addressList.map((item: any, index: number) => (
//               <h2 key={index}>{item.full_address}</h2>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className='mt-3'>
//         <label className='text-gray-400'>Where To?</label>
//         <input
//           type='text'
//           className='bg-white border w-full rounded-md outline-none focus:border-blue-500 p-2'
//         />
//       </div>
//     </div>
//   )
// }

// export default AutocompleteAddress



'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { SourceCordiContext } from '@/context/SourceCordiContext'
import { DestinationCordiContext } from '@/context/DestinationCordiContext'

const MAPBOX_RETRIVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'
const session_token = uuidv4()

function AutocompleteAddress() {
  const [source, setSource] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [addressList, setAddressList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [activeField, setActiveField] = useState<'from' | 'to' | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [sourceChange, setSourceChange] = useState<boolean>(false)

  
  const {sourceCordinates, setSourceCordinates} = useContext(SourceCordiContext)
  const {destinationCordinates, setDestinationCordinates} = useContext(DestinationCordiContext)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('location_history') || '[]')
    setHistory(saved)
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const query = activeField === 'from' ? source : destination
      if (typeof query === 'string' && query.trim() !== '') {
        getAddressList(query)
      } else {
        setAddressList([])
      }
    }, 700)
    return () => clearTimeout(delayDebounceFn)
  }, [source, destination, activeField])

  const getAddressList = async (query: string) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/search-address?q=${query}&session_token=${session_token}`)
      const result = await res.json()
      setAddressList(result?.suggestions || [])
    } catch (err) {
      console.error('Error fetching address:', err)
    } finally {
      setLoading(false)
    }
  }

  const onSourceAddressClick = async (item: any) => {
    setSource(item?.full_address || '')
    setAddressList([])
    setSourceChange(false)
    setActiveField(null)

    try {
      const res = await fetch(
        MAPBOX_RETRIVE_URL +
          item.mapbox_id +
          '?session_token=' +
          session_token +
          '&access_token=' +
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      )
      const result = await res.json()
      setSourceCordinates({
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1]
      })
      console.log('FROM location full details:', result)
    } catch (error) {
      console.error('Error fetching source full place info:', error)
    }
  }

  const onDestinationAddressClick = async (item: any) => {
    setDestination(item?.full_address || '')
    setAddressList([])
    setActiveField(null)

    try {
      const res = await fetch(
        MAPBOX_RETRIVE_URL +
          item.mapbox_id +
          '?session_token=' +
          session_token +
          '&access_token=' +
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      )
      const result = await res.json()
      setDestinationCordinates({
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1]
      })
      console.log('TO location full details:', result)
    } catch (error) {
      console.error('Error fetching destination full place info:', error)
    }
  }

  return (
    <div className="mt-5">
      {/* Where From */}
      <div className="relative mb-4">
        <label className="text-gray-400">Where From?</label>
        <input
          type="text"
          value={source || ''}
          onChange={(e) => setSource(e.target.value)}
          onFocus={() => setActiveField('from')}
          className="bg-white border w-full rounded-md outline-none focus:border-blue-500 p-2"
          placeholder="Enter pickup location..."
        />
        {(activeField === 'from' && addressList.length > 0) && (
          <div className="absolute z-10 bg-white w-full max-h-60 overflow-y-auto shadow-md rounded mt-1">
            {addressList.map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                onClick={() => onSourceAddressClick(item)}
              >
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">{item.place_formatted || item.full_address}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Where To */}
      <div className="relative">
        <label className="text-gray-400">Where To?</label>
        <input
          type="text"
          value={destination || ''}
          onChange={(e) => setDestination(e.target.value)}
          onFocus={() => setActiveField('to')}
          className="bg-white border w-full rounded-md outline-none focus:border-blue-500 p-2"
          placeholder="Enter drop location..."
        />
        {(activeField === 'to' && addressList.length > 0) && (
          <div className="absolute z-10 bg-white w-full max-h-60 overflow-y-auto shadow-md rounded mt-1">
            {addressList.map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                onClick={() => onDestinationAddressClick(item)}
              >
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">{item.place_formatted || item.full_address}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AutocompleteAddress






