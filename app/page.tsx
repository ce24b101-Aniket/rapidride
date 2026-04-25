'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-black"
        >
          RapidRide
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-xl text-gray-400 max-w-2xl"
        >
          Smart corporate carpooling for modern companies.
          Reduce commute costs, traffic, and carbon emissions.
        </motion.p>

        <div className="flex gap-4 mt-10">

          <Link href="/auth/signup">
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
              Get Started
            </button>
          </Link>

          <Link href="/auth/login">
            <button className="border border-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition">
              Login
            </button>
          </Link>

        </div>

      </section>

      <section className="grid md:grid-cols-3 gap-6 px-10 pb-20">

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-3xl font-bold">
            Save Money
          </h2>

          <p className="text-gray-400 mt-4">
            Share rides with colleagues and reduce daily commute expenses.
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-3xl font-bold">
            Eco Friendly
          </h2>

          <p className="text-gray-400 mt-4">
            Reduce traffic congestion and carbon emissions.
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-3xl font-bold">
            Corporate Verified
          </h2>

          <p className="text-gray-400 mt-4">
            Only verified company employees can join rides.
          </p>
        </div>

      </section>

    </main>
  )
}