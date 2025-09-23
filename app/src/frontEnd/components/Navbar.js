import Link from "next/link";

export default function Navbar () {

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
                    <Link href='/login' className='text-gray-600 hover:text-blue-600'>Login</Link>
                    <Link href='/signup' className='text-white bg-blue-600 px-4 py-2 rounded-lg hover:text-blue-600'>Sign up</Link>
                </div>
                </div> 
            </div>   
        </nav>
    )
}