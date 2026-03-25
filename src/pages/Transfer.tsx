import { motion } from "framer-motion";
import { Bell, Settings, Wallet, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/mobile/BottomNav";

const tiles = [
  {
    icon: Wallet,
    label: "Депозиране",
    path: "/deposit",
    color: "bg-primary",
  },
  {
    icon: Upload,
    label: "Теглене",
    path: "/withdraw",
    color: "bg-secondary",
  },
];

const Transfer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-12 pb-5 relative z-30"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Трансфер</h1>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground"
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Products Card */}
      <div className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 virr-card-shadow border border-border"
        >
          <span className="text-sm text-muted-foreground font-medium">Операции</span>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {tiles.map((tile, index) => (
              <motion.button
                key={tile.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.07 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => navigate(tile.path)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${tile.color} flex items-center justify-center`}
                >
                  <tile.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-[11px] font-medium text-foreground leading-tight text-center">
                  {tile.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Transfer;
