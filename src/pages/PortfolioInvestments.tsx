import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomNav from "@/components/mobile/BottomNav";

type StatusFilter = "all" | "active" | "late" | "completed";

interface Investment {
  id: number;
  contractNo: string;
  date: string;
  originator: string;
  investedAmount: { eur: string; bgn: string };
  remainingPrincipal: { eur: string; bgn: string };
  profit: { eur: string; bgn: string };
  apr: string;
  remainingTerm: string;
  initialTerm: string;
  status: "active" | "late" | "completed";
}

const investments: Investment[] = [
  {
    id: 48291,
    contractNo: "CRD-2025-48291",
    date: "15.01.2025",
    originator: "Credissimo",
    investedAmount: { eur: "50,00", bgn: "97,79" },
    remainingPrincipal: { eur: "38,42", bgn: "75,15" },
    profit: { eur: "3,21", bgn: "6,28" },
    apr: "12,50%",
    remainingTerm: "4 мес.",
    initialTerm: "12 мес.",
    status: "active",
  },
  {
    id: 47823,
    contractNo: "CRD-2025-47823",
    date: "10.01.2025",
    originator: "iuvo Group",
    investedAmount: { eur: "25,00", bgn: "48,90" },
    remainingPrincipal: { eur: "18,76", bgn: "36,69" },
    profit: { eur: "1,87", bgn: "3,66" },
    apr: "11,00%",
    remainingTerm: "3 мес.",
    initialTerm: "6 мес.",
    status: "active",
  },
  {
    id: 46510,
    contractNo: "CRD-2024-46510",
    date: "28.12.2024",
    originator: "Credissimo",
    investedAmount: { eur: "100,00", bgn: "195,58" },
    remainingPrincipal: { eur: "22,15", bgn: "43,32" },
    profit: { eur: "8,44", bgn: "16,51" },
    apr: "13,00%",
    remainingTerm: "1 мес.",
    initialTerm: "12 мес.",
    status: "active",
  },
  {
    id: 45102,
    contractNo: "CRD-2024-45102",
    date: "15.11.2024",
    originator: "EasyCredit",
    investedAmount: { eur: "30,00", bgn: "58,67" },
    remainingPrincipal: { eur: "30,00", bgn: "58,67" },
    profit: { eur: "0,00", bgn: "0,00" },
    apr: "10,50%",
    remainingTerm: "6 мес.",
    initialTerm: "6 мес.",
    status: "late",
  },
  {
    id: 43887,
    contractNo: "CRD-2024-43887",
    date: "01.10.2024",
    originator: "iuvo Group",
    investedAmount: { eur: "75,00", bgn: "146,69" },
    remainingPrincipal: { eur: "0,00", bgn: "0,00" },
    profit: { eur: "5,62", bgn: "10,99" },
    apr: "11,50%",
    remainingTerm: "0 мес.",
    initialTerm: "6 мес.",
    status: "completed",
  },
  {
    id: 42150,
    contractNo: "CRD-2024-42150",
    date: "20.09.2024",
    originator: "Credissimo",
    investedAmount: { eur: "60,00", bgn: "117,35" },
    remainingPrincipal: { eur: "45,30", bgn: "88,60" },
    profit: { eur: "2,10", bgn: "4,11" },
    apr: "12,00%",
    remainingTerm: "8 мес.",
    initialTerm: "12 мес.",
    status: "active",
  },
];

const statusConfig = {
  active: { label: "Активна", icon: CheckCircle, color: "text-primary" },
  late: { label: "Закъсняла", icon: AlertTriangle, color: "text-destructive" },
  completed: { label: "Приключена", icon: Clock, color: "text-muted-foreground" },
};

const filterTabs: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "Всички" },
  { key: "active", label: "Активни" },
  { key: "late", label: "Закъснели" },
  { key: "completed", label: "Приключени" },
];

const PortfolioInvestments = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = investments.filter((inv) => {
    if (activeFilter !== "all" && inv.status !== activeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        inv.originator.toLowerCase().includes(q) ||
        inv.contractNo.toLowerCase().includes(q) ||
        String(inv.id).includes(q)
      );
    }
    return true;
  });

  const totalInvested = "€4 592,25";
  const totalCount = filtered.length;

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-12 pb-3 relative z-30"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/portfolio")}
            className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <p className="text-xs text-muted-foreground">Портфолио</p>
            <h1 className="text-xl font-bold text-foreground">Инвестиции</h1>
          </div>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="px-4 mb-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card rounded-2xl p-4 virr-card-shadow border border-border flex items-center justify-between"
        >
          <div>
            <span className="text-[11px] text-muted-foreground">Обща инвестирана сума</span>
            <p className="text-lg font-bold text-foreground">{totalInvested}</p>
            <p className="text-[11px] text-muted-foreground">8 981,66 лв.</p>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-muted-foreground">Общ брой</span>
            <p className="text-2xl font-bold text-primary">{investments.length}</p>
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <div className="px-4 mb-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Търси по ID, договор или оригинатор..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2 overflow-x-auto no-scrollbar"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Results count */}
      <div className="px-5 mb-2">
        <span className="text-xs text-muted-foreground">
          Показани: {totalCount} инвестиции
        </span>
      </div>

      {/* Investment Cards */}
      <div className="px-4 space-y-3">
        {filtered.map((inv, index) => {
          const status = statusConfig[inv.status];
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-card rounded-2xl overflow-hidden virr-card-shadow border border-border"
            >
              {/* Card Header */}
              <div className="virr-gradient px-4 py-2.5 flex items-center justify-between">
                <div>
                  <span className="text-primary-foreground font-bold text-sm">ID {inv.id}</span>
                  <p className="text-primary-foreground/70 text-[10px]">
                    № {inv.contractNo}
                  </p>
                </div>
                <span className="text-primary-foreground/70 text-[10px]">{inv.date}</span>
              </div>

              {/* Card Body */}
              <div className="px-4 py-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    Оригинатор: <span className="text-foreground font-medium">{inv.originator}</span>
                  </span>
                  <div className={`flex items-center gap-1 ${status.color}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">{status.label}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  <InfoRow label="Инвестирана сума" eur={inv.investedAmount.eur} bgn={inv.investedAmount.bgn} />
                  <InfoRow label="Ост. главница" eur={inv.remainingPrincipal.eur} bgn={inv.remainingPrincipal.bgn} />
                  <InfoRow label="Доходност" eur={inv.profit.eur} bgn={inv.profit.bgn} highlight />
                  <div>
                    <span className="text-[10px] text-muted-foreground">ГЛП</span>
                    <p className="text-xs font-semibold text-foreground">{inv.apr}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-1 border-t border-border">
                  <div>
                    <span className="text-[10px] text-muted-foreground">Оставащ срок</span>
                    <p className="text-xs font-semibold text-primary">{inv.remainingTerm}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Начален срок</span>
                    <p className="text-xs font-semibold text-foreground">{inv.initialTerm}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            Няма намерени инвестиции
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

const InfoRow = ({
  label,
  eur,
  bgn,
  highlight,
}: {
  label: string;
  eur: string;
  bgn: string;
  highlight?: boolean;
}) => (
  <div>
    <span className="text-[10px] text-muted-foreground">{label}</span>
    <p className={`text-xs font-semibold ${highlight ? "text-primary" : "text-foreground"}`}>
      €{eur}{" "}
      <span className="text-muted-foreground font-normal">/ {bgn} лв.</span>
    </p>
  </div>
);

export default PortfolioInvestments;
