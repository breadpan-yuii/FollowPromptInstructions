import type { Transaction } from "../App"
import { CATEGORY_ICONS, formatAmount, formatDate } from "../utils"
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts"

const CHART_DATA = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 3400 },
  { day: "Wed", amount: 800 },
  { day: "Thu", amount: 5100 },
  { day: "Fri", amount: 2200 },
  { day: "Sat", amount: 4800 },
  { day: "Sun", amount: 1600 },
]

export default function HomeScreen({
  transactions,
  balance,
  totalIncome,
  totalExpenses,
  onAddTransaction,
  onEditTransaction,
}: {
  transactions: Transaction[]
  balance: number
  totalIncome: number
  totalExpenses: number
  onAddTransaction: () => void
  onEditTransaction: (t: Transaction) => void
}) {
  const recent = transactions.slice(0, 5)

  return (
    <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide pb-32">
      <div
        className="px-6 pt-14 pb-8 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1a1040 0%, #1E1E1E 100%)" }}
      >
        <div
          className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #6C63FF, transparent)" }}
        />
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#9E9E9E] text-sm">Good morning,</p>
            <h2 className="text-white text-xl font-bold">Juan dela Cruz 👋</h2>
          </div>
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
            style={{ background: "linear-gradient(135deg, #6C63FF, #8E44AD)" }}
          >
            J
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-[#9E9E9E] text-sm mb-1">Total Balance</p>
          <h1 className="text-5xl font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            ₱{balance.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Income", value: totalIncome, color: "#4CAF50", icon: "↑" },
            { label: "Expenses", value: totalExpenses, color: "#F44336", icon: "↓" },
            { label: "Remaining", value: balance, color: "#6C63FF", icon: "=" },
          ].map(item => (
            <div
              key={item.label}
              className="rounded-2xl p-3 flex flex-col items-center gap-1"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <span className="text-lg" style={{ color: item.color }}>{item.icon}</span>
              <p className="text-white font-semibold text-sm">
                ₱{(item.value / 1000).toFixed(1)}k
              </p>
              <p className="text-[#9E9E9E] text-xs">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-base">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onAddTransaction}
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all active:scale-[0.97]"
            style={{ background: "linear-gradient(135deg, rgba(76,175,80,0.2), rgba(76,175,80,0.05))", border: "1px solid rgba(76,175,80,0.3)" }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(76,175,80,0.2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-white font-medium text-sm">Add Income</span>
          </button>
          <button
            onClick={onAddTransaction}
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all active:scale-[0.97]"
            style={{ background: "linear-gradient(135deg, rgba(244,67,54,0.2), rgba(244,67,54,0.05))", border: "1px solid rgba(244,67,54,0.3)" }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(244,67,54,0.2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F44336" strokeWidth="2.5">
                <path d="M5 12h14" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-white font-medium text-sm">Add Expense</span>
          </button>
        </div>
      </div>

      <div className="px-6 mt-6">
        <div
          className="rounded-3xl p-5"
          style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-base">Weekly Spending</h3>
            <span className="text-xs text-[#9E9E9E]">This week</span>
          </div>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9E9E9E", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: "#2A2A2A", border: "none", borderRadius: 12, color: "white", fontSize: 12 }}
                  formatter={(v) => [`₱${Number(v).toLocaleString()}`, "Spent"]}
                />
                <Area type="monotone" dataKey="amount" stroke="#6C63FF" strokeWidth={2} fill="url(#spendGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-base">Recent Transactions</h3>
          <span className="text-xs font-medium" style={{ color: "#6C63FF" }}>{recent.length} of {transactions.length}</span>
        </div>
        <div className="flex flex-col gap-3">
          {recent.length === 0 ? (
            <div className="flex flex-col items-center py-10 gap-2">
              <span className="text-4xl">📭</span>
              <p className="text-[#9E9E9E] text-sm">No transactions yet</p>
            </div>
          ) : (
            recent.map(t => (
              <TransactionRow key={t.id} t={t} onEdit={() => onEditTransaction(t)} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function TransactionRow({ t, onEdit }: { t: Transaction; onEdit: () => void }) {
  const isIncome = t.type === "income"
  return (
    <button
      onClick={onEdit}
      className="flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-2xl transition-all active:scale-[0.98]"
      style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: isIncome ? "rgba(76,175,80,0.15)" : "rgba(244,67,54,0.15)" }}
      >
        {CATEGORY_ICONS[t.category] ?? "💳"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm truncate">{t.title}</p>
        <p className="text-[#9E9E9E] text-xs">{t.category} · {formatDate(t.date)}</p>
      </div>
      <span
        className="font-semibold text-sm flex-shrink-0"
        style={{ color: isIncome ? "#4CAF50" : "#F44336" }}
      >
        {isIncome ? "+" : "-"}₱{formatAmount(t.amount)}
      </span>
    </button>
  )
}
