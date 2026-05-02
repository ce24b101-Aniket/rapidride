'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Ride {
  id: string
  pickup_location: string
  destination: string
  available_seats: number
  created_by: string
  driver_name: string
  driver_email: string
  driver_phone: string
  ride_status: string
}

export default function DashboardPage() {

  const [rides, setRides] =
    useState<Ride[]>([])

  const [selectedRide,
    setSelectedRide] =
    useState<Ride | null>(null)

  const [loading,
    setLoading] =
    useState(true)

  const [userId,
    setUserId] =
    useState('')

  const [joinedRideIds,
    setJoinedRideIds] =
    useState<string[]>([])

  const [points,
    setPoints] =
    useState(120)

  useEffect(() => {

    initialize()

  }, [])

  async function initialize() {

    const {
      data: { user }
    } =
      await supabase.auth.getUser()

    if (user) {

      setUserId(user.id)

    }

    fetchRides()

  }

  async function fetchRides() {

    const { data } =
      await supabase
        .from('rides')
        .select('*')
        .order(
          'created_at',
          {
            ascending: false
          }
        )

    setRides(data || [])

    setLoading(false)

  }

  async function joinRide(
    ride: Ride
  ) {

    if (
      ride.available_seats <= 0
    ) {

      alert('Ride Full')

      return

    }

    await supabase
      .from('ride_participants')
      .insert([
        {
          ride_id: ride.id,
          user_id: userId
        }
      ])

    await supabase
      .from('rides')
      .update({
        available_seats:
          ride.available_seats - 1
      })
      .eq('id', ride.id)

    setJoinedRideIds(
      prev => [...prev, ride.id]
    )

    fetchRides()

    alert(
      'Ride joined successfully 🚖'
    )

  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-6xl font-black">

              RapidRide

            </h1>

            <p className="text-zinc-400 mt-2">

              Smart Corporate Ride Sharing

            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="bg-green-600 px-4 py-2 rounded-xl font-bold">

              🏆 {points} Points

            </div>

            <Link
              href="/dashboard/create-ride"
              className="bg-white text-black px-6 py-3 rounded-2xl font-bold"
            >

              + Create Ride

            </Link>

          </div>

        </div>

        {loading ? (

          <p>

            Loading...

          </p>

        ) : (

          <div className="grid md:grid-cols-3 gap-6">

            {rides.map((ride) => (

              <div
                key={ride.id}
                className={`p-6 rounded-3xl border ${
                  joinedRideIds.includes(
                    ride.id
                  )
                    ? 'bg-green-950 border-green-500'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >

                <h2 className="text-2xl font-black mb-2">

                  📍 {ride.pickup_location}

                </h2>

                <p className="text-zinc-400 mb-2">

                  ➜ {ride.destination}

                </p>

                <p className="mb-2">

                  Seats Left:
                  {' '}
                  {ride.available_seats}

                </p>

                <p className="mb-4 text-sm">

                  {joinedRideIds.includes(
                    ride.id
                  ) ? (

                    <span className="text-green-400">

                      🚗 Waiting for Driver

                    </span>

                  ) : (

                    <span className="text-yellow-400">

                      🟡 Available

                    </span>

                  )}

                </p>

                <div className="space-y-3">

                  <button
                    onClick={() =>
                      joinRide(ride)
                    }
                    disabled={
                      joinedRideIds.includes(
                        ride.id
                      )
                    }
                    className={`w-full py-2 rounded-xl font-bold ${
                      joinedRideIds.includes(
                        ride.id
                      )
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-black'
                    }`}
                  >

                    {joinedRideIds.includes(
                      ride.id
                    )
                      ? '✅ Joined'
                      : 'Join Ride'}

                  </button>

                  <button
                    onClick={() =>
                      setSelectedRide(ride)
                    }
                    className="w-full bg-zinc-800 py-2 rounded-xl"
                  >

                    View Details

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {selectedRide && (

        <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-6 z-50">

          <div className="bg-zinc-900 w-full max-w-4xl rounded-3xl p-6 relative">

            <button
              onClick={() =>
                setSelectedRide(null)
              }
              className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-lg"
            >

              X

            </button>

            <h2 className="text-5xl font-black mb-6">

              Ride Details

            </h2>

            <div className="mb-6 rounded-2xl overflow-hidden">

              <div className="relative h-72 w-full">

                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=80.2206%2C12.9701%2C80.2606%2C13.0101&layer=mapnik"
                  className="w-full h-full border-0 rounded-2xl"
                />

                <div className="absolute top-[45%] left-[55%] text-4xl animate-pulse">

                  🚖

                </div>

                <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded-xl">

                  <p className="text-green-400 font-bold">

                    {
                      joinedRideIds.includes(
                        selectedRide.id
                      )
                        ? '🚗 Driver arriving'
                        : '🟡 Waiting for passenger'
                    }

                  </p>

                  <p className="text-sm text-zinc-300">

                    ETA: 5 mins

                  </p>

                  <div className="mt-4">

                    <div className="w-full bg-zinc-700 h-3 rounded-full">

                      <div className="bg-green-500 h-3 rounded-full w-2/3">

                      </div>

                    </div>

                    <p className="text-sm text-zinc-400 mt-2">

                      Trip Progress: 67%

                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="space-y-4 mb-6">

              <h3 className="text-3xl font-bold">

                Driver Info

              </h3>

              <div className="flex items-center gap-4">

                <img
                  src="https://i.pravatar.cc/150?img=12"
                  className="w-20 h-20 rounded-full"
                />

                <div>

                  <p className="text-lg">

                    👤 {selectedRide.driver_name}

                  </p>

                  <p>

                    📧 {selectedRide.driver_email}

                  </p>

                  <p>

                    📞 {selectedRide.driver_phone}

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <a
                  href={`tel:${selectedRide.driver_phone}`}
                  className="bg-green-600 px-5 py-3 rounded-xl font-bold"
                >

                  📞 Call

                </a>

                <a
                  href={`https://wa.me/${selectedRide.driver_phone}`}
                  target="_blank"
                  className="bg-green-500 px-5 py-3 rounded-xl font-bold"
                >

                  💬 WhatsApp

                </a>

              </div>

            </div>

            <div className="bg-zinc-800 p-5 rounded-2xl">

              <p className="text-yellow-400 text-2xl font-bold">

                Ride OTP: 4821

              </p>

              <p className="text-zinc-400 mt-2">

                Share this OTP with driver after pickup

              </p>

              <div className="mt-4">

                <input
                  id="otpInput"
                  placeholder="Enter OTP"
                  className="w-full bg-black border border-zinc-700 rounded-xl p-3 mb-3"
                />

                <button
                  onClick={() => {

                    const otp =
                      (
                        document.getElementById(
                          'otpInput'
                        ) as HTMLInputElement
                      ).value

                    if (otp === '4821') {

                      alert(
                        'Ride Completed ✅ +10 Points Added'
                      )

                      setPoints(
                        prev => prev + 10
                      )

                    } else {

                      alert(
                        'Wrong OTP ❌'
                      )

                    }

                  }}
                  className="w-full bg-green-600 py-3 rounded-xl font-bold"
                >

                  Verify Ride

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}

