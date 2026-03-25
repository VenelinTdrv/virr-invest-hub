import { motion } from "framer-motion";
import { Info, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/mobile/BottomNav";

const menuItems = [
  {
    icon: Info,
    label: "Информация",
    description: "За нас, оригинатори, FAQ",
    path: "/information",
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

      <div className="px-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(item.path)}
            className="w-full bg-card rounded-2xl p-4 virr-card-shadow border border-border flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default More;
