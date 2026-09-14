import React from "react"

export default function BottomNav({
  active,
  onChange,
  onFab,
}: {
  active: "home" | "transactions" | "analytics" | "profile"
  onChange: (tab: "home" | "transactions" | "analytics" | "profile") => void
  onFab: () => void
}) {
  const tabs = [
    {
      id: "home" as const,
      label: "Home",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#6C63FF" : "none"} stroke={active ? "#6C63FF" : "#9E9E9E"} strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: "transactions" as const,
      label: "Txns",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#6C63FF" : "#9E9E9E"} strokeWidth="2">
          <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="3" strokeLinecap="round" />
          <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="3" strokeLinecap="round" />
          <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "analytics" as const,
      label: "Analytics",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#6C63FF" : "#9E9E9E"} strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      ),
    },
    {
      id: "profile" as const,
      label: "Profile",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "rgba(108,99,255,0.2)" : "none"} stroke={active ? "#6C63FF" : "#9E9E9E"} strokeWidth="2">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ]

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40"
      style={{ background: "#1E1E1E", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-around px-2 pb-safe">
        {tabs.slice(0, 2).map(tab => (
          <TabBtn key={tab.id} tab={tab} active={active} onChange={onChange} />
        ))}

        <div className="relative flex flex-col items-center -mt-7">
          <button
            onClick={onFab}
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-transform active:scale-95"
            style={{ background: "linear-gradient(135deg, #6C63FF, #8E44AD)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
          <span className="text-[#9E9E9E] text-xs mt-1">Add</span>
        </div>

        {tabs.slice(2).map(tab => (
          <TabBtn key={tab.id} tab={tab} active={active} onChange={onChange} />
        ))}
      </div>
    </div>
  )
}

function TabBtn({
  tab,
  active,
  onChange,
}: {
  tab: { id: "home" | "transactions" | "analytics" | "profile"; label: string; icon: (a: boolean) => React.ReactElement }
  active: string
  onChange: (tab: "home" | "transactions" | "analytics" | "profile") => void
}) {
  const isActive = active === tab.id
  return (
    <button
      onClick={() => onChange(tab.id)}
      className="flex flex-col items-center gap-1 py-3 px-4 transition-all"
    >
      {tab.icon(isActive)}
      <span className="text-xs" style={{ color: isActive ? "#6C63FF" : "#9E9E9E", fontWeight: isActive ? 600 : 400 }}>
        {tab.label}
      </span>
      {isActive && (
        <div className="w-1 h-1 rounded-full" style={{ background: "#6C63FF" }} />
      )}
    </button>
  )
}
