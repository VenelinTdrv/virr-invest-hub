import { motion } from "framer-motion";
import { ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/mobile/BottomNav";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

// --- Data ---
const donutAmountData = [
  { name: "0-3 месеца", value: 0, color: "hsl(107, 61%, 42%)", label: "€0 / 0,00 лв.", pct: "0.00%" },
  { name: "4-6 месеца", value: 3096.28, color: "hsl(107, 55%, 50%)", label: "€3096,28 / 6055,80 лв.", pct: "67.42%" },
  { name: "7-12 месеца", value: 1378.2, color: "hsl(160, 55%, 50%)", label: "€1378,2 / 2695,52 лв.", pct: "30.01%" },
  { name: "13-18 месеца", value: 117.77, color: "hsl(180, 45%, 55%)", label: "€117,77 / 230,34", pct: "2.56%" },
];

const donutCountData = [
  { name: "0-3 месеца", value: 0, color: "hsl(107, 61%, 42%)", count: 0, pct: "0.00%" },
  { name: "4-6 месеца", value: 295, color: "hsl(107, 55%, 50%)", count: 295, pct: "78.67%" },
  { name: "7-12 месеца", value: 77, color: "hsl(160, 55%, 50%)", count: 77, pct: "20.53%" },
  { name: "13-18 месеца", value: 3, color: "hsl(180, 45%, 55%)", count: 3, pct: "0.80%" },
  { name: "18+ месеца", value: 0, color: "hsl(200, 40%, 60%)", count: 0, pct: "0.00%" },
];

const upcomingPayments = [
  { month: "03.2026", amount: 1435.44 },
  { month: "04.2026", amount: 2331.32 },
  { month: "05.2026", amount: 777.64 },
  { month: "06.2026", amount: 388.82 },
  { month: "07.2026", amount: 229.27 },
  { month: "08.2026", amount: 181.55 },
  { month: "09.2026", amount: 133.55 },
  { month: "10.2026", amount: 77.72 },
  { month: "11.2026", amount: 57.29 },
  { month: "12.2026", amount: 28.73 },
  { month: "01.2027", amount: 21.44 },
  { month: "02.2027", amount: 5.69 },
];

const paidPayments = [
  { month: "06.2025", amount: 56.51 },
  { month: "07.2025", amount: 92.95 },
  { month: "08.2025", amount: 241.29 },
  { month: "09.2025", amount: 1343.67 },
  { month: "10.2025", amount: 385.57 },
  { month: "11.2025", amount: 311.15 },
  { month: "12.2025", amount: 295.14 },
  { month: "01.2026", amount: 276.5 },
  { month: "02.2026", amount: 319.31 },
];

const purchasedLoansAmount = [
  { month: "06.2025", amount: 173.89 },
  { month: "07.2025", amount: 328.14 },
  { month: "08.2025", amount: 754.76 },
  { month: "09.2025", amount: 551.51 },
  { month: "10.2025", amount: 475.68 },
  { month: "11.2025", amount: 317.1 },
  { month: "12.2025", amount: 457.47 },
  { month: "01.2026", amount: 168.61 },
  { month: "02.2026", amount: 151.3 },
  { month: "03.2026", amount: 3769.57 },
];

const purchasedLoansCount = [
  { month: "06.2025", count: 3 },
  { month: "07.2025", count: 12 },
  { month: "08.2025", count: 7 },
  { month: "09.2025", count: 13 },
  { month: "10.2025", count: 11 },
  { month: "11.2025", count: 10 },
  { month: "12.2025", count: 15 },
  { month: "01.2026", count: 75 },
  { month: "02.2026", count: 75 },
  { month: "03.2026", count: 148 },
];

// --- Components ---
const SectionTitle = ({ title, hasInfo = true }: { title: string; hasInfo?: boolean }) => (
  <div className="flex items-center gap-1.5 mb-3">
    <span className="text-sm font-semibold text-foreground">{title}</span>
    {hasInfo && <Info className="w-3.5 h-3.5 text-primary" />}
  </div>
);

const DonutSection = ({
  title,
  data,
  centerLabel,
  centerSub,
}: {
  title: string;
  data: { name: string; value: number; color: string; pct: string; label?: string; count?: number }[];
  centerLabel: string;
  centerSub: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-2xl p-4 virr-card-shadow border border-border"
  >
    <SectionTitle title={title} />
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.filter(d => d.value > 0)}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={65}
              dataKey="value"
              stroke="none"
            >
              {data.filter(d => d.value > 0).map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-foreground">{centerLabel}</span>
          <span className="text-[10px] text-muted-foreground">{centerSub}</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-[9px] text-muted-foreground">
              {d.name} {d.pct}
            </span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const HBarSection = ({
  title,
  data,
  dataKey,
  color = "hsl(107, 61%, 42%)",
  formatter,
}: {
  title: string;
  data: { month: string; [key: string]: number | string }[];
  dataKey: string;
  color?: string;
  formatter?: (v: number) => string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-2xl p-4 virr-card-shadow border border-border"
  >
    <SectionTitle title={title} />
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 40, top: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(220, 13%, 90%)" />
          <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(220, 10%, 46%)" }} />
          <YAxis dataKey="month" type="category" tick={{ fontSize: 9, fill: "hsl(220, 10%, 46%)" }} width={55} />
          <Tooltip
            formatter={(v: number) => formatter ? formatter(v) : `€${v.toFixed(2)}`}
            contentStyle={{ fontSize: 11, borderRadius: 12, border: "1px solid hsl(220, 13%, 90%)" }}
          />
          <Bar dataKey={dataKey} fill={color} radius={[0, 4, 4, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

const PortfolioStatistics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-12 pb-4 relative z-30"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/portfolio")}
            className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <span className="text-xs text-muted-foreground">Портфолио</span>
            <h1 className="text-lg font-bold text-foreground leading-tight">Статистика</h1>
          </div>
        </div>
      </motion.div>

      <div className="px-4 space-y-4">
        {/* Top stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-4 virr-card-shadow border border-border space-y-3"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Обща инвестирана сума</span>
                <Info className="w-3 h-3 text-primary" />
              </div>
              <span className="text-lg font-bold text-primary">€7 949,78</span>
              <span className="text-[10px] text-muted-foreground block">15 548,42 лв.</span>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <span className="text-xs text-muted-foreground">Общ брой инвестиции</span>
                <Info className="w-3 h-3 text-primary" />
              </div>
              <span className="text-lg font-bold text-foreground">469</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Предстояща доходност</span>
              <Info className="w-3 h-3 text-primary" />
            </div>
            <span className="text-lg font-bold text-primary">€171,61</span>
            <span className="text-[10px] text-muted-foreground block">335,64 лв.</span>
          </div>
        </motion.div>

        {/* Donut charts */}
        <DonutSection
          title="Активни инвестиции » Сума"
          data={donutAmountData}
          centerLabel="€4 592,25"
          centerSub="8 981,66 лв."
        />
        <DonutSection
          title="Активни инвестиции » Брой"
          data={donutCountData}
          centerLabel="375"
          centerSub="Общо"
        />

        {/* Bar charts */}
        <HBarSection title="Падежиращи вноски" data={upcomingPayments} dataKey="amount" />
        <HBarSection title="Платени вноски" data={paidPayments} dataKey="amount" color="hsl(160, 55%, 50%)" />
        <HBarSection title="Закупени кредити » Сума" data={purchasedLoansAmount} dataKey="amount" />
        <HBarSection
          title="Закупени кредити » Брой"
          data={purchasedLoansCount}
          dataKey="count"
          color="hsl(160, 55%, 50%)"
          formatter={(v) => `${v}`}
        />

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-4 virr-card-shadow border border-border"
        >
          <SectionTitle title="Обобщени данни за период" hasInfo={false} />
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 bg-muted rounded-xl px-3 py-2">
              <span className="text-[9px] text-muted-foreground block">От дата</span>
              <span className="text-xs font-medium text-foreground">3/1/2026</span>
            </div>
            <div className="flex-1 bg-muted rounded-xl px-3 py-2">
              <span className="text-[9px] text-muted-foreground block">До дата</span>
              <span className="text-xs font-medium text-foreground">3/31/2026</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "Закупени кредити", count: 268, eur: "€3 769,57", bgn: "7 372,64 лв." },
              { label: "Падежиращи вноски", count: 67, eur: "€514,35", bgn: "1 005,98 лв." },
              { label: "Платени вноски", count: 219, eur: "€961,62", bgn: "1 880,77 лв." },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-xs text-foreground font-medium">{row.label}</span>
                <div className="text-right">
                  <span className="text-xs font-semibold text-foreground block">{row.count}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-foreground block">{row.eur}</span>
                  <span className="text-[9px] text-muted-foreground">{row.bgn}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default PortfolioStatistics;
