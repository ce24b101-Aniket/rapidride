'use client'

import Link from 'next/link'

export default function Navbar() {

  return (

    <nav className="w-full flex items-center justify-between px-8 py-5 bg-black border-b border-zinc-800">

      <Link
        href="/"
        className="text-3xl font-black text-white"
      >
        RapidRide
      </Link>

      <div className="flex gap-4">

        <Link
          href="/dashboard"
          className="text-white hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/create-ride"
          className="text-white hover:text-gray-300"
        >
          Create Ride
        </Link>

        <Link
          href="/auth/login"
          className="bg-white text-black px-4 py-2 rounded-xl font-semibold"
        >
          Login
        </Link>

      </div>

    </nav>

  )
}