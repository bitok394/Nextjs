'use client' 

export default function Login () {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
            <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Login</h2>
                <form>
                   
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Email</label>
                        <input 
                        type='text'
                        name='email'
                        required
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                        
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Password</label>
                        <input 
                        type='text'
                        name='password'
                        required
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                        
                        />
                    </div>
                    <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg'>Login</button>
                </form>
                <div className='mt-6 text-center '>
                    <p className='text-gray-600'>Dont have an account?  <a href='/signup' className='text-blue-600 hover:underline'>Signup</a>  </p>

                </div>
            </div>
        </div>   
    )
}