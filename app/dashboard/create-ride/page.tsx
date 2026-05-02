'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CreateRidePage() {

  const router = useRouter()

  const [origin, setOrigin] =
    useState('')

  const [destination,
    setDestination] =
    useState('')

  const [originResults,
    setOriginResults] =
    useState<any[]>([])

  const [destinationResults,
    setDestinationResults] =
    useState<any[]>([])

  const [seats, setSeats] =
    useState(1)

  const [loading, setLoading] =
    useState(false)

  async function searchPlaces(
    query: string,
    type: 'origin' | 'destination'
  ) {

    if (
      !query ||
      query.length < 2
    ) return

    try {

      const response =
        await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}`
        )

      const data =
        await response.json()

      const places =
        data.features || []

      if (
        type === 'origin'
      ) {

        setOriginResults(
          places
        )

      } else {

        setDestinationResults(
          places
        )

      }

    } catch (error) {

      console.error(error)

    }

  }

  async function createRide() {

    setLoading(true)

    const {
      data: { user }
    } =
      await supabase.auth.getUser()

    if (!user) {

      alert('Login required')

      setLoading(false)

      return

    }

    const otp =
      Math.floor(
        1000 +
        Math.random() * 9000
      ).toString()

    const fakeDrivers = [

      {
        name: 'Rahul Driver',
        phone: '+919876543210'
      },

      {
        name: 'Karthik Rider',
        phone: '+919812345678'
      },

      {
        name: 'Arjun Kumar',
        phone: '+919999111222'
      }

    ]

    const randomDriver =
      fakeDrivers[
        Math.floor(
          Math.random() *
          fakeDrivers.length
        )
      ]

    const { error } =
      await supabase
        .from('rides')
        .insert([
          {

            pickup_location:
              origin,

            destination:
              destination,

            available_seats:
              seats,

            created_by:
              user.id,

            driver_name:
              randomDriver.name,

            driver_email:
              user.email,

            driver_phone:
              randomDriver.phone,

            ride_status:
              'Driver arriving 🚗',

            ride_otp:
              otp

          }
        ])

    setLoading(false)

    if (error) {

      console.error(error)

      alert(
        'Failed to create ride'
      )

      return

    }

    alert(
      `Ride created successfully!\nOTP: ${otp}`
    )

    router.push('/dashboard')

  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-5xl font-black mb-10">

          Create Ride

        </h1>

        <div className="space-y-6">

          {/* ORIGIN */}

          <div>

            <input
              type="text"
              placeholder="Origin"
              value={origin}
              onChange={(e) => {

                setOrigin(
                  e.target.value
                )

                searchPlaces(
                  e.target.value,
                  'origin'
                )

              }}
              className="w-full p-4 rounded-2xl bg-zinc-900"
            />

            {originResults
              .length > 0 && (

              <div className="bg-zinc-900 mt-2 rounded-xl overflow-hidden">

                {originResults
                  .slice(0, 5)
                  .map(
                    (
                      place: any,
                      index
                    ) => (

                    <div
                      key={index}
                      onClick={() => {

                        setOrigin(

                          place
                            .properties
                            .name ||

                          ''

                        )

                        setOriginResults(
                          []
                        )

                      }}
                      className="p-3 hover:bg-zinc-800 cursor-pointer"
                    >

                      {

                        place
                          .properties
                          .name

                      }

                    </div>

                ))}

              </div>

            )}

          </div>

          {/* DESTINATION */}

          <div>

            <input
              type="text"
              placeholder="Destination"
              value={
                destination
              }
              onChange={(e) => {

                setDestination(
                  e.target.value
                )

                searchPlaces(
                  e.target.value,
                  'destination'
                )

              }}
              className="w-full p-4 rounded-2xl bg-zinc-900"
            />

            {destinationResults
              .length > 0 && (

              <div className="bg-zinc-900 mt-2 rounded-xl overflow-hidden">

                {destinationResults
                  .slice(0, 5)
                  .map(
                    (
                      place: any,
                      index
                    ) => (

                    <div
                      key={index}
                      onClick={() => {

                        setDestination(

                          place
                            .properties
                            .name ||

                          ''

                        )

                        setDestinationResults(
                          []
                        )

                      }}
                      className="p-3 hover:bg-zinc-800 cursor-pointer"
                    >

                      {

                        place
                          .properties
                          .name

                      }

                    </div>

                ))}

              </div>

            )}

          </div>

          {/* SEATS */}

          <input
            type="number"
            value={seats}
            onChange={(e) =>
              setSeats(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full p-4 rounded-2xl bg-zinc-900"
          />

          {/* BUTTON */}

          <button
            onClick={createRide}
            disabled={loading}
            className="bg-white text-black px-6 py-4 rounded-2xl font-bold w-full"
          >

            {
              loading
                ? 'Creating Ride...'
                : 'Create Ride'
            }

          </button>

        </div>

      </div>

    </div>

  )

}

