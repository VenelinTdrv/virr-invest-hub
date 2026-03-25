import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BalanceHeaderProps {
  balance: string;
  userName: string;
}

const BalanceHeader = ({ balance, userName }: BalanceHeaderProps) => {
  const navigate = useNavigate();

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
            onClick={() => navigate("/information")}
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
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center"
          >
            <Bell className="w-5 h-5" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-primary-foreground/70 mb-1">Общо салдо</p>
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold mb-2"
        >
          {balance}
        </motion.h1>
        <div className="flex items-center justify-center gap-2">
          <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium">
            +€61,26 този месец
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceHeader;
