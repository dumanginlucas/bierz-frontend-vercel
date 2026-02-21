
// VERSION 2 - Animated Background
export default function HowItWorks() {
  return (
    <section className="grid md:grid-cols-4 gap-6 py-20">
      {[1,2,3,4].map((step) => (
        <div key={step} className="relative group rounded-2xl p-8 bg-gradient-to-br from-black via-zinc-900 to-black border border-amber-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.15),transparent_60%)] animate-pulse"></div>
          <div className="flex items-center justify-center h-40 text-amber-300 text-6xl opacity-30 group-hover:opacity-70 transition">
            ⚡
          </div>
        </div>
      ))}
    </section>
  )
}
