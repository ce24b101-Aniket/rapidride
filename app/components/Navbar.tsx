'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Navbar() {

  const [user, setUser] = useState<any>(null)

 useEffect(() => {

  async function getUser() {

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (user) {

      setUser(user)

      await supabase
        .from('users')
        .upsert([
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata.full_name,
            avatar_url: user.user_metadata.avatar_url
          }
        ])

    }

  }

  getUser()

}, []) 

  async function signInWithGoogle() {

    await supabase.auth.signInWithOAuth({

      provider: 'google',

      options: {
        redirectTo: 'http://localhost:3000/dashboard'
      }

    })

  }

  async function logout() {

    await supabase.auth.signOut()

    setUser(null)

  }

  return (

    <nav className="flex justify-between items-center p-6 border-b border-zinc-800 bg-black text-white">

      <Link
        href="/"
        className="text-4xl font-black"
      >
        RapidRide
      </Link>

      <div className="flex gap-6 items-center">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/dashboard/create-ride">
          Create Ride
        </Link>

        {user ? (

          <div className="flex items-center gap-4">

            <p className="text-sm">
              {user.email}
            </p>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-xl"
            >
              Logout
            </button>

          </div>

        ) : (

          <button
            onClick={signInWithGoogle}
            className="bg-white text-black px-6 py-3 rounded-2xl font-bold"
          >
            Login with Google
          </button>

        )}

      </div>

    </nav>

  )

}