import { motion } from "framer-motion";
import { ShoppingCart, Trash2, ArrowLeft, ChevronsRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBasket } from "@/hooks/useBasket";
import { removeFromBasket, clearBasket } from "@/stores/basketStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";
import { toast } from "sonner";
import BottomNav from "@/components/mobile/BottomNav";

const Basket = () => {
  const navigate = useNavigate();
  const items = useBasket();
  const [showConfirm, setShowConfirm] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalEur = items.reduce((sum, i) => sum + parseFloat(i.investAmount.eur.replace(",", ".")), 0);
  const totalBgn = items.reduce((sum, i) => sum + parseFloat(i.investAmount.bgn.replace(",", ".")), 0);

  const handlePay = () => {
    if (items.length === 0) {
      toast.error("Количката е празна.");
      return;
    }
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
      clearBasket();
      toast.success("Инвестицията е потвърдена успешно!");
      navigate("/investments");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="virr-gradient px-5 pt-12 pb-6 relative z-30"
      >
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Количка
            </h1>
            <p className="text-primary-foreground/70 text-sm mt-0.5">
              {items.length} {items.length === 1 ? "кредит" : "кредита"} за инвестиране
            </p>
          </div>
        </div>
      </motion.div>

      <div className="px-4 mt-4 space-y-3">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-medium">Количката е празна</p>
            <p className="text-muted-foreground/70 text-sm mt-1">
              Добавете кредити от Първичен или Вторичен пазар
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-xl"
              onClick={() => navigate("/primary-market")}
            >
              Към Първичен пазар
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Loan Items */}
            {items.map((item, index) => (
              <motion.div
                key={item.loanId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl border border-border p-4 virr-card-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-foreground">ID {item.loanId}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {item.apr}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      № {item.contractNo} · {item.originator}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div>
                        <span className="text-[10px] text-muted-foreground">Срок</span>
                        <p className="text-xs font-medium text-foreground">{item.remainingTerm}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground">Начален срок</span>
                        <p className="text-xs font-medium text-foreground">{item.initialTerm}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div>
                      <p className="text-sm font-bold text-foreground">€{item.investAmount.eur}</p>
                      <p className="text-[10px] text-muted-foreground">{item.investAmount.bgn} лв.</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromBasket(item.loanId)}
                      className="p-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-4 virr-card-shadow"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">Обща сума</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">
                    €{totalEur.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    / {totalBgn.toFixed(2)} лв.
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Брой кредити</span>
                <span className="text-sm font-semibold text-foreground">{items.length}</span>
              </div>
            </motion.div>

            {/* Pay Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePay}
              className="virr-gradient w-full rounded-2xl py-4 text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <ChevronsRight className="w-5 h-5" />
              Плати €{totalEur.toFixed(2)}
            </motion.button>
          </>
        )}
      </div>

      {/* OTP Confirmation Dialog */}
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

      <BottomNav />
    </div>
  );
};

export default Basket;
