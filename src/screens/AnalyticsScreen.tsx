import type { Transaction } from "../App"
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../utils"
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts"

export default function AnalyticsScreen({
  transactions,
  totalIncome,
  totalExpenses,
  balance,
}: {
  transactions: Transaction[]
  totalIncome: number
  totalExpenses: number
  balance: number
}) {
  const expenses = transactions.filter(t => t.type === "expense")

  const byCategory = Object.entries(
    expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount
      return acc
    }, {} as Record<string, number>)
  )
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }))

  const barData = [
    { label: "Income", amount: totalIncome, fill: "#4CAF50" },
    { label: "Expenses", amount: totalExpenses, fill: "#F44336" },
    { label: "Savings", amount: Math.max(0, balance), fill: "#6C63FF" },
  ]

  const highest = byCategory[0]
  const savings = balance
  const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0

  return (
    <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide pb-32">
      <div className="px-6 pt-14 pb-6" style={{ background: "#1E1E1E" }}>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-[#9E9E9E] text-sm mt-1">August 2026</p>
      </div>

      <div className="px-6 mt-4 grid grid-cols-2 gap-3">
        {[
          { label: "Total Income", value: `₱${(totalIncome / 1000).toFixed(1)}k`, color: "#4CAF50", icon: "💰" },
          { label: "Total Expenses", value: `₱${(totalExpenses / 1000).toFixed(1)}k`, color: "#F44336", icon: "💸" },
          { label: "Net Savings", value: `₱${(savings / 1000).toFixed(1)}k`, color: "#6C63FF", icon: "🏦" },
          { label: "Savings Rate", value: `${savingsRate.toFixed(0)}%`, color: "#00C2FF", icon: "📈" },
        ].map(card => (
          <div
            key={card.label}
            className="rounded-2xl p-4"
            style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{card.icon}</span>
              <p className="text-[#9E9E9E] text-xs">{card.label}</p>
            </div>
            <p className="text-xl font-bold" style={{ color: card.color, fontFamily: "'DM Sans', sans-serif" }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {byCategory.length > 0 && (
        <div className="px-6 mt-6">
          <div
            className="rounded-3xl p-5"
            style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <h3 className="text-white font-bold text-base mb-4">Expense Breakdown</h3>
            <div className="flex items-center gap-4">
              <div className="w-36 h-36 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={byCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={68}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {byCategory.map((entry) => (
                        <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] ?? "#9E9E9E"} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#2A2A2A", border: "none", borderRadius: 12, color: "white", fontSize: 12 }}
                      formatter={(v) => [`₱${Number(v).toLocaleString()}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                {byCategory.slice(0, 5).map(cat => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: CATEGORY_COLORS[cat.name] ?? "#9E9E9E" }}
                    />
                    <span className="text-[#9E9E9E] text-xs truncate flex-1">{cat.name}</span>
                    <span className="text-white text-xs font-medium flex-shrink-0">
                      ₱{(cat.value / 1000).toFixed(1)}k
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-6 mt-4">
        <div
          className="rounded-3xl p-5"
          style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h3 className="text-white font-bold text-base mb-4">Income vs Expenses</h3>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#9E9E9E", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9E9E9E", fontSize: 10 }} tickFormatter={v => `₱${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#2A2A2A", border: "none", borderRadius: 12, color: "white", fontSize: 12 }}
                  formatter={(v) => [`₱${Number(v).toLocaleString()}`, ""]}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="px-6 mt-4">
        <div
          className="rounded-3xl p-5"
          style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h3 className="text-white font-bold text-base mb-4">Spending by Category</h3>
          {byCategory.length === 0 ? (
            <p className="text-[#9E9E9E] text-sm text-center py-4">No expense data yet</p>
          ) : (
            <div className="flex flex-col gap-3">
              {byCategory.map(cat => {
                const pct = totalExpenses > 0 ? (cat.value / totalExpenses) * 100 : 0
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{CATEGORY_ICONS[cat.name] ?? "💳"}</span>
                        <span className="text-white text-sm">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#9E9E9E] text-xs">{pct.toFixed(0)}%</span>
                        <span className="text-white text-sm font-medium">₱{cat.value.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: CATEGORY_COLORS[cat.name] ?? "#9E9E9E" }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {highest && (
        <div className="px-6 mt-4">
          <div
            className="rounded-3xl p-5 flex items-center gap-4"
            style={{
              background: "linear-gradient(135deg, rgba(244,67,54,0.15) 0%, rgba(30,30,30,1) 60%)",
              border: "1px solid rgba(244,67,54,0.2)",
            }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "rgba(244,67,54,0.15)" }}>
              {CATEGORY_ICONS[highest.name] ?? "💳"}
            </div>
            <div>
              <p className="text-[#9E9E9E] text-xs">Highest Expense Category</p>
              <p className="text-white font-bold text-base">{highest.name}</p>
              <p className="font-semibold text-sm" style={{ color: "#F44336" }}>₱{highest.value.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
