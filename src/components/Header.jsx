
// VERSION 1 - Icons 3D Minimal Glow Style
export default function HowItWorks() {
  return (
    <section className="grid md:grid-cols-4 gap-6 py-20">
      {[1,2,3,4].map((step) => (
        <div key={step} className="relative group rounded-2xl border border-amber-500/40 p-8 bg-black overflow-hidden hover:shadow-[0_0_40px_rgba(255,165,0,0.3)] transition-all duration-500">
          <span className="absolute text-[120px] font-bold text-amber-500/5 top-4 right-6">
            {step}
          </span>
          <div className="flex items-center justify-center h-40 text-amber-400 text-5xl">
            🍺
          </div>
        </div>
      ))}
    </section>
  )
}
