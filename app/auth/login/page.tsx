'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-black text-white'>
      <div className='w-full max-w-md border border-gray-800 p-8 rounded-2xl'>
        <h1 className='text-4xl font-bold mb-6'>
          Login
        </h1>

        <input
          className='w-full p-3 rounded-lg bg-gray-900 mb-4'
          placeholder='Email'
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
          onClick={login}
          className='w-full bg-white text-black py-3 rounded-lg font-semibold'
        >
          Login
        </button>
      </div>
    </div>
  )
}