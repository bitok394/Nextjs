'use client'
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const router = useRouter()

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev, [name]:value
        }) )
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const response = await fetch('/api/auth/signup', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData)
            })
            const data = await response.json()
            if(response.ok) {
                setSuccess('account created successfully')
                setFormData({name: '',email: '',password: ''})
                router.push('/login')
            } else{
                setError(data.message)
            }
        } catch (err) {
            setError('Network eror please try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
            <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Signup</h2>
                {error && (
                    <div className='mb-4 p-4 bg-red-500 border border-red-400 text-red-700 rounded-lg'>{error}</div>
                )}
                {success && (
                    <div className='mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg'>{success}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Name</label>
                        <input 
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        required
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700'
                        
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Email</label>
                        <input 
                        type='text'
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                        disabled={loading}
                        required
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700'
                        
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Password</label>
                        <input 
                        type='text'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                        required
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700'
                        
                        />
                    </div>
                    <button type='submit' disabled= {loading}className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg'>{loading?'creating account...':"SignUp"}</button>
                </form>
                <div className='mt-6 text-center '>
                    <p className='text-gray-600'>Already have an account?  <a href='/login' className='text-blue-600 hover:underline'>Login</a>  </p>

                </div>
            </div>
        </div>
    )
}