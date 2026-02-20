import { motion } from "framer-motion";
import { Home, TrendingUp, Wallet, ArrowDownUp, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Начало", active: true },
  { icon: TrendingUp, label: "Инвестиране", active: false },
  { icon: Wallet, label: "Депозиране", active: false },
  { icon: ArrowDownUp, label: "Транзакции", active: false },
  { icon: User, label: "Профил", active: false },
];

const BottomNav = () => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 glass px-2 pb-6 pt-2 virr-card-shadow"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
              item.active 
                ? "text-primary" 
                : "text-muted-foreground"
            }`}
          >
            <div className={`p-2 rounded-xl ${item.active ? "bg-accent" : ""}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default BottomNav;
