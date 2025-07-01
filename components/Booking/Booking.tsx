// import React from 'react'
// import AutocompleteAddress from './AutocompleteAddress'

// function Booking() {
//     const screenHeight =window.innerHeight;
//   return (
//     <div className='p-5'>
//         <h2 className='text-[20px] font-semibold'>Booking</h2>
//         <div className='border-[1px] p-5 rounded-md' style={{ height: screenHeight }}>
//             <AutocompleteAddress/>
//         </div>

//     </div>
//   )
// }

// export default Booking  


// 'use client'  // ✅ Required in Next.js App Router if using useEffect/useState in components

// import React, { useEffect, useState } from 'react'
// import AutocompleteAddress from './AutocompleteAddress'

// function Booking() {
//   const [screenHeight, setScreenHeight] = useState<number>(0)

//   useEffect(() => {
//     const handleResize = () => setScreenHeight(window.innerHeight*0.72)
//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return (
//     <div className="p-5">
//       <h2 className="text-[20px] font-semibold">Booking</h2>
//       <div
//         className="border-[1px] p-5 rounded-md"
//         style={{ height: screenHeight }}
//       >
//         <AutocompleteAddress />
//       </div>
//     </div>
//   )
// }

// export default Booking


// 'use client'

// import React, { useEffect, useState } from 'react'
// import AutocompleteAddress from './AutocompleteAddress'
// import Cars from './Cars'
// import Cards from './Cards'

// function Booking() {
//     const [screenHeight, setScreenHeight] = useState<number>(0)

//     useEffect(() => {
//         const handleResize = () => setScreenHeight(window.innerHeight * 0.72)
//         handleResize() // Call once on mount
//         window.addEventListener('resize', handleResize)
//         return () => window.removeEventListener('resize', handleResize)
//     }, [])

//     return (
//         <div className="p-5">
//             <h2 className="text-[20px] font-semibold mb-4">Booking</h2>
//             <div
//                 className="border p-5 rounded-md overflow-hidden"
//                 style={{ height: screenHeight }}>
//                 <AutocompleteAddress />
//                 <Cars/>
//                 <Cards/>
//                 <button className='w-full bg-yellow-600 p-1 rounded-md mt-4'>Book</button>
//             </div>
//         </div>
//     )
// }

// export default Booking






// 'use client'

// import React, { useEffect, useState } from 'react'
// import AutocompleteAddress from './AutocompleteAddress'
// import Cars from './Cars'
// import Cards from './Cards'
// import { useRouter } from 'next/navigation'

// function Booking() {
//   const [screenHeight, setScreenHeight] = useState<number>(0)
//   const [amount, setAmount] = useState<any>(null)
//   const router = useRouter();
//   useEffect(() => {
//     const handleResize = () => setScreenHeight(window.innerHeight * 0.9)
//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return (
//     <div className="p-5 h-full">
//       <div
//         className="border p-4 rounded-md h-full flex flex-col justify-between"
//         style={{ maxHeight: screenHeight }}
//       >
//         {/* Booking title inside the container now */}
//         <h2 className="text-[20px] font-semibold mb-3">📦 Booking</h2>

//         {/* Content section */}
//         <div className="flex-1">
//           <AutocompleteAddress />
//           <Cars onCarSelectedAmount={(amount:any)=>setAmount(amount)}/>
//           <Cards />
//         </div>

//         {/* Book button */}
// <button className={`w-full bg-yellow-500 p-2 rounded-md mt-4 text-white hover:bg-blue-300"
// ${!amount? 'bg-gray-200':null }`}
// onClick={()=> router.push('/payment')}
// disabled={!amount}>
//   Book
// </button>
//       </div>
//     </div>
//   )
// }

// export default Booking







'use client'

import React, { useContext, useEffect, useState } from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import Cars from './Cars'
import Cards from './Cards'
import { useRouter } from 'next/navigation' // ✅ correct import
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext';
function Booking() {
    const [screenHeight, setScreenHeight] = useState<number>(0)
    const {carAmount,setCarAmount}=useContext(SelectedCarAmountContext);
    const router: any = useRouter(); // ✅ no need to cast to any

    useEffect(() => {
        const handleResize = () => setScreenHeight(window.innerHeight * 0.9)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="p-5 h-full">
            <div
                className="border p-4 rounded-md h-full flex flex-col justify-between"
                style={{ maxHeight: screenHeight }}
            >
                <h2 className="text-[20px] font-semibold mb-3 cursor-pointer ">📦 Booking</h2>

                <div className="flex-1">
                    <AutocompleteAddress />
                    <Cars />
                    <Cards />
                </div>

                <button
                    className={`w-full bg-yellow-400 p-1 rounded-md 
                        mt-4  ${ !carAmount ? 'bg-gray-200 hover:bg-green-300 cursor-pointer' :'bg-green-200 cursor-not-allowed'}`}
                    onClick={() => router.push('/payment')}
                >
                    Book
                </button>

            </div>
        </div>
    )
}

export default Booking
