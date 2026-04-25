'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Ride {
  id: string
  origin: string
  destination: string
  available_seats: number
}

export default function DashboardPage() {

  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRides()
  }, [])

  async function fetchRides() {

    const { data, error } = await supabase
      .from('rides')
      .select('*')

    if (error) {
      console.error(error)
    } else {
      setRides(data)
    }

    setLoading(false)
  }
async function joinRide(ride: Ride) {

  if (ride.available_seats <= 0){
    alert('No seats available')
    return
  }

  const { error } = await supabase
    .from('rides')
    .update({
      available_seats: ride.available_seats - 1
    })
    .eq('id', ride.id)

  if (error) {
    console.error(error)
    alert('Failed to join ride')
  } else {

    alert('Ride joined successfully!')

    fetchRides()
  }
}

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-12">

          <div>

            <h1 className="text-6xl font-black mb-4">
              RapidRide Dashboard
            </h1>

            <p className="text-zinc-400 text-xl">
              Real-time corporate ride sharing
            </p>

          </div>

          <Link
            href="/dashboard/create-ride"
            className="bg-white text-black px-6 py-3 rounded-2xl font-bold"
          >
            + Create Ride
          </Link>

        </div>

        {loading ? (

          <p className="text-zinc-400">
            Loading rides...
          </p>

        ) : rides.length === 0 ? (

          <p className="text-zinc-400">
            No rides available.
          </p>

        ) : (

          <div className="grid md:grid-cols-3 gap-6">

            {rides.map((ride) => (

              <div
                key={ride.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
              >

                <h2 className="text-3xl font-black mb-4">
                  {ride.origin}
                </h2>

                <p className="text-zinc-400 mb-2">
                  Destination: {ride.destination}
                </p>

                <p className="mb-6">
                Seats: {ride.available_seats}
                </p>

                <button
                  onClick={() => joinRide(ride)}
                  className="bg-white text-black px-5 py-2 rounded-xl font-bold hover:bg-zinc-200 transition"
                >
                  Join Ride
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  )
}