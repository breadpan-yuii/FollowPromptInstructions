import type { Transaction } from "../App"
import { useState } from "react"

export default function ProfileScreen({
  transactions,
  totalIncome,
  totalExpenses,
  balance,
  onLogout,
}: {
  transactions: Transaction[]
  totalIncome: number
  totalExpenses: number
  balance: number
  onLogout: () => void
}) {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [currency, setCurrency] = useState("PHP (₱)")
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const settings = [
    {
      section: "Preferences",
      items: [
        {
          icon: "🌙",
          label: "Dark Mode",
          control: (
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-11 h-6 rounded-full relative transition-all"
              style={{ background: darkMode ? "#6C63FF" : "#2A2A2A" }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                style={{ left: darkMode ? "calc(100% - 22px)" : "2px" }}
              />
            </button>
          ),
        },
        {
          icon: "🔔",
          label: "Notifications",
          control: (
            <button
              onClick={() => setNotifications(!notifications)}
              className="w-11 h-6 rounded-full relative transition-all"
              style={{ background: notifications ? "#6C63FF" : "#2A2A2A" }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                style={{ left: notifications ? "calc(100% - 22px)" : "2px" }}
              />
            </button>
          ),
        },
        {
          icon: "💱",
          label: "Currency",
          control: <span className="text-[#9E9E9E] text-sm">{currency}</span>,
          onPress: () => setCurrency(currency === "PHP (₱)" ? "USD ($)" : "PHP (₱)"),
        },
      ],
    },
    {
      section: "Account",
      items: [
        { icon: "🔐", label: "Change Password", control: <ChevronIcon />, onPress: () => {} },
        { icon: "🌍", label: "Language", control: <span className="text-[#9E9E9E] text-sm">English</span>, onPress: () => {} },
        { icon: "📄", label: "Privacy Policy", control: <ChevronIcon />, onPress: () => {} },
        { icon: "ℹ️", label: "About WalletWise", control: <ChevronIcon />, onPress: () => {} },
      ],
    },
  ]

  return (
    <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide pb-32">
      <div
        className="px-6 pt-14 pb-8 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1a1040 0%, #1E1E1E 100%)" }}
      >
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #6C63FF, transparent)" }} />
        <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>

        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-bold text-white shadow-xl"
            style={{ background: "linear-gradient(135deg, #6C63FF, #8E44AD)" }}
          >
            J
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">Juan dela Cruz</h2>
            <p className="text-[#9E9E9E] text-sm">juan@example.com</p>
            <div className="mt-2">
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: "rgba(108,99,255,0.2)", color: "#6C63FF" }}
              >
                Premium Member
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Balance", value: `₱${(balance / 1000).toFixed(1)}k`, color: "#6C63FF" },
            { label: "Txns", value: transactions.length, color: "#00C2FF" },
            { label: "Income", value: `₱${(totalIncome / 1000).toFixed(0)}k`, color: "#4CAF50" },
            { label: "Spent", value: `₱${(totalExpenses / 1000).toFixed(0)}k`, color: "#F44336" },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-2xl py-3 px-2 flex flex-col items-center gap-1"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <p className="font-bold text-sm" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[#9E9E9E] text-xs text-center">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 flex gap-3">
        <button
          className="flex-1 py-3 rounded-2xl text-white font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
          style={{ background: "rgba(108,99,255,0.2)", border: "1px solid rgba(108,99,255,0.3)" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span style={{ color: "#6C63FF" }}>Edit Profile</span>
        </button>
      </div>

      <div className="px-6 flex flex-col gap-5">
        {settings.map(section => (
          <div key={section.section}>
            <p className="text-[#9E9E9E] text-xs font-semibold uppercase tracking-wider mb-3">{section.section}</p>
            <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              {section.items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={item.onPress}
                  className="flex items-center gap-3 px-4 py-4 w-full text-left transition-all"
                  style={{
                    background: "#1E1E1E",
                    borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white text-sm flex-1">{item.label}</span>
                  {item.control}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
          style={{ background: "rgba(244,67,54,0.1)", border: "1px solid rgba(244,67,54,0.2)", color: "#F44336" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-sm rounded-3xl p-6 flex flex-col gap-4" style={{ background: "#1E1E1E" }}>
            <h3 className="text-white font-bold text-lg text-center">Log Out?</h3>
            <p className="text-[#9E9E9E] text-sm text-center">Are you sure you want to log out of WalletWise?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3.5 rounded-2xl text-white font-medium text-sm"
                style={{ background: "#2A2A2A" }}
              >
                Cancel
              </button>
              <button
                onClick={onLogout}
                className="flex-1 py-3.5 rounded-2xl text-white font-semibold text-sm"
                style={{ background: "#F44336" }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
