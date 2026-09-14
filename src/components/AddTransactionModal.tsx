import { useState, useEffect } from "react"
import type { Transaction, TransactionType } from "../App"
import { CATEGORIES, CATEGORY_ICONS } from "../utils"

interface FormData {
  title: string
  amount: string
  category: string
  type: TransactionType
  date: string
  notes: string
}

export default function AddTransactionModal({
  editing,
  onSave,
  onClose,
}: {
  editing: Transaction | null
  onSave: (t: Omit<Transaction, "id"> | Transaction) => void
  onClose: () => void
}) {
  const [form, setForm] = useState<FormData>({
    title: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        amount: editing.amount.toString(),
        category: editing.category,
        type: editing.type,
        date: editing.date,
        notes: editing.notes,
      })
    }
  }, [editing])

  const set = (k: keyof FormData) => (v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    if (!form.title || !form.amount) return
    onSave({
      title: form.title,
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
      notes: form.notes,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div
        className="rounded-t-[32px] overflow-hidden flex flex-col max-h-[92vh]"
        style={{ background: "#1E1E1E" }}
      >
        <div className="px-6 pt-4 pb-2 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="w-12 h-1 rounded-full mx-auto" style={{ background: "rgba(255,255,255,0.15)" }} />
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-white text-xl font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {editing ? "Edit Transaction" : "New Transaction"}
          </h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto scrollbar-hide px-6 pb-8 flex flex-col gap-5">
          <div className="flex gap-2 p-1 rounded-2xl" style={{ background: "#2A2A2A" }}>
            {(["expense", "income"] as const).map(type => (
              <button
                key={type}
                onClick={() => set("type")(type)}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm capitalize transition-all"
                style={{
                  background: form.type === type
                    ? type === "income" ? "#4CAF50" : "#F44336"
                    : "transparent",
                  color: form.type === type ? "white" : "#9E9E9E",
                }}
              >
                {type === "income" ? "↑ Income" : "↓ Expense"}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#9E9E9E] uppercase tracking-wider">Title</label>
            <input
              value={form.title}
              onChange={e => set("title")(e.target.value)}
              placeholder="e.g. Grocery Shopping"
              className="w-full px-4 py-3.5 rounded-2xl text-white text-sm outline-none border"
              style={{ background: "#2A2A2A", borderColor: "rgba(255,255,255,0.08)" }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#9E9E9E] uppercase tracking-wider">Amount (₱)</label>
            <input
              type="number"
              value={form.amount}
              onChange={e => set("amount")(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3.5 rounded-2xl text-white text-lg font-bold outline-none border"
              style={{ background: "#2A2A2A", borderColor: "rgba(255,255,255,0.08)", fontFamily: "'DM Mono', monospace" }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#9E9E9E] uppercase tracking-wider">Category</label>
            <div className="grid grid-cols-5 gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => set("category")(cat)}
                  className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-2xl transition-all"
                  style={{
                    background: form.category === cat ? "rgba(108,99,255,0.25)" : "#2A2A2A",
                    border: `1.5px solid ${form.category === cat ? "#6C63FF" : "transparent"}`,
                  }}
                >
                  <span className="text-lg">{CATEGORY_ICONS[cat]}</span>
                  <span className="text-xs text-center leading-tight" style={{ color: form.category === cat ? "#6C63FF" : "#9E9E9E" }}>
                    {cat.length > 6 ? cat.slice(0, 5) + "." : cat}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#9E9E9E] uppercase tracking-wider">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => set("date")(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl text-white text-sm outline-none border"
              style={{ background: "#2A2A2A", borderColor: "rgba(255,255,255,0.08)", colorScheme: "dark" }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#9E9E9E] uppercase tracking-wider">Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={e => set("notes")(e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
              className="w-full px-4 py-3.5 rounded-2xl text-white text-sm outline-none border resize-none"
              style={{ background: "#2A2A2A", borderColor: "rgba(255,255,255,0.08)" }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl text-white font-medium text-sm"
              style={{ background: "#2A2A2A" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!form.title || !form.amount}
              className="flex-1 py-4 rounded-2xl text-white font-semibold text-sm transition-all active:scale-[0.97] disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #6C63FF 0%, #8E44AD 100%)" }}
            >
              {editing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
