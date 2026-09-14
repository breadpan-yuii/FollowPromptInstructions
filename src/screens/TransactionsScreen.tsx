import { useState } from "react"
import type { Transaction } from "../App"
import { CATEGORY_ICONS, CATEGORIES, formatAmount, formatDate } from "../utils"

export default function TransactionsScreen({
  transactions,
  onAdd,
  onEdit,
  onDelete,
}: {
  transactions: Transaction[]
  onAdd: () => void
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}) {
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "highest" | "lowest">("latest")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  let filtered = transactions.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === "all" || t.type === filterType
    const matchCat = filterCategory === "all" || t.category === filterCategory
    return matchSearch && matchType && matchCat
  })

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "latest") return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime()
    if (sortBy === "highest") return b.amount - a.amount
    if (sortBy === "lowest") return a.amount - b.amount
    return 0
  })

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 pt-14 pb-4" style={{ background: "#1E1E1E" }}>
        <h1 className="text-2xl font-bold text-white mb-4">Transactions</h1>
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl text-white text-sm outline-none"
            style={{ background: "#2A2A2A", border: "1px solid rgba(255,255,255,0.08)" }}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: showFilters ? "#6C63FF" : "rgba(108,99,255,0.2)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex gap-2">
              {(["all", "income", "expense"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all"
                  style={{
                    background: filterType === f ? "#6C63FF" : "rgba(108,99,255,0.1)",
                    color: filterType === f ? "white" : "#9E9E9E",
                    border: `1px solid ${filterType === f ? "#6C63FF" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["latest", "oldest", "highest", "lowest"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium capitalize"
                  style={{
                    background: sortBy === s ? "rgba(0,194,255,0.2)" : "rgba(255,255,255,0.06)",
                    color: sortBy === s ? "#00C2FF" : "#9E9E9E",
                    border: `1px solid ${sortBy === s ? "rgba(0,194,255,0.4)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", ...CATEGORIES].map(c => (
                <button
                  key={c}
                  onClick={() => setFilterCategory(c)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium"
                  style={{
                    background: filterCategory === c ? "rgba(142,68,173,0.25)" : "rgba(255,255,255,0.06)",
                    color: filterCategory === c ? "#C39BD3" : "#9E9E9E",
                    border: `1px solid ${filterCategory === c ? "rgba(142,68,173,0.4)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  {c === "all" ? "All Categories" : c}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 pb-32 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <span className="text-5xl">🔍</span>
            <p className="text-white font-medium">No transactions found</p>
            <p className="text-[#9E9E9E] text-sm text-center">Try adjusting your search or filters</p>
          </div>
        ) : (
          filtered.map(t => (
            <SwipeableTransactionCard
              key={t.id}
              t={t}
              onEdit={() => onEdit(t)}
              onDelete={() => setDeleteConfirm(t.id)}
            />
          ))
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-sm rounded-3xl p-6 flex flex-col gap-4" style={{ background: "#1E1E1E" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto" style={{ background: "rgba(244,67,54,0.15)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F44336" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold text-lg">Delete Transaction?</h3>
              <p className="text-[#9E9E9E] text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3.5 rounded-2xl text-white font-medium text-sm"
                style={{ background: "#2A2A2A" }}
              >
                Cancel
              </button>
              <button
                onClick={() => { onDelete(deleteConfirm); setDeleteConfirm(null) }}
                className="flex-1 py-3.5 rounded-2xl text-white font-semibold text-sm"
                style={{ background: "#F44336" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SwipeableTransactionCard({
  t,
  onEdit,
  onDelete,
}: {
  t: Transaction
  onEdit: () => void
  onDelete: () => void
}) {
  const isIncome = t.type === "income"
  const [showActions, setShowActions] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {showActions && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center gap-2 pr-3" style={{ background: "#2A2A2A" }}>
          <button
            onClick={() => { onEdit(); setShowActions(false) }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(108,99,255,0.2)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => { onDelete(); setShowActions(false) }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(244,67,54,0.2)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F44336" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
            </svg>
          </button>
        </div>
      )}
      <button
        onClick={() => setShowActions(!showActions)}
        className="flex items-center gap-3 w-full text-left px-4 py-3.5 transition-all active:scale-[0.98] relative z-10"
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
          {t.notes && <p className="text-[#9E9E9E] text-xs truncate mt-0.5 italic">{t.notes}</p>}
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="font-semibold text-sm" style={{ color: isIncome ? "#4CAF50" : "#F44336" }}>
            {isIncome ? "+" : "-"}₱{formatAmount(t.amount)}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: isIncome ? "rgba(76,175,80,0.15)" : "rgba(244,67,54,0.15)",
              color: isIncome ? "#4CAF50" : "#F44336",
            }}
          >
            {t.type}
          </span>
        </div>
      </button>
    </div>
  )
}
