export const CATEGORY_ICONS: Record<string, string> = {
  Food: "🍔",
  Transportation: "🚗",
  Bills: "💡",
  Shopping: "🛍️",
  Entertainment: "🎮",
  Salary: "💼",
  Savings: "🏦",
  Healthcare: "💊",
  Education: "📚",
  Others: "💳",
}

export const CATEGORIES = [
  "Food",
  "Transportation",
  "Bills",
  "Shopping",
  "Entertainment",
  "Salary",
  "Savings",
  "Healthcare",
  "Education",
  "Others",
]

export const CATEGORY_COLORS: Record<string, string> = {
  Food: "#FF6B6B",
  Transportation: "#4ECDC4",
  Bills: "#45B7D1",
  Shopping: "#96CEB4",
  Entertainment: "#FFEAA7",
  Salary: "#4CAF50",
  Savings: "#6C63FF",
  Healthcare: "#FF7675",
  Education: "#74B9FF",
  Others: "#9E9E9E",
}

export function formatAmount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return (n / 1000).toFixed(1) + "k"
  return n.toLocaleString()
}

export function formatDate(d: string): string {
  const date = new Date(d)
  return date.toLocaleDateString("en-PH", { month: "short", day: "numeric" })
}
