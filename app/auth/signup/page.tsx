'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    setLoading(true)

    const domain = email.split('@')[1]

    const blocked = ['gmail.com', 'yahoo.com']

    if (blocked.includes(domain)) {
      alert('Use company email')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Account created')
      router.push('/auth/login')
    }

    setLoading(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-black text-white'>
      <div className='w-full max-w-md border border-gray-800 p-8 rounded-2xl'>
        <h1 className='text-4xl font-bold mb-6'>
          RapidRide Signup
        </h1>

        <input
          className='w-full p-3 rounded-lg bg-gray-900 mb-4'
          placeholder='Corporate Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          className='w-full p-3 rounded-lg bg-gray-900 mb-4'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className='w-full bg-white text-black py-3 rounded-lg font-semibold'
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </div>
    </div>
  )
}