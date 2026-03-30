import { motion, AnimatePresence } from "framer-motion";
import { Info, CheckCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { addToBasket } from "@/stores/basketStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoanData {
  id: number;
  contractNo: string;
  date: string;
  originator: string;
  remainingPrincipal: { eur: string; bgn: string };
  loanAmount: { eur: string; bgn: string };
  remainingTerm: string;
  initialTerm: string;
  profit: { eur: string; bgn: string };
  apr: string;
  status: string;
  investAmount: { eur: string; bgn: string };
}

interface LoanCardProps {
  loan: LoanData;
  delay?: number;
}

const LoanCard = ({ loan, delay = 0 }: LoanCardProps) => {
  const navigate = useNavigate();

  const handleInvest = () => {
    const added = addToBasket({
      loanId: loan.id,
      contractNo: loan.contractNo,
      originator: loan.originator,
      investAmount: loan.investAmount,
      apr: loan.apr,
      remainingTerm: loan.remainingTerm,
      initialTerm: loan.initialTerm,
    });
    if (added) {
      toast.success("Кредитът е добавен в количката!", {
        action: {
          label: "Количка",
          onClick: () => navigate("/basket"),
        },
      });
    } else {
      toast.info("Този кредит вече е в количката.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-card rounded-2xl overflow-hidden virr-card-shadow border border-border"
    >
      {/* Card Header */}
      <div className="virr-gradient px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-primary-foreground font-bold text-base">ID {loan.id}</span>
          <span className="text-primary-foreground/70 text-[10px]">{loan.date}</span>
        </div>
        <p className="text-primary-foreground/80 text-xs mt-0.5">
          № на договор: {loan.contractNo}
        </p>
      </div>

      {/* Card Body */}
      <div className="px-4 py-3 space-y-2.5">
        <div className="text-xs text-muted-foreground">
          Оригинатор: <span className="text-foreground font-medium">{loan.originator}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <InfoRow label="Ост. главница" valueEur={loan.remainingPrincipal.eur} valueBgn={loan.remainingPrincipal.bgn} />
          <InfoRow label="Сума на кредита" valueEur={loan.loanAmount.eur} valueBgn={loan.loanAmount.bgn} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-muted-foreground">Оставащ срок</span>
            <p className="text-xs font-semibold text-primary">{loan.remainingTerm}</p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground">Начален срок</span>
            <p className="text-xs font-semibold text-primary">{loan.initialTerm}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <InfoRow label="Доходност" valueEur={loan.profit.eur} valueBgn={loan.profit.bgn} />
          <div>
            <span className="text-[10px] text-muted-foreground">ГЛП</span>
            <p className="text-xs font-semibold text-foreground">{loan.apr}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">{loan.status}</span>
        </div>

        <div className="pt-1 border-t border-border">
          <span className="text-[10px] text-muted-foreground">Сума за инвестиране</span>
          <p className="text-sm font-bold text-foreground">
            €{loan.investAmount.eur}{" "}
            <span className="text-muted-foreground font-normal text-xs">
              / {loan.investAmount.bgn} лв.
            </span>
          </p>
        </div>
      </div>

      {/* Card Actions */}
      <div className="grid grid-cols-2 border-t border-border">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-1.5 py-3 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          <Info className="w-4 h-4" />
          Детайли
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleInvest}
          className="flex items-center justify-center gap-1.5 py-3 text-sm font-semibold virr-gradient text-primary-foreground"
        >
          <ShoppingCart className="w-4 h-4" />
          Инвестирай
        </motion.button>
      </div>
    </motion.div>
  );
};

const InfoRow = ({
  label,
  valueEur,
  valueBgn,
}: {
  label: string;
  valueEur: string;
  valueBgn: string;
}) => (
  <div>
    <span className="text-[10px] text-muted-foreground">{label}</span>
    <p className="text-xs font-semibold text-foreground">
      €{valueEur}{" "}
      <span className="text-muted-foreground font-normal">/ {valueBgn} лв.</span>
    </p>
  </div>
);

export default LoanCard;
