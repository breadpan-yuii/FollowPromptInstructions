import { useEffect, useState } from "react"
import Logo from "../components/Logo"

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 300); return 100 }
        return p + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #1a1040 0%, #121212 50%, #0d1a2e 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              backgroundColor: i % 3 === 0 ? "#6C63FF" : i % 3 === 1 ? "#00C2FF" : "#8E44AD",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
            }}
          />
        ))}
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #6C63FF, transparent)" }}
        />
        <div
          className="absolute bottom-32 right-8 w-48 h-48 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #00C2FF, transparent)" }}
        />
      </div>

      <div className="flex flex-col items-center gap-6 z-10">
        <div className="shadow-2xl" style={{ filter: "drop-shadow(0 8px 32px rgba(108,99,255,0.5))" }}>
          <Logo size={96} />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            WalletWise
          </h1>
          <p className="text-[#9E9E9E] text-sm mt-2 tracking-widest uppercase">
            Track Every Peso, Spend Smarter.
          </p>
        </div>
      </div>

      <div className="absolute bottom-24 w-56 z-10 flex flex-col items-center gap-3">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #6C63FF, #00C2FF)",
            }}
          />
        </div>
        <p className="text-[#9E9E9E] text-xs">Loading your wallet...</p>
      </div>
    </div>
  )
}
