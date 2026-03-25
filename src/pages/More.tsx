import { motion } from "framer-motion";
import { Users, DollarSign, BarChart3, HelpCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/mobile/BottomNav";

const tiles = [
  {
    icon: Users,
    label: "За нас",
    path: "/information?tab=about",
    color: "bg-primary",
  },
  {
    icon: DollarSign,
    label: "Оригинатори",
    path: "/information?tab=originators",
    color: "bg-secondary",
  },
  {
    icon: BarChart3,
    label: "Статистика",
    path: "/information?tab=statistics",
    color: "bg-primary",
  },
  {
    icon: HelpCircle,
    label: "FAQ",
    path: "/information?tab=faq",
    color: "bg-accent",
    iconColor: "text-accent-foreground",
  },
  {
    icon: Info,
    label: "Блог",
    path: "/information?tab=blog",
    color: "bg-secondary",
  },
];

const More = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-28">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-12 pb-5 relative z-30"
      >
        <h1 className="text-xl font-bold text-foreground">Повече</h1>
      </motion.div>

      <div className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 virr-card-shadow border border-border"
        >
          <span className="text-sm text-muted-foreground font-medium">Информация</span>
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
                  <tile.icon
                    className={`w-6 h-6 ${tile.iconColor || "text-primary-foreground"}`}
                  />
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

export default More;
