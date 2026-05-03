'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Ride {
  id: string
  pickup_location: string
  destination: string
  available_seats: number
  ride_status: string
  created_by: string
  driver_name?: string
  driver_email?: string
  driver_phone?: string
  ride_otp?: string
}

export default function DashboardPage() {

  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState('')
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null)
  const [joinedRides, setJoinedRides] = useState<string[]>([])
  const [verifiedRides, setVerifiedRides] = useState<string[]>([])
  const [joiningRideId, setJoiningRideId] = useState('')
  const [notification, setNotification] = useState('')
  const [points, setPoints] = useState(120)
  const [co2Saved] = useState(128)

  useEffect(() => {
    fetchUser()
    fetchRides()
  }, [])

  async function fetchUser() {

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (user) {
      setUserId(user.id)
    }
  }

  async function fetchRides() {

    const { data, error } = await supabase
      .from('rides')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setRides(data)
    }

    setLoading(false)
  }

  async function joinRide(ride: Ride) {

    if (ride.available_seats <= 0) {
      alert('Ride Full')
      return
    }

    setJoiningRideId(ride.id)

    const { error } = await supabase
      .from('ride_participants')
      .insert([
        {
          ride_id: ride.id,
          user_id: userId
        }
      ])

    if (error) {
      alert('Failed to join ride')
      setJoiningRideId('')
      return
    }

    await supabase
      .from('rides')
      .update({
        available_seats:
          ride.available_seats - 1
      })
      .eq('id', ride.id)

    setJoinedRides([
      ...joinedRides,
      ride.id
    ])

    setNotification(
      'Driver accepted your request 🚘'
    )

    setTimeout(() => {
      setNotification('')
    }, 3000)

    fetchRides()

    setJoiningRideId('')
  }

  function verifyRide(rideId: string) {

    setVerifiedRides([
      ...verifiedRides,
      rideId
    ])

    setPoints(prev => prev + 10)

    alert(
      'Ride verified successfully ✅ +10 points'
    )
  }

  return (

    <div className="min-h-screen bg-black text-white p-4 md:p-10">

      {notification && (

        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-[100]">

          {notification}

        </div>

      )}

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">

          <div>

            <h1 className="text-3xl md:text-6xl font-black mb-3">

              RapidRide 🚖

            </h1>

            <p className="text-zinc-400">

              Smart Sustainable Commute for Corporates

            </p>

          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">

            <div className="bg-green-600 px-4 py-3 rounded-2xl font-bold text-center">

              🏆 {points} Points

            </div>

            <div className="bg-green-900 text-green-300 px-4 py-3 rounded-2xl font-bold text-center">

              🌱 CO₂ Saved: {co2Saved}kg

            </div>

            <Link
              href="/dashboard/create-ride"
              className="bg-white text-black px-6 py-3 rounded-2xl font-bold text-center"
            >

              + Create Ride

            </Link>

          </div>

        </div>

        {loading ? (

          <p>Loading rides...</p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {rides.map((ride) => {

              const isOwner =
                ride.created_by === userId

              const isJoined =
                joinedRides.includes(ride.id)

              const isVerified =
                verifiedRides.includes(ride.id)

              return (

                <div
                  key={ride.id}
                  className={`rounded-3xl p-6 border transition-all duration-300 ${
                    isJoined
                      ? 'bg-green-950 border-green-500'
                      : 'bg-zinc-900 border-zinc-800'
                  }`}
                >

                  <h2 className="text-2xl font-bold mb-3">

                    📍 {ride.pickup_location}

                  </h2>

                  <p className="text-zinc-400 mb-2">

                    ➜ {ride.destination}

                  </p>

                  <p className="mb-2">

                    Seats Left: {ride.available_seats}

                  </p>

                  <p className="mb-4 text-sm text-green-400">

                    {isJoined
                      ? '🚗 Waiting for Driver'
                      : '🟡 Available'}

                  </p>

                  {isVerified && (

                    <p className="text-yellow-400 mb-4 text-sm">

                      Ride Completed ✅

                    </p>

                  )}

                  <div className="space-y-3">

                    {isOwner ? (

                      <button className="w-full bg-zinc-700 py-3 rounded-xl font-bold">

                        Your Ride

                      </button>

                    ) : ride.available_seats <= 0 ? (

                      <button className="w-full bg-red-600 py-3 rounded-xl font-bold">

                        Ride Full

                      </button>

                    ) : isJoined ? (

                      <button className="w-full bg-green-600 py-3 rounded-xl font-bold">

                        ✅ Joined

                      </button>

                    ) : (

                      <button
                        onClick={() => joinRide(ride)}
                        className="w-full bg-white text-black py-3 rounded-xl font-bold"
                      >

                        {joiningRideId === ride.id
                          ? 'Joining...'
                          : 'Join Ride'}

                      </button>

                    )}

                    <button
                      onClick={() => setSelectedRide(ride)}
                      className="w-full bg-zinc-800 py-3 rounded-xl"
                    >

                      View Details

                    </button>

                  </div>

                </div>

              )
            })}

          </div>

        )}

      </div>

      {selectedRide && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">

          <div className="bg-zinc-900 w-full max-w-4xl rounded-3xl p-4 md:p-6 relative max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setSelectedRide(null)}
              className="absolute top-4 right-4 bg-red-600 w-10 h-10 rounded-xl"
            >

              X

            </button>

            <h2 className="text-3xl md:text-5xl font-black mb-6">

              Ride Details

            </h2>

            <div className="bg-zinc-800 rounded-3xl p-4 mb-6">

              <div className="relative h-52 md:h-72 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-700 to-zinc-900">

                <div className="absolute left-8 text-3xl">
                  📍
                </div>

                <div className="absolute right-8 text-3xl">
                  🏢
                </div>

                <div className="absolute w-[80%] h-2 bg-zinc-500 rounded-full"></div>

                <div className="absolute animate-pulse text-5xl top-10">
                  🚗
                </div>

                <div className="absolute left-[20%] bottom-20 text-3xl animate-bounce">
                  🚕
                </div>

              </div>

              <p className="text-center text-green-400 font-bold mt-6 text-xl">

                Driver is 5 mins away 🚘

              </p>

              <div className="mt-4">

                <div className="w-full bg-zinc-700 h-3 rounded-full">

                  <div className="bg-green-500 h-3 rounded-full w-2/3"></div>

                </div>

                <p className="text-sm text-zinc-400 mt-2 text-center">

                  Trip Progress: 67%

                </p>

              </div>

            </div>

            <div className="space-y-4 mb-6">

              <h3 className="text-2xl font-bold">

                Driver Info

              </h3>

              <div className="flex items-center gap-4">

                <img
                  src="https://i.pravatar.cc/150?img=12"
                  className="w-16 h-16 rounded-full"
                />

                <div>

                  <p>
                    👤 {selectedRide.driver_name || 'Rahul Driver'}
                  </p>

                  <p>
                    📧 {selectedRide.driver_email || 'driver@rapidride.com'}
                  </p>

                  <p>
                    📞 {selectedRide.driver_phone || '+91 9876543210'}
                  </p>

                </div>

              </div>

            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">

              <a
                href={`tel:${selectedRide.driver_phone || '+919876543210'}`}
                className="bg-green-600 text-white px-6 py-4 rounded-2xl font-bold text-center"
              >

                📞 Call Driver

              </a>

              <a
                href={`https://wa.me/${(selectedRide.driver_phone || '919876543210').replace(/[^0-9]/g, '')}`}
                target="_blank"
                className="bg-green-500 text-white px-6 py-4 rounded-2xl font-bold text-center"
              >

                💬 WhatsApp

              </a>

            </div>

            <div className="bg-zinc-800 p-6 rounded-3xl mb-6">

              <p className="text-yellow-400 text-2xl font-black mb-3">

                Ride OTP: {selectedRide.ride_otp || '4821'}

              </p>

              <p className="text-zinc-300 mb-4">

                Share this OTP with driver after pickup

              </p>

              <input
                id="otpInput"
                placeholder="Enter OTP"
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 mb-4"
              />

              <button
                onClick={() => {

                  const otp = (
                    document.getElementById(
                      'otpInput'
                    ) as HTMLInputElement
                  ).value

                  if (
                    otp ===
                    (selectedRide.ride_otp || '4821')
                  ) {

                    verifyRide(selectedRide.id)

                  } else {

                    alert('Wrong OTP ❌')

                  }
                }}
                className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-xl"
              >

                Verify Ride Completion

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}
