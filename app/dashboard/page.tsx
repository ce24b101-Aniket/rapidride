'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {

  const [rides, setRides] = useState<any[]>([])

  useEffect(() => {
    fetchRides()
  }, [])

  const fetchRides = async () => {

    const { data, error } = await supabase
      .from('rides')
      .select('*')

    if (error) {
      console.log(error)
    } else {
      setRides(data || [])
    }
  }

  return (
    <div className='min-h-screen bg-black text-white p-10'>

      <div className='flex justify-between items-center'>

        <h1 className='text-5xl font-bold'>
          RapidRide Dashboard
        </h1>

        <a
          href='/dashboard/create-ride'
          className='bg-white text-black px-6 py-3 rounded-2xl font-bold'
        >
          Create Ride
        </a>

      </div>

      <div className='grid md:grid-cols-3 gap-6 mt-10'>

        {rides.map((ride) => (

          <div
            key={ride.id}
            className='bg-zinc-900 p-6 rounded-3xl'
          >

            <h2 className='text-2xl font-bold'>
              {ride.pickup_location}
            </h2>

            <p className='mt-3 text-gray-400'>
              Destination: {ride.destination}
            </p>

            <p className='mt-2'>
              Seats: {ride.available_seats}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}