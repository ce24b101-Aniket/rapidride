'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function CreateRidePage() {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [seats, setSeats] = useState(1)

  const createRide = async () => {

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      alert('Login required')
      return
    }

    const { error } = await supabase
      .from('rides')
      .insert({
        pickup_location: pickup,
        destination: destination,
        available_seats: seats
      })

    if (error) {
      alert(error.message)
    } else {
      alert('Ride created successfully')
    }
  }

  return (
    <div className='min-h-screen bg-black text-white p-10'>

      <h1 className='text-5xl font-bold mb-10'>
        Create Ride
      </h1>

      <div className='max-w-xl space-y-4'>

        <input
          className='w-full p-4 rounded-xl bg-zinc-900'
          placeholder='Pickup Location'
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />

        <input
          className='w-full p-4 rounded-xl bg-zinc-900'
          placeholder='Destination'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type='number'
          className='w-full p-4 rounded-xl bg-zinc-900'
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
        />

        <button
          onClick={createRide}
          className='bg-white text-black px-8 py-4 rounded-2xl font-bold'
        >
          Create Ride
        </button>

      </div>

    </div>
  )
}