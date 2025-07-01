import { UserButton } from '@clerk/nextjs'
import React from 'react'

function NavBar() {
    return (
        <div className='flex justify-between 
        p-3 px-10 border-b-[1px] shadow-sm'>
            <div className='flex gap-10 items-center'>
                <img src="https://taxigo.online/sites/all/themes/alma/assets/front3/img/logo.svg" alt="taxi log" width={110} height={60} />
                <div className='hidden md:flex gap-6'>
                    {/* <h2 className="hover:bg-pink-100 p-2 rounded-md hover:text-blue-500">Home</h2> */}
                    <h2 className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-all">Home</h2>
                    <h2 className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-all">History</h2>
                    <h2 className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-all">Help</h2>
                </div>
            </div>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default NavBar