import { motion } from "framer-motion";
import { Info, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInvest = () => {
    setShowConfirm(true);
    setCode("");
  };

  const handleConfirm = () => {
    if (code.length < 6) {
      toast.error("Моля, въведете пълния код.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirm(false);
      toast.success("Инвестицията е потвърдена успешно!");
    }, 1500);
  };

  return (
    <>
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
            Инвестирай
          </motion.button>
        </div>
      </motion.div>

      {/* Order Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="mx-auto max-w-[340px] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              Потвърждаване на поръчката
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed">
            За да приключите вашата поръчка трябва да въведете кода, който изпратихме на вашия email.
            С потвърждаването на кода вие подписвате договор за цесия за всеки кредит от вашата количка.
          </p>
          <div className="flex justify-center py-2">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              className="rounded-xl px-6"
              onClick={handleConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Потвърждаване..." : "Потвърди"}
            </Button>
            <Button
              variant="ghost"
              className="rounded-xl px-6 border border-border"
              onClick={() => setShowConfirm(false)}
            >
              Отказ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
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
