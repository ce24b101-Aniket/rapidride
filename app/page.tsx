import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg text-white relative overflow-hidden">
      <div className="hero-glow"></div>

      <section className="px-12 py-32">

        <div className="max-w-7xl mx-auto">

          <div className="max-w-6xl">

            <p className="text-zinc-400 mb-6 text-xl">
              Corporate Carpooling Reimagined
            </p>

            <h1 className="text-8xl md:text-9xl font-black leading-[0.95] mb-10 max-w-5xl">
              Smarter Employee Commutes
              for Modern Companies
            </h1>

            <p className="text-3xl text-zinc-400 mb-14 leading-relaxed max-w-3xl">
              RapidRide helps employees share rides safely,
              reduce transportation costs,
              and build sustainable workplaces.
            </p>

          <div className="flex gap-6 mt-10">

              <Link
                href="/dashboard"
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition"
              >
                Open Dashboard
              </Link>

              <Link
                href="/dashboard/create-ride"
                className="border border-zinc-700 px-8 py-4 rounded-2xl text-lg"
              >
                Create Ride
              </Link>

            </div>

          </div>

        </div>

      </section>

      <section className="px-10 pb-24">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

            <h2 className="text-3xl font-black mb-4">
              Secure Employee Network
            </h2>

            <p className="text-zinc-400">
              Only verified employees can access rides,
              ensuring safety and trust within organizations.
            </p>

          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

            <h2 className="text-3xl font-black mb-4">
              Reduce Fuel Costs
            </h2>

            <p className="text-zinc-400">
              Employees save money every month through optimized ride sharing.
            </p>

          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

            <h2 className="text-3xl font-black mb-4">
              Eco Friendly Mobility
            </h2>

            <p className="text-zinc-400">
              Fewer vehicles on the road means lower emissions and cleaner cities.
            </p>

          </div>

        </div>

      </section>

    </div>
  )
}