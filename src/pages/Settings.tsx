import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const [newLoans, setNewLoans] = useState(true);
  const [loanDue, setLoanDue] = useState(false);
  const [loanPayment, setLoanPayment] = useState(true);

  const handleSave = () => {
    toast({ title: "Настройките са запазени успешно" });
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="virr-gradient px-5 pt-12 pb-6 rounded-b-3xl text-primary-foreground">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-semibold">Настройки</h1>
        </div>
      </div>

      <div className="px-5 mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Настройки за известяване</h3>
        <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
          <NotificationRow
            label="ИНФОРМИРАЙ МЕ ЗА НОВИ КРЕДИТИ"
            checked={newLoans}
            onCheckedChange={setNewLoans}
          />
          <NotificationRow
            label="ИНФОРМИРАЙ МЕ ПРИ ПАДЕЖ НА МОЙ КРЕДИТ"
            checked={loanDue}
            onCheckedChange={setLoanDue}
          />
          <NotificationRow
            label="ИНФОРМИРАЙ МЕ ПРИ НАПРАВЕНО ПЛАЩАНЕ НА ПАДЕЖ НА МОЙ КРЕДИТ"
            checked={loanPayment}
            onCheckedChange={setLoanPayment}
          />
        </div>

        <div className="flex justify-center mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm"
          >
            <Save className="w-4 h-4" />
            Запази
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const NotificationRow = ({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) => (
  <label className="flex items-center gap-3 px-4 py-4 cursor-pointer">
    <Checkbox checked={checked} onCheckedChange={(v) => onCheckedChange(v === true)} />
    <span className="text-xs font-medium text-foreground">{label}</span>
  </label>
);

export default Settings;
