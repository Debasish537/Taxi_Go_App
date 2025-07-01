import CardsList from '@/data/CardsList'
import React, { useState } from 'react'

function Cards() {
    const [activeIndex,setActiveIndex]=useState<any>()

  return (
    <div>
        <h2 className='text-[14px] font-bold'>Payment Methods</h2>

        {/* here mt-1 is not requred */}

        <div className='grid grid-cols-5 mt-1 pl-2'>
            {CardsList.map((item,index)=>(
                <div  key={index} className={`w-[50px] border-[1px] flex items-center
                 justify-center rounded-md
                 cursor-pointer hover:border-yellow-400 
                 hover:scale-110 transition-all
                 ${activeIndex==index ? 'border-red-400 border-[2px]':'border-green-400 border-[1.5px]'}`}
                 onClick={() => setActiveIndex(index)}>
                    <img src={item.image} alt={item.name} width={30} height={50}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cards