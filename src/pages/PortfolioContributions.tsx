import { motion } from "framer-motion";
import { ArrowLeft, Filter, ChevronDown, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomNav from "@/components/mobile/BottomNav";

type PaidFilter = "all" | "paid" | "unpaid";

interface Payment {
  investId: number;
  loanId: number;
  contractNo: string;
  installment: string;
  dueDate: string;
  principal: { eur: string; bgn: string };
  profit: { eur: string; bgn: string };
  total: { eur: string; bgn: string };
  paid: boolean;
  payDate?: string;
}

const payments: Payment[] = [
  { investId: 12431, loanId: 8714, contractNo: "000325642", installment: "4/7", dueDate: "2026-03-25", principal: { eur: "2,87", bgn: "5,61" }, profit: { eur: "0,08", bgn: "0,16" }, total: { eur: "2,95", bgn: "5,77" }, paid: false },
  { investId: 12408, loanId: 6609, contractNo: "000834601", installment: "5/6", dueDate: "2026-03-25", principal: { eur: "0,32", bgn: "0,63" }, profit: { eur: "0,01", bgn: "0,02" }, total: { eur: "0,33", bgn: "0,65" }, paid: false },
  { investId: 14354, loanId: 8679, contractNo: "000325567", installment: "4/6", dueDate: "2026-03-25", principal: { eur: "8,07", bgn: "15,78" }, profit: { eur: "0,09", bgn: "0,18" }, total: { eur: "8,16", bgn: "15,96" }, paid: false },
  { investId: 14345, loanId: 9651, contractNo: "000844093", installment: "4/4", dueDate: "2026-03-25", principal: { eur: "23,54", bgn: "46,04" }, profit: { eur: "0,09", bgn: "0,18" }, total: { eur: "23,63", bgn: "46,22" }, paid: false },
  { investId: 14348, loanId: 15159, contractNo: "000341834", installment: "1/10", dueDate: "2026-03-25", principal: { eur: "2,39", bgn: "4,67" }, profit: { eur: "0,09", bgn: "0,18" }, total: { eur: "2,48", bgn: "4,85" }, paid: false },
  { investId: 13418, loanId: 8686, contractNo: "000325585", installment: "4/6", dueDate: "2026-03-25", principal: { eur: "0,11", bgn: "0,22" }, profit: { eur: "0,00", bgn: "0,00" }, total: { eur: "0,11", bgn: "0,22" }, paid: false },
  { investId: 14288, loanId: 8723, contractNo: "000325694", installment: "4/6", dueDate: "2026-03-25", principal: { eur: "6,45", bgn: "12,62" }, profit: { eur: "0,07", bgn: "0,14" }, total: { eur: "6,52", bgn: "12,75" }, paid: false },
  { investId: 12406, loanId: 9709, contractNo: "000844302", installment: "4/5", dueDate: "2026-03-25", principal: { eur: "0,20", bgn: "0,39" }, profit: { eur: "0,00", bgn: "0,00" }, total: { eur: "0,20", bgn: "0,39" }, paid: false },
  { investId: 13425, loanId: 6626, contractNo: "000834699", installment: "5/6", dueDate: "2026-03-25", principal: { eur: "3,18", bgn: "6,22" }, profit: { eur: "0,03", bgn: "0,06" }, total: { eur: "3,21", bgn: "6,28" }, paid: false },
  { investId: 8752, loanId: 9677, contractNo: "000844168", installment: "4/4", dueDate: "2026-03-25", principal: { eur: "1,36", bgn: "2,66" }, profit: { eur: "0,04", bgn: "0,08" }, total: { eur: "1,40", bgn: "2,74" }, paid: false },
  { investId: 12426, loanId: 9734, contractNo: "000844412", installment: "4/4", dueDate: "2026-03-25", principal: { eur: "10,52", bgn: "20,58" }, profit: { eur: "0,08", bgn: "0,16" }, total: { eur: "10,60", bgn: "20,73" }, paid: false },
  { investId: 11205, loanId: 7412, contractNo: "000312455", installment: "6/6", dueDate: "2026-02-28", principal: { eur: "5,10", bgn: "9,98" }, profit: { eur: "0,12", bgn: "0,23" }, total: { eur: "5,22", bgn: "10,21" }, paid: true, payDate: "2026-02-28" },
  { investId: 10892, loanId: 6980, contractNo: "000298741", installment: "5/5", dueDate: "2026-02-15", principal: { eur: "15,30", bgn: "29,92" }, profit: { eur: "0,15", bgn: "0,29" }, total: { eur: "15,45", bgn: "30,22" }, paid: true, payDate: "2026-02-15" },
];

const filterOptions: { key: PaidFilter; label: string }[] = [
  { key: "all", label: "Всички" },
  { key: "unpaid", label: "Неплатени" },
  { key: "paid", label: "Платени" },
];

const PortfolioContributions = () => {
  const navigate = useNavigate();
  const [paidFilter, setPaidFilter] = useState<PaidFilter>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = payments.filter((p) => {
    if (paidFilter === "paid") return p.paid;
    if (paidFilter === "unpaid") return !p.paid;
    return true;
  });

  const totalUnpaid = payments.filter((p) => !p.paid).length;
  const totalPaid = payments.filter((p) => p.paid).length;

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
            <h1 className="text-xl font-bold text-foreground">Вноски</h1>
          </div>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="px-4 mb-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card rounded-2xl p-4 virr-card-shadow border border-border grid grid-cols-2 gap-3"
        >
          <div>
            <span className="text-[11px] text-muted-foreground">Неплатени</span>
            <p className="text-lg font-bold text-destructive">{totalUnpaid}</p>
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground">Платени</span>
            <p className="text-lg font-bold text-primary">{totalPaid}</p>
          </div>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2"
        >
          {filterOptions.map((f) => (
            <button
              key={f.key}
              onClick={() => setPaidFilter(f.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                paidFilter === f.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Results count */}
      <div className="px-5 mb-2">
        <span className="text-xs text-muted-foreground">
          Показани: {filtered.length} вноски
        </span>
      </div>

      {/* Payment Cards */}
      <div className="px-4 space-y-3">
        {filtered.map((p, index) => (
          <motion.div
            key={`${p.investId}-${p.installment}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.03 }}
            className="bg-card rounded-2xl overflow-hidden virr-card-shadow border border-border"
          >
            {/* Card Header */}
            <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">Инв. #{p.investId}</span>
                <span className="text-[10px] text-muted-foreground">
                  Кредит #{p.loanId}
                </span>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  p.paid
                    ? "bg-accent text-accent-foreground"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {p.paid ? "Платена" : "Не"}
              </span>
            </div>

            {/* Card Body */}
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">№ на договор</span>
                <span className="text-xs text-foreground">{p.contractNo}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Вноска</span>
                <span className="text-xs font-semibold text-foreground">{p.installment}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Дата на падеж</span>
                <span className="text-xs text-foreground">{p.dueDate}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1.5 border-t border-border">
                <div>
                  <span className="text-[10px] text-muted-foreground">Главница</span>
                  <p className="text-xs font-semibold text-foreground">
                    €{p.principal.eur}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{p.principal.bgn} лв.</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground">Доходност</span>
                  <p className="text-xs font-semibold text-primary">
                    €{p.profit.eur}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{p.profit.bgn} лв.</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground">Сума</span>
                  <p className="text-xs font-bold text-foreground">
                    €{p.total.eur}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{p.total.bgn} лв.</p>
                </div>
              </div>

              {p.paid && p.payDate && (
                <div className="flex items-center justify-between pt-1.5 border-t border-border">
                  <span className="text-[10px] text-muted-foreground">Дата на плащане</span>
                  <span className="text-xs font-medium text-primary">{p.payDate}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            Няма намерени вноски
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default PortfolioContributions;
