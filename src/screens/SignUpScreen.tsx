import { useState } from "react"

export default function SignUpScreen({
  onSignUp,
  onBack,
}: {
  onSignUp: () => void
  onBack: () => void
}) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-y-auto" style={{ background: "#121212" }}>
      <div
        className="h-44 flex flex-col justify-end px-6 pb-6 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1a1040 0%, #1E1E1E 100%)" }}
      >
        <button onClick={onBack} className="absolute top-12 left-6 text-white/70">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="text-[#9E9E9E] text-sm mt-1">Join WalletWise today</p>
      </div>

      <div className="flex-1 px-6 py-8 flex flex-col gap-4">
        {[
          { label: "Full Name", key: "name", placeholder: "Juan dela Cruz", type: "text" },
          { label: "Username", key: "username", placeholder: "@juandc", type: "text" },
          { label: "Email", key: "email", placeholder: "you@email.com", type: "email" },
          { label: "Password", key: "password", placeholder: "••••••••", type: "password" },
          { label: "Confirm Password", key: "confirm", placeholder: "••••••••", type: "password" },
        ].map(field => (
          <div key={field.key} className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#9E9E9E] uppercase tracking-wider">
              {field.label}
            </label>
            <input
              type={field.type}
              value={form[field.key as keyof typeof form]}
              onChange={set(field.key)}
              placeholder={field.placeholder}
              className="w-full px-4 py-3.5 rounded-2xl text-white text-sm outline-none border"
              style={{ background: "#1E1E1E", borderColor: "rgba(255,255,255,0.08)" }}
            />
          </div>
        ))}

        <button
          onClick={onSignUp}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base mt-3 transition-transform active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #6C63FF 0%, #8E44AD 100%)" }}
        >
          Create Account
        </button>

        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-[#9E9E9E] text-sm">Already have an account?</span>
          <button onClick={onBack} className="text-sm font-semibold" style={{ color: "#6C63FF" }}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
