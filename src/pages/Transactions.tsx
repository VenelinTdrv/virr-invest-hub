import { motion } from "framer-motion";
import { Search, Filter, ChevronRight, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/mobile/BottomNav";
import { useState } from "react";

interface Transaction {
  id: number;
  date: string;
  status: string;
  reason: string;
  recipient: string;
  amount: string;
  amountBgn: string;
  type: "income" | "expense";
  balance: string;
}

const mockTransactions: Transaction[] = [
  { id: 77886, date: "2026-03-07 21:10", status: "Одобрена", reason: "Кешбек", recipient: "Вирр Р2Р ООД", amount: "€0,67", amountBgn: "1,31 лв.", type: "income", balance: "€40,57" },
  { id: 77882, date: "2026-03-07 21:10", status: "Одобрена", reason: "Кешбек", recipient: "Вирр Р2Р ООД", amount: "€4,61", amountBgn: "9,01 лв.", type: "income", balance: "€39,9" },
  { id: 77878, date: "2026-03-07 21:10", status: "Одобрена", reason: "Кешбек", recipient: "Вирр Р2Р ООД", amount: "€3,79", amountBgn: "7,41 лв.", type: "income", balance: "€35,29" },
  { id: 77874, date: "2026-03-07 21:10", status: "Одобрена", reason: "Кешбек", recipient: "Вирр Р2Р ООД", amount: "€4,51", amountBgn: "8,81 лв.", type: "income", balance: "€31,5" },
  { id: 77870, date: "2026-03-07 21:10", status: "Одобрена", reason: "Кешбек", recipient: "Вирр Р2Р ООД", amount: "€5,22", amountBgn: "10,20 лв.", type: "income", balance: "€26,99" },
  { id: 77866, date: "2026-03-07 21:10", status: "Одобрена", reason: "Кешбек", recipient: "Вирр Р2Р ООД", amount: "€2,52", amountBgn: "4,93 лв.", type: "income", balance: "€21,78" },
  { id: 77862, date: "2026-03-07 21:10", status: "Одобрена", reason: "Кешбек", recipient: "Вирр Р2Р ООД", amount: "€0,79", amountBgn: "1,54 лв.", type: "income", balance: "€19,26" },
  { id: 77830, date: "2026-03-07 09:12", status: "Одобрена", reason: "Инвестиция - първичен пазар", recipient: "ТЕРУ КРЕДИТ ЕООД", amount: "€21,79", amountBgn: "42,62 лв.", type: "expense", balance: "€0,16" },
  { id: 77828, date: "2026-03-07 09:10", status: "Одобрена", reason: "Инвестиция - първичен пазар", recipient: "ВИКТОРИЯ 111 ЕООД", amount: "€12,91", amountBgn: "25,25 лв.", type: "expense", balance: "€21,95" },
  { id: 77826, date: "2026-03-07 09:10", status: "Одобрена", reason: "Инвестиция - първичен пазар", recipient: "ТЕРУ КРЕДИТ ЕООД", amount: "€51,64", amountBgn: "101,00 лв.", type: "expense", balance: "€34,86" },
];

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockTransactions.filter(
    (t) =>
      t.id.toString().includes(searchQuery) ||
      t.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="virr-gradient px-5 pt-12 pb-6 relative z-30"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">Транзакции</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">История на плащанията</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl bg-primary-foreground/10"
          >
            <RefreshCw className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        </div>
      </motion.div>

      <div className="px-4 mt-4 space-y-3">
        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Търси по ID, получател..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-xl h-11 bg-card border-border text-sm"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition-colors ${
              showFilters ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground"
            }`}
          >
            <Filter className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-3"
        >
          <div className="flex-1 bg-accent rounded-xl p-3">
            <span className="text-[10px] text-muted-foreground block">Общо приходи</span>
            <span className="text-sm font-bold text-primary">+ €40,41</span>
            <span className="text-[10px] text-muted-foreground ml-1">/ 79,03 лв.</span>
          </div>
          <div className="flex-1 bg-destructive/10 rounded-xl p-3">
            <span className="text-[10px] text-muted-foreground block">Общо разходи</span>
            <span className="text-sm font-bold text-destructive">- €98,97</span>
            <span className="text-[10px] text-muted-foreground ml-1">/ 193,57 лв.</span>
          </div>
        </motion.div>

        {/* Transaction List */}
        <div className="space-y-2">
          {filtered.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.03 }}
              className="bg-card rounded-2xl virr-card-shadow p-4 active:scale-[0.98] transition-transform"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">#{tx.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {tx.status}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                  <p className="text-xs text-foreground font-medium">{tx.reason}</p>
                  <p className="text-[11px] text-muted-foreground">{tx.recipient}</p>
                </div>
                <div className="text-right">
                  <p className={`text-base font-bold ${
                    tx.type === "income" ? "text-primary" : "text-destructive"
                  }`}>
                    {tx.type === "income" ? "+" : "-"}{tx.amount}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{tx.amountBgn}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Баланс: {tx.balance}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Transactions;
