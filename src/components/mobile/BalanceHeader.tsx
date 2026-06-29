import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";

interface BalanceHeaderProps {
  balance: string;
  availableBalance: string;
  userName: string;
}

const BalanceHeader = ({ balance, availableBalance, userName }: BalanceHeaderProps) => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="virr-gradient rounded-b-3xl px-5 pt-12 pb-8 text-primary-foreground relative z-30"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <span className="text-sm font-semibold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </motion.button>
          <div>
            <p className="text-xs text-primary-foreground/70">Добре дошли</p>
            <p className="font-semibold">{userName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/notifications")}
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-[10px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-primary-foreground/70 mb-1">Налични средства</p>
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold"
          >
            {availableBalance}
          </motion.h1>
        </div>
        <div>
          <p className="text-xs text-primary-foreground/70 mb-1">Общо салдо</p>
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold"
          >
            {balance}
          </motion.h1>
        </div>
      </div>
      <div className="mt-3">
        <span className="inline-block px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium">
          +€61,26 този месец
        </span>
      </div>

    </motion.div>
  );
};

export default BalanceHeader;
