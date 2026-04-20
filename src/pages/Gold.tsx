import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, X, ShoppingCart, Minus, Plus, Coins, CheckCircle2, Clock, ArrowUpDown, ChevronDown } from "lucide-react";
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

const Gold = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");
  const [typeFilter, setTypeFilter] = useState<"all" | GoldProduct["type"]>("all");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const getQty = (id: number) => quantities[id] ?? 1;
  const setQty = (id: number, q: number) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, q) }));

  const filtered = useMemo(() => {
    let list = [...products];
    if (typeFilter !== "all") list = list.filter((p) => p.type === typeFilter);
    if (sort === "asc") list.sort((a, b) => a.sell.eur - b.sell.eur);
    if (sort === "desc") list.sort((a, b) => b.sell.eur - a.sell.eur);
    return list;
  }, [sort, typeFilter]);

  const handleBuy = (p: GoldProduct) => {
    const qty = getQty(p.id);
    toast.success(`Добавено в количка: ${qty}× ${p.name}`);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="virr-gradient px-5 pt-12 pb-6 text-primary-foreground relative z-30"
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
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/basket")}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5" />
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

        {/* Live price strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-5 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-3 flex items-center justify-between"
        >
          <div>
            <p className="text-[11px] text-primary-foreground/70">Спот цена злато (1 oz)</p>
            <p className="text-base font-bold mt-0.5">€2 489,30 / 4 869,12 лв.</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-100 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Обновено
          </div>
        </motion.div>
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
              <div>
                <p className="text-[11px] text-muted-foreground mb-2 font-medium">Тип продукт</p>
                <div className="flex gap-2 flex-wrap">
                  {(["all", "Монета", "Кюлче", "Абонамент"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        typeFilter === t
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border"
                      }`}
                    >
                      {t === "all" ? "Всички" : t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground mb-2 font-medium">Подредба</p>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground appearance-none pr-8"
                  >
                    <option value="default">По подразбиране</option>
                    <option value="asc">Цена: ниска → висока</option>
                    <option value="desc">Цена: висока → ниска</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick filter chips */}
      <div className="px-4 mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{filtered.length} продукта</span>
        <button
          onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
          className="flex items-center gap-1 text-xs text-primary font-medium"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          Подредба
        </button>
      </div>

      {/* Product Cards */}
      <div className="px-4 mt-3 space-y-3">
        {filtered.map((p, index) => {
          const qty = getQty(p.id);
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="bg-card rounded-2xl border border-border overflow-hidden virr-card-shadow"
            >
              {/* Top: gold visual + badges */}
              <div className="relative bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 dark:from-amber-900/30 dark:via-yellow-900/20 dark:to-amber-800/30 p-5 flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-600 shadow-lg flex items-center justify-center">
                  <Coins className="w-8 h-8 text-amber-900" />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {p.isNew && (
                    <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold tracking-wide">
                      НОВО
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-background/70 backdrop-blur-sm text-foreground text-[10px] font-medium border border-border">
                    {p.type} · {p.weight}
                  </span>
                  {p.inStock ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      В наличност
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                      <Clock className="w-3 h-3" />
                      {p.delivery}
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground leading-snug">{p.name}</h3>

                {/* Prices */}
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-xl p-3 border border-border">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                      Продаваме
                    </p>
                    <p className="text-base font-bold text-foreground mt-1">
                      €{formatMoney(p.sell.eur)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatMoney(p.sell.bgn)} лв.
                    </p>
                  </div>
                  <div className="bg-background rounded-xl p-3 border border-border">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                      Купуваме
                    </p>
                    <p className="text-base font-bold text-foreground mt-1">
                      €{formatMoney(p.buy.eur)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatMoney(p.buy.bgn)} лв.
                    </p>
                  </div>
                </div>

                {/* Quantity + buy */}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">Количество</p>
                    <div className="flex items-center bg-background border border-border rounded-xl">
                      <button
                        onClick={() => setQty(p.id, qty - 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-foreground">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty(p.id, qty + 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBuy(p)}
                    disabled={!p.inStock}
                    className="flex-1 virr-gradient text-primary-foreground rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Купи €{formatMoney(p.sell.eur * qty)}
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
