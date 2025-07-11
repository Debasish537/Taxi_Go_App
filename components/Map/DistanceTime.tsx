import { DirectionDataContext } from '@/context/DirectionDataContext'
import React, { useContext } from 'react'

function DistanceTime() {
    const { directionData, setDirectionData } = useContext(DirectionDataContext);
    return directionData?. routes && (
        <div className='bg-yellow-500 p-3'>
            <h2 className='text-yellow-200 opacity-80 text-[15px]'>Distance:
                <span className='font-bold mr-3 text-black'>
                    {(directionData?.routes[0].distance / 1000)
                        .toFixed(2)}KMs</span>

                Direction: <span className='font-bold text-black'>
                    {(directionData?.routes[0].duration / 60)
                        .toFixed(2)}Mins
                </span>
            </h2>
        </div>
    )
}

export default DistanceTime 