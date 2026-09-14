import { useState } from "react"
import SplashScreen from "./screens/SplashScreen"
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import HomeScreen from "./screens/HomeScreen"
import TransactionsScreen from "./screens/TransactionsScreen"
import AnalyticsScreen from "./screens/AnalyticsScreen"
import ProfileScreen from "./screens/ProfileScreen"
import BottomNav from "./components/BottomNav"
import AddTransactionModal from "./components/AddTransactionModal"

export type Screen = "splash" | "login" | "signup" | "home" | "transactions" | "analytics" | "profile"

export type TransactionType = "income" | "expense"

export interface Transaction {
  id: string
  title: string
  amount: number
  category: string
  type: TransactionType
  date: string
  notes: string
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", title: "Monthly Salary", amount: 45000, category: "Salary", type: "income", date: "2026-08-01", notes: "August payroll" },
  { id: "2", title: "Grocery Shopping", amount: 2340, category: "Food", type: "expense", date: "2026-08-02", notes: "SM Supermarket" },
  { id: "3", title: "Grab Ride", amount: 180, category: "Transportation", type: "expense", date: "2026-08-03", notes: "" },
  { id: "4", title: "Netflix Subscription", amount: 549, category: "Entertainment", type: "expense", date: "2026-08-03", notes: "" },
  { id: "5", title: "Electric Bill", amount: 3200, category: "Bills", type: "expense", date: "2026-08-04", notes: "Meralco" },
  { id: "6", title: "Freelance Project", amount: 12000, category: "Salary", type: "income", date: "2026-08-04", notes: "UI Design gig" },
  { id: "7", title: "Jollibee", amount: 320, category: "Food", type: "expense", date: "2026-08-05", notes: "" },
  { id: "8", title: "Medicine", amount: 850, category: "Healthcare", type: "expense", date: "2026-08-05", notes: "Flu meds" },
]

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [activeTab, setActiveTab] = useState<"home" | "transactions" | "analytics" | "profile">("home")
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const mainScreens: Screen[] = ["home", "transactions", "analytics", "profile"]
  const isMainScreen = mainScreens.includes(screen)

  const handleTabChange = (tab: "home" | "transactions" | "analytics" | "profile") => {
    setActiveTab(tab)
    setScreen(tab)
  }

  const handleSplashDone = () => setScreen("login")
  const handleLogin = () => { setScreen("home"); setActiveTab("home") }
  const handleSignUp = () => { setScreen("home"); setActiveTab("home") }

  const addTransaction = (t: Omit<Transaction, "id">) => {
    const newT = { ...t, id: Date.now().toString() }
    setTransactions(prev => [newT, ...prev])
  }

  const updateTransaction = (t: Transaction) => {
    setTransactions(prev => prev.map(x => x.id === t.id ? t : x))
  }

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(x => x.id !== id))
  }

  const openEdit = (t: Transaction) => {
    setEditingTransaction(t)
    setShowAddModal(true)
  }

  const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0)
  const balance = totalIncome - totalExpenses

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#0A0A0A]">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#121212] overflow-hidden flex flex-col">
        {screen === "splash" && <SplashScreen onDone={handleSplashDone} />}
        {screen === "login" && <LoginScreen onLogin={handleLogin} onSignUp={() => setScreen("signup")} />}
        {screen === "signup" && <SignUpScreen onSignUp={handleSignUp} onBack={() => setScreen("login")} />}
        {screen === "home" && (
          <HomeScreen
            transactions={transactions}
            balance={balance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            onAddTransaction={() => { setEditingTransaction(null); setShowAddModal(true) }}
            onEditTransaction={openEdit}
          />
        )}
        {screen === "transactions" && (
          <TransactionsScreen
            transactions={transactions}
            onAdd={() => { setEditingTransaction(null); setShowAddModal(true) }}
            onEdit={openEdit}
            onDelete={deleteTransaction}
          />
        )}
        {screen === "analytics" && (
          <AnalyticsScreen
            transactions={transactions}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
          />
        )}
        {screen === "profile" && (
          <ProfileScreen
            transactions={transactions}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
            onLogout={() => setScreen("login")}
          />
        )}

        {isMainScreen && (
          <BottomNav
            active={activeTab}
            onChange={handleTabChange}
            onFab={() => { setEditingTransaction(null); setShowAddModal(true) }}
          />
        )}

        {showAddModal && (
          <AddTransactionModal
            editing={editingTransaction}
            onSave={(t) => {
              if (editingTransaction) updateTransaction({ ...t, id: editingTransaction.id } as Transaction)
              else addTransaction(t as Omit<Transaction, "id">)
              setShowAddModal(false)
              setEditingTransaction(null)
            }}
            onClose={() => { setShowAddModal(false); setEditingTransaction(null) }}
          />
        )}
      </div>
    </div>
  )
}
