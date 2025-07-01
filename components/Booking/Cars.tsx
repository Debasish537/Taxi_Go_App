import { DirectionDataContext } from '@/context/DirectionDataContext'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext';
import CarsList from '@/data/CarsList'
import React, { useContext, useState } from 'react'

function Cars(onCarSelectedAmount:any) {
    const [SelectedCar, setSelectedCar] = useState<any>()
    const { directionData, setDirectionData } = useContext(DirectionDataContext);
    const {carAmount,setCarAmount}=useContext(SelectedCarAmountContext);
    // const getCost = (charges:any) => {
    //     return (charges * directionData.routes[0].distance / 1000).toFixed(2)

    // }


    const getTripEstimate = (charges: any) => {
        const distanceInKm = directionData.routes[0].distance / 1000; // meters ➝ km
        const durationInMin = directionData.routes[0].duration / 60;  // seconds ➝ minutes

        const cost = (charges * distanceInKm).toFixed(2);
        const duration = Math.ceil(durationInMin); // rounded up to nearest minute

        return {
            cost,
            duration
        };
    };

    // function onCarSelectedAmount(amount: any) {
    //     setDirectionData((prev: any) => ({
    //         ...prev,
    //         selectedCarAmount: amount
    //     }));
    // }

    function getCost(charges: any): string {
        if (!directionData?.routes || !directionData.routes[0]) return '0.00';
        const distanceInKm = directionData.routes[0].distance / 1000;
        return (charges * distanceInKm).toFixed(2);
    }

    return (
        <div className='mt-3'>
            <h2 className='font-semibold'>Select Car</h2>

            <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
                {CarsList.map((item, index) => (
                    <div key={index} className={`m-2 p-2 border-[2px] rounded-md
                 hover:border-yellow-400 cursor-pointer
                 ${index === SelectedCar ? 'border-red-400 border-[3px]' : 'border-green-400 border-[1.5px]'}`}
                  onClick={() => {setSelectedCar(index);
                    setCarAmount(getCost(item.charges))}
                 }>
                        <img src={item.image} alt={item.name} width={75} height={90} className='w-full' />
                        <h2 className='text-[12px] text-gray-500'>{item.name}
                            {directionData.routes ?
                                <span className='float-right font-medium text-black'>{getTripEstimate(item.charges).cost} $</span> : null}
                        </h2>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Cars