import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, X, Search, ChevronDown, ShoppingCart } from "lucide-react";
import { useState } from "react";
import BottomNav from "@/components/mobile/BottomNav";
import { useBasket } from "@/hooks/useBasket";
import { useNavigate } from "react-router-dom";

const SecondaryMarket = () => {
  const [showFilters, setShowFilters] = useState(false);
  const basketItems = useBasket();
  const navigate = useNavigate();
  const availableFunds = "€40";

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="virr-gradient px-5 pt-12 pb-5 text-primary-foreground relative z-30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/investments")}>
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-lg font-bold">Вторичен пазар</h1>
              <p className="text-xs text-primary-foreground/70">Инвестиране</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">{availableFunds}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/basket")}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {basketItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                  {basketItems.length}
                </span>
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFilters(!showFilters)}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center"
            >
              {showFilters ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-card border-b border-border"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground appearance-none pr-8">
                    <option>Оригинатори</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground appearance-none pr-8">
                    <option>Тип кредити</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Мин. срок"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm placeholder:text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Макс. срок"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm placeholder:text-muted-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Мин. сума"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm placeholder:text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Макс. сума"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm placeholder:text-muted-foreground"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full virr-gradient text-primary-foreground py-2.5 rounded-xl text-sm font-semibold"
              >
                Обнови
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="px-4 mt-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Търси по ID или № на договор..."
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground virr-card-shadow"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">0 кредита намерени</span>
      </div>

      {/* Empty state */}
      <div className="px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border border-border virr-card-shadow"
        >
          <p className="text-muted-foreground font-medium">Няма активни оферти</p>
          <p className="text-muted-foreground/70 text-sm mt-1 px-8">
            В момента няма кредити за продажба на вторичния пазар.
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SecondaryMarket;
