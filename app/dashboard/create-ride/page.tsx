'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  LoadScript,
  Autocomplete
} from '@react-google-maps/api'

const libraries: ("places")[] = ['places']

export default function CreateRidePage() {

  const router = useRouter()

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [availableSeats, setAvailableSeats] = useState(1)

  const [pickupAutocomplete, setPickupAutocomplete] = useState<any>(null)
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<any>(null)

  async function createRide() {

    const { error } = await supabase
      .from('rides')
      .insert([
        {
          origin,
          destination,
          available_seats: availableSeats,
          ride_status: 'active'
        }
      ])

    if (error) {
      console.error(error)
      alert('Failed to create ride')
    } else {
      alert('Ride created successfully!')
      router.push('/dashboard')
    }
  }

  return (

    <LoadScript
      googleMapsApiKey={
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
      }
      libraries={libraries}
    >

      <div className="min-h-screen bg-black text-white p-10">

        <div className="max-w-2xl mx-auto">

          <h1 className="text-6xl font-black mb-10">
            Create Ride
          </h1>

          <div className="space-y-6">

            <Autocomplete
              onLoad={(autocomplete) =>
                setPickupAutocomplete(autocomplete)
              }
              onPlaceChanged={() => {
                const place =
                  pickupAutocomplete?.getPlace()

                setOrigin(
                  place?.formatted_address || ''
                )
              }}
            >

              <input
                type="text"
                placeholder="Pickup Location"
                className="w-full bg-zinc-900 p-5 rounded-2xl text-white"
              />

            </Autocomplete>

            <Autocomplete
              onLoad={(autocomplete) =>
                setDestinationAutocomplete(
                  autocomplete
                )
              }
              onPlaceChanged={() => {
                const place =
                  destinationAutocomplete?.getPlace()

                setDestination(
                  place?.formatted_address || ''
                )
              }}
            >

              <input
                type="text"
                placeholder="Destination"
                className="w-full bg-zinc-900 p-5 rounded-2xl text-white"
              />

            </Autocomplete>

            <input
              type="number"
              placeholder="Seats"
              value={availableSeats}
              onChange={(e) =>
                setAvailableSeats(
                  Number(e.target.value)
                )
              }
              className="w-full bg-zinc-900 p-5 rounded-2xl text-white"
            />

            <button
              onClick={createRide}
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold"
            >
              Create Ride
            </button>

          </div>

        </div>

      </div>

    </LoadScript>
  )
}