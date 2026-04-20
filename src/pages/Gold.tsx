import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Minus, Plus, Coins, CheckCircle2, Clock, TrendingUp, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/mobile/BottomNav";

type GoldProduct = {
  id: number;
  name: string;
  type: "Монета" | "Кюлче" | "Абонамент";
  weight: string;
  sell: { eur: number; bgn: number };
  buy: { eur: number; bgn: number };
  inStock: boolean;
  delivery?: string;
  isNew?: boolean;
};

const products: GoldProduct[] = [
  {
    id: 1,
    name: "1 унция златна монета Австралийски лунар, година на Коня 2026",
    type: "Монета",
    weight: "31.1 g",
    sell: { eur: 4349, bgn: 8505.9 },
    buy: { eur: 4262, bgn: 8335.75 },
    inStock: true,
    isNew: true,
  },
  {
    id: 2,
    name: "1 грам абонаментно златно кюлче Tavex",
    type: "Абонамент",
    weight: "1 g",
    sell: { eur: 149, bgn: 291.42 },
    buy: { eur: 136, bgn: 265.99 },
    inStock: true,
  },
  {
    id: 3,
    name: "0,25 грама златно кюлче Tavex",
    type: "Кюлче",
    weight: "0.25 g",
    sell: { eur: 39, bgn: 76.28 },
    buy: { eur: 39, bgn: 76.28 },
    inStock: true,
  },
  {
    id: 4,
    name: "1 унция златна монета Кругерранд, Южна Африка",
    type: "Монета",
    weight: "31.1 g",
    sell: { eur: 4226, bgn: 8265.34 },
    buy: { eur: 4148, bgn: 8112.78 },
    inStock: false,
    delivery: "Доставка до 6 седмици",
  },
  {
    id: 5,
    name: "10 грама златно кюлче Tavex",
    type: "Кюлче",
    weight: "10 g",
    sell: { eur: 1389, bgn: 2716.94 },
    buy: { eur: 1352, bgn: 2644.55 },
    inStock: true,
  },
];

const formatMoney = (n: number) =>
  n.toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TYPE_FILTERS = ["all", "Монета", "Кюлче", "Абонамент"] as const;

const Gold = () => {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_FILTERS)[number]>("all");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const getQty = (id: number) => quantities[id] ?? 1;
  const setQty = (id: number, q: number) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, q) }));

  const filtered = useMemo(
    () => (typeFilter === "all" ? products : products.filter((p) => p.type === typeFilter)),
    [typeFilter],
  );

  const handleBuy = (p: GoldProduct) => {
    toast.success(`Добавено в количка: ${getQty(p.id)}× ${p.name}`);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="virr-gradient px-5 pt-12 pb-8 text-primary-foreground relative z-30 rounded-b-[28px]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/investments")}>
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                <Coins className="w-5 h-5" />
                Инвестиционно злато
              </h1>
              <p className="text-xs text-primary-foreground/70">Монети, кюлчета, абонаменти</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/basket")}
            className="w-10 h-10 rounded-full bg-primary-foreground/15 flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Premium spot price card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-amber-400/25 via-yellow-300/10 to-transparent border border-amber-200/30 backdrop-blur-sm"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-amber-300/20 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] text-primary-foreground/70 uppercase tracking-wider font-semibold">
                <Sparkles className="w-3 h-3 text-amber-200" />
                Спот цена злато · 1 oz
              </div>
              <p className="text-xl font-bold mt-1.5 tracking-tight">€2 489,30</p>
              <p className="text-[11px] text-primary-foreground/60 mt-0.5">4 869,12 лв.</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-400/25 text-emerald-50 text-[11px] font-semibold">
                <TrendingUp className="w-3 h-3" />
                +1,24%
              </div>
              <span className="text-[10px] text-primary-foreground/60">днес</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Type filter chips */}
      <div className="px-4 mt-5">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
          {TYPE_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                typeFilter === t
                  ? "bg-foreground text-background border-foreground shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {t === "all" ? "Всички" : t}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-3 px-1">{filtered.length} продукта</p>
      </div>

      {/* Product Cards */}
      <div className="px-4 mt-2 space-y-3">
        {filtered.map((p, index) => {
          const qty = getQty(p.id);
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-3xl border border-border overflow-hidden virr-card-shadow"
            >
              <div className="p-4">
                {/* Top: medallion + info */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 blur-md opacity-40" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-700 shadow-lg flex items-center justify-center ring-4 ring-amber-100/40 dark:ring-amber-900/30">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 flex items-center justify-center">
                        <Coins className="w-7 h-7 text-amber-950" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-semibold">
                        {p.type}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium">
                        · {p.weight}
                      </span>
                      {p.isNew && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold tracking-wider">
                          НОВО
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug mt-1.5 line-clamp-2">
                      {p.name}
                    </h3>
                    {p.inStock ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1.5">
                        <CheckCircle2 className="w-3 h-3" />
                        В наличност
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-1.5">
                        <Clock className="w-3 h-3" />
                        {p.delivery}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price hierarchy */}
                <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Продаваме
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-0.5 tracking-tight">
                      €{formatMoney(p.sell.eur)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {formatMoney(p.sell.bgn)} лв.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      Купуваме
                    </p>
                    <p className="text-sm font-semibold text-muted-foreground mt-0.5">
                      €{formatMoney(p.buy.eur)}
                    </p>
                  </div>
                </div>

                {/* Quantity + buy */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center bg-muted/60 rounded-full">
                    <button
                      onClick={() => setQty(p.id, qty - 1)}
                      className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-bold text-foreground">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(p.id, qty + 1)}
                      className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleBuy(p)}
                    disabled={!p.inStock}
                    className="flex-1 virr-gradient text-primary-foreground rounded-full py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Купи · €{formatMoney(p.sell.eur * qty)}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default Gold;
