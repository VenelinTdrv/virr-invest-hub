import { motion } from "framer-motion";
import { TrendingUp, Wallet, PiggyBank, Info } from "lucide-react";

interface QuickStatProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  delay?: number;
}

const QuickStat = ({ label, value, icon, delay = 0 }: QuickStatProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center justify-between py-3 border-b border-border last:border-0"
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <span className="font-semibold text-foreground">{value}</span>
  </motion.div>
);

const QuickStats = () => {
  const stats = [
    { 
      label: "Инвестирани средства", 
      value: "€1 637,72", 
      icon: <TrendingUp className="w-4 h-4 text-primary" /> 
    },
    { 
      label: "Налични средства", 
      value: "€10,53", 
      icon: <Wallet className="w-4 h-4 text-primary" /> 
    },
    { 
      label: "Обща печалба", 
      value: "€1 257,37", 
      icon: <PiggyBank className="w-4 h-4 text-primary" /> 
    },
    { 
      label: "Кешбек", 
      value: "€1 196,11", 
      icon: <Info className="w-4 h-4 text-primary" /> 
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl px-4 py-2 virr-card-shadow"
    >
      {stats.map((stat, index) => (
        <QuickStat
          key={stat.label}
          {...stat}
          delay={0.2 + index * 0.1}
        />
      ))}
    </motion.div>
  );
};

export default QuickStats;
