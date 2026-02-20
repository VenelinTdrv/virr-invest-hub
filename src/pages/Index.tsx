import { motion } from "framer-motion";
import BalanceHeader from "@/components/mobile/BalanceHeader";
import StatCard from "@/components/mobile/StatCard";
import QuickStats from "@/components/mobile/QuickStats";
import MonthlyChart from "@/components/mobile/MonthlyChart";
import ProjectionChart from "@/components/mobile/ProjectionChart";
import BottomNav from "@/components/mobile/BottomNav";
import { TrendingUp, Percent, ArrowUpRight, ArrowDownRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header with Balance */}
      <BalanceHeader balance="€1 648,25" userName="Венелин" />

      {/* Main Content */}
      <div className="px-4 mt-4 space-y-4">
        {/* Profit Cards Row */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Печалба текуща година"
            sublabel="2026"
            value="€15"
            variant="primary"
            delay={0.1}
            showChart
          />
          <StatCard
            label="Печалба текущ месец"
            sublabel="01.2026"
            value="€15"
            variant="primary"
            delay={0.15}
            showChart
          />
        </div>

        {/* APR & XIRR Cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="APR"
            sublabel="Среднопретеглен лихвен процент"
            value="16 %"
            icon={Percent}
            variant="accent"
            delay={0.2}
            showChart
          />
          <StatCard
            label="XIRR"
            sublabel="Вътрешна норма на възвръщаемост"
            value="17 %"
            icon={TrendingUp}
            variant="primary"
            delay={0.25}
            showChart
          />
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Monthly Profit Chart */}
        <MonthlyChart />

        {/* Deposit & Withdraw Cards */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="virr-gradient rounded-2xl p-4 virr-card-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownRight className="w-4 h-4 text-primary-foreground/70" />
              <span className="text-xs text-primary-foreground/70 font-medium">Депозирани</span>
            </div>
            <span className="text-2xl font-bold text-primary-foreground">€376</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="virr-gradient rounded-2xl p-4 virr-card-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-4 h-4 text-primary-foreground/70" />
              <span className="text-xs text-primary-foreground/70 font-medium">Изтеглени</span>
            </div>
            <span className="text-2xl font-bold text-primary-foreground">€0</span>
          </motion.div>
        </div>

        {/* Projection Chart */}
        <ProjectionChart />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
