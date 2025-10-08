'use client'

import Link from "next/link";
import React, {useEffect , useState} from 'react';


export default function Navbar () {
    const [isLoggedIn , setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    
    const checkAuthStatus = async() => {
        try{
            const response = await fetch('/api/auth/verify', {
                method:'GET',
                credentials:'include'
            })
            if (response.ok) {
                const userData = await response.json()
                setIsLoggedIn(true)
                setUser(userData.user)
            }
            else {
                setIsLoggedIn(false)
                setUser(null)
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        checkAuthStatus()
    },[])

    const getInitial = (email) => {
        return email ? email.charAt(0).toUpperCase(): '?'
    }

    // px- padding left 
    // py- padding top
    return (

        <nav className='bg-white shadow-md fixed top-0 left-0 w-full z-50'>
            <div className='container mx-auto px-4'>
                <div className=' flex justify-between items-center py-4'>

                
                <div className='flex items-center'>
                    <h2 className='text-2xl font-bold text-blue-600'>Hostel finder</h2>
                </div>
                <div className='hidden md:flex space-x-6'>
                    <Link href='/' className='text-gray-600 hover:text-blue-600'>Home</Link>
                    <Link href='/about' className='text-gray-600 hover:text-blue-600'>About</Link>
                    <Link href='/services' className='text-gray-600 hover:text-blue-600'>Services</Link>
                    <Link href='/contact' className='text-gray-600 hover:text-blue-600'>Contact</Link>
                </div>
                <div className='flex items-center space-x-4'>
                    {
                        isLoggedIn && user ? (
                            <div className='relative'>
                                <button className='flex items-center space-x-2 '>
                                    <div className='w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold'>
                                        {getInitial(user.email)}
                                    </div>
                                    <span className='text-gray-700 hidden md:block'>
                                        welcome, {user.name}
                                    </span>
                                </button>
                            </div>
                        ): (
                            <>
                            <Link href='/login' className='text-gray-600 hover:text-blue-600'>Login</Link>
                            <Link href='/signup' className='text-white bg-blue-600 px-4 py-2 rounded-lg '>Sign up</Link>
                            </>
                        )
                    }
                </div>
                </div> 
            </div>   
        </nav>
    )
}
