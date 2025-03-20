import { CreditCard, ArrowUpRight, ArrowDownRight, DollarSign, Wallet, Repeat, ChevronRight, Plus } from "lucide-react"
import MyFloatingDockCeo from "../Styles/MyFloatingDock-Ceo"

export default function MyBalance() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Floating Dock */}
      <div className="sticky top-0 z-40 flex">
        <MyFloatingDockCeo />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">My Balance</h1>
          <p className="text-gray-500 font-light mt-1">Track and manage your finances</p>
        </div>

        {/* Total Balance Card */}
        <div className="bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA] rounded-2xl p-6 text-white mb-8 shadow-sm">
          <p className="text-white/90 text-sm font-light">Total Balance</p>
          <h2 className="text-4xl font-medium mt-1">$24,680.52</h2>
          <div className="flex items-center mt-2">
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-light">+3.2% from last month</span>
          </div>
        </div>

        {/* Income/Expense Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#E8F8EF] rounded-full flex items-center justify-center text-[#30D158] mr-3">
                <ArrowDownRight className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-light">Service Income</p>
                <h3 className="text-2xl font-medium text-gray-800">$5,723.40</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#FFE5E7] rounded-full flex items-center justify-center text-[#FF453A] mr-3">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-light">Service Expenses</p>
                <h3 className="text-2xl font-medium text-gray-800">$2,184.75</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Accounts List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium text-gray-800">My Accounts</h3>
            <button className="flex items-center justify-center w-8 h-8 bg-[#F2F2F7] rounded-full text-[#0A84FF]">
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <AccountCard
              name="Main Checking"
              icon={<Wallet className="h-5 w-5" />}
              balance="$8,245.30"
              accountNumber="**** 4582"
              color="#0A84FF"
            />

            <AccountCard
              name="Savings Account"
              icon={<DollarSign className="h-5 w-5" />}
              balance="$12,680.22"
              accountNumber="**** 7891"
              color="#5AC8FA"
            />

            <AccountCard
              name="Credit Card"
              icon={<CreditCard className="h-5 w-5" />}
              balance="-$450.00"
              accountNumber="**** 3456"
              color="#FF453A"
            />

            <AccountCard
              name="Investment Account"
              icon={<Repeat className="h-5 w-5" />}
              balance="$3,755.00"
              accountNumber="**** 9012"
              color="#30B0C7"
            />
          </div>
        </div>

        {/* Service Transactions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium text-gray-800">Service Transactions</h3>
            <button className="text-[#0A84FF] text-sm font-medium flex items-center group">
              View all
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="space-y-4">
            <TransactionRow
              merchant="Cleaning Service #1082"
              category="Service Income"
              date="Today"
              amount="+$120.00"
              type="income"
            />

            <TransactionRow
              merchant="Cleaning Supplies"
              category="Service Expense"
              date="Today"
              amount="-$45.35"
              type="expense"
            />

            <TransactionRow
              merchant="Plumbing Service #1081"
              category="Service Income"
              date="Yesterday"
              amount="+$185.50"
              type="income"
            />

            <TransactionRow
              merchant="Plumbing Parts"
              category="Service Expense"
              date="Yesterday"
              amount="-$72.25"
              type="expense"
            />

            <TransactionRow
              merchant="Electrical Service #1080"
              category="Service Income"
              date="Mar 15"
              amount="+$210.00"
              type="income"
            />

            <TransactionRow
              merchant="Contractor Payment"
              category="Service Expense"
              date="Mar 15"
              amount="-$125.00"
              type="expense"
            />

            <TransactionRow
              merchant="Service Marketing"
              category="Advertising Expense"
              date="Mar 14"
              amount="-$50.00"
              type="expense"
            />

            <TransactionRow
              merchant="Gardening Service #1079"
              category="Service Income"
              date="Mar 12"
              amount="+$95.00"
              type="income"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function AccountCard({ name, icon, balance, accountNumber, color }: any) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-[#F2F2F7] transition-colors">
      <div className="flex items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${color}15` }}
        >
          <div className="text-[#0A84FF]" style={{ color }}>
            {icon}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500 font-light">{accountNumber}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-lg font-medium ${balance.startsWith("-") ? "text-[#FF453A]" : "text-gray-800"}`}>
          {balance}
        </p>
      </div>
    </div>
  )
}

function TransactionRow({ merchant, category, date, amount, type }: any) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            type === "income" ? "bg-[#E8F8EF] text-[#30D158]" : "bg-[#FFE5E7] text-[#FF453A]"
          }`}
        >
          {type === "income" ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{merchant}</p>
          <p className="text-xs text-gray-500 font-light">{category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-medium ${type === "income" ? "text-[#30D158]" : "text-[#FF453A]"}`}>{amount}</p>
        <p className="text-xs text-gray-500 font-light">{date}</p>
      </div>
    </div>
  )
}

