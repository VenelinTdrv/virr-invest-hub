import { motion } from "framer-motion";
import { Building2, ChevronsRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNav from "@/components/mobile/BottomNav";
import StatCard from "@/components/mobile/StatCard";
import { useState } from "react";
import { toast } from "sonner";

const Withdraw = () => {
  const [amount, setAmount] = useState("0");

  const handleWithdraw = () => {
    toast.success("Заявката за теглене е изпратена!");
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="virr-gradient px-5 pt-12 pb-6 relative z-30"
      >
        <h1 className="text-xl font-bold text-primary-foreground">Теглене</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">Изтеглете средства от сметката си</p>
      </motion.div>

      <div className="px-4 mt-4 space-y-4">
        {/* Bank Transfer Tab */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 border-b-2 border-primary pb-2 w-fit"
        >
          <Building2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Банков превод</span>
        </motion.div>

        {/* Available Balance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl virr-card-shadow p-4"
        >
          <p className="text-sm text-muted-foreground">
            Налични средства в твоя акаунт за теглене:{" "}
            <span className="text-primary font-bold">€266,27</span>
            <span className="text-primary font-medium"> / 520,77 лв.</span>
          </p>
        </motion.div>

        {/* Withdraw Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Сума за теглене*</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-xl h-11 bg-card border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">IBAN*</Label>
            <Select>
              <SelectTrigger className="rounded-xl h-11 bg-card border-border">
                <SelectValue placeholder="IBAN*" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iban1">BG90FINV...RP2P</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Withdraw Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleWithdraw}
          className="virr-gradient w-full rounded-xl py-3.5 text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2"
        >
          <ChevronsRight className="w-5 h-5" />
          Изтегли
        </motion.button>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-2 gap-3"
        >
          <StatCard label="Депозирани" value="€5 626" sublabel="11 003,70 лв." variant="primary" showChart delay={0.4} />
          <StatCard label="Изтеглени" value="€3 430" sublabel="6 708,50 лв." variant="accent" showChart delay={0.45} />
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Withdraw;
