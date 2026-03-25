import { motion } from "framer-motion";
import { Building2, CreditCard, Wallet, Copy, Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BottomNav from "@/components/mobile/BottomNav";
import StatCard from "@/components/mobile/StatCard";
import { useState } from "react";
import { toast } from "sonner";

const bankDetails = [
  { label: "Банка", value: "ПИБ" },
  { label: "Име на бенефициента", value: "Вирр Р2Р ООД" },
  { label: "Банкова сметка в Евро", value: "BG90FINV9150101VIRRP2P" },
  { label: "SWIFT/BIC код", value: "FINVBGSF" },
  { label: "Основание за плащането", value: "41 – Захранване на сметка" },
];

const Deposit = () => {
  const [activeTab, setActiveTab] = useState("bank");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} копирано!`);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="virr-gradient px-5 pt-12 pb-6 relative z-30"
      >
        <h1 className="text-xl font-bold text-primary-foreground">Депозиране</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">Захранете вашата сметка</p>
      </motion.div>

      <div className="px-4 mt-4 space-y-4">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-accent border border-primary/20 rounded-2xl p-4"
        >
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-accent-foreground leading-relaxed">
              Захранването на вашата сметка е възможно само чрез банков превод. Преведете сумата към сметката на Вирр Р2Р с основание „ID на виртуален портфейл - Захранване на сметка".
            </p>
          </div>
        </motion.div>

        {/* Payment Methods Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-muted rounded-xl h-12">
              <TabsTrigger value="bank" className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary gap-1.5 text-xs">
                <Building2 className="w-4 h-4" />
                Банков превод
              </TabsTrigger>
              <TabsTrigger value="revolut" className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary gap-1.5 text-xs">
                <CreditCard className="w-4 h-4" />
                Revolut
              </TabsTrigger>
              <TabsTrigger value="paysera" className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary gap-1.5 text-xs">
                <Wallet className="w-4 h-4" />
                PaySera
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bank" className="mt-4">
              <div className="bg-card rounded-2xl virr-card-shadow overflow-hidden">
                {bankDetails.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className={`flex items-center justify-between px-4 py-3.5 ${
                      index < bankDetails.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium text-foreground ${
                        item.label === "Основание за плащането" ? "text-primary" : ""
                      }`}>
                        {item.value}
                      </span>
                      <button
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className="p-1 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="revolut" className="mt-4">
              <div className="bg-card rounded-2xl virr-card-shadow p-6 text-center">
                <CreditCard className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Revolut депозитът скоро ще бъде наличен.</p>
              </div>
            </TabsContent>

            <TabsContent value="paysera" className="mt-4">
              <div className="bg-card rounded-2xl virr-card-shadow p-6 text-center">
                <Wallet className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">PaySera депозитът скоро ще бъде наличен.</p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          <StatCard
            label="Депозирани"
            value="€5 626"
            sublabel="11 003,70 лв."
            variant="primary"
            showChart
            delay={0.45}
          />
          <StatCard
            label="Изтеглени"
            value="€3 430"
            sublabel="6 708,50 лв."
            variant="accent"
            showChart
            delay={0.5}
          />
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Deposit;
