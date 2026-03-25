import { motion } from "framer-motion";
import { Home, TrendingUp, Wallet, ArrowDownUp, PieChart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Начало", path: "/" },
  { icon: TrendingUp, label: "Инвестиране", path: "/investments" },
  { icon: Wallet, label: "Трансфер", path: "/transfer" },
  { icon: PieChart, label: "Портфолио", path: "/portfolio" },
  { icon: ArrowDownUp, label: "Транзакции", path: "/transactions" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 pb-6 pt-2 virr-card-shadow"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className={`p-2 rounded-xl ${isActive ? "bg-accent" : ""}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNav;
