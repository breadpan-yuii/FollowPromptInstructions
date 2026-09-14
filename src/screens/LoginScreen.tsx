import { useState } from "react"
import Logo from "../components/Logo"

export default function LoginScreen({
  onLogin,
  onSignUp,
}: {
  onLogin: () => void
  onSignUp: () => void
}) {
  const [email, setEmail] = useState("juan@example.com")
  const [password, setPassword] = useState("password123")
  const [remember, setRemember] = useState(false)
  const [showPass, setShowPass] = useState(false)

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ background: "#121212" }}>
      <div
        className="h-56 flex flex-col justify-end px-6 pb-8 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1a1040 0%, #1E1E1E 100%)" }}
      >
        <div
          className="absolute top-8 right-8 w-32 h-32 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #6C63FF, transparent)" }}
        />
        <div className="mb-4" style={{ filter: "drop-shadow(0 4px 16px rgba(108,99,255,0.4))" }}>
          <Logo size={56} />
        </div>
        <h1 className="text-3xl font-bold text-white">Welcome back</h1>
        <p className="text-[#9E9E9E] text-sm mt-1">Sign in to your WalletWise account</p>
      </div>

      <div className="flex-1 px-6 py-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#9E9E9E] uppercase tracking-wider">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl text-white text-sm outline-none border transition-all"
            style={{
              background: "#1E1E1E",
              borderColor: "rgba(255,255,255,0.08)",
            }}
            placeholder="you@email.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#9E9E9E] uppercase tracking-wider">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl text-white text-sm outline-none border transition-all pr-12"
              style={{ background: "#1E1E1E", borderColor: "rgba(255,255,255,0.08)" }}
              placeholder="••••••••"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9E9E9E]"
            >
              {showPass ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setRemember(!remember)}
            className="flex items-center gap-2 text-sm text-[#9E9E9E]"
          >
            <div
              className="w-5 h-5 rounded flex items-center justify-center border transition-all"
              style={{
                background: remember ? "#6C63FF" : "transparent",
                borderColor: remember ? "#6C63FF" : "rgba(255,255,255,0.2)",
              }}
            >
              {remember && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            Remember me
          </button>
          <button className="text-sm font-medium" style={{ color: "#6C63FF" }}>
            Forgot password?
          </button>
        </div>

        <button
          onClick={onLogin}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base mt-2 transition-transform active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #6C63FF 0%, #8E44AD 100%)" }}
        >
          Sign In
        </button>

        <button
          onClick={onLogin}
          className="w-full py-4 rounded-2xl text-[#9E9E9E] font-medium text-base border transition-all active:scale-[0.98]"
          style={{ borderColor: "rgba(255,255,255,0.12)", background: "transparent" }}
        >
          Continue as Guest
        </button>

        <div className="flex items-center justify-center gap-2 mt-auto pt-4">
          <span className="text-[#9E9E9E] text-sm">{"Don't have an account?"}</span>
          <button onClick={onSignUp} className="text-sm font-semibold" style={{ color: "#6C63FF" }}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
