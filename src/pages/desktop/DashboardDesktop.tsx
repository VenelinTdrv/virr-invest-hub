import { motion } from "framer-motion";
import { Bell, Search, Settings, TrendingUp, Percent, ArrowUpRight, ArrowDownRight, Plus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DesktopSidebar from "@/components/desktop/DesktopSidebar";
import StatCard from "@/components/mobile/StatCard";
import QuickStats from "@/components/mobile/QuickStats";
import MonthlyChart from "@/components/mobile/MonthlyChart";
import ProjectionChart from "@/components/mobile/ProjectionChart";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";

const DashboardDesktop = () => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <div className="min-h-screen bg-background flex">
      <DesktopSidebar />

      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Добре дошли, Венелин 👋</h1>
              <p className="text-sm text-muted-foreground">Ето как се представя портфолиото ти днес.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Търси кредити, транзакции..."
                  className="pl-9 pr-4 py-2 w-72 rounded-xl bg-muted border border-transparent focus:border-border focus:outline-none text-sm"
                />
              </div>
              <button
                onClick={() => navigate("/notifications")}
                className="w-10 h-10 rounded-xl bg-muted hover:bg-accent flex items-center justify-center relative"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate("/profile/settings")}
                className="w-10 h-10 rounded-xl bg-muted hover:bg-accent flex items-center justify-center"
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-xl virr-gradient flex items-center justify-center text-primary-foreground font-semibold"
              >
                В
              </button>
            </div>
          </div>
        </header>

        <div className="px-8 py-6 space-y-6 max-w-[1600px]">
          {/* Hero balance + quick actions */}
          <div className="grid grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-2 virr-gradient rounded-3xl p-8 text-primary-foreground virr-card-shadow relative overflow-hidden"
            >
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" />
              <div className="relative">
                <div className="grid grid-cols-2 gap-8 mb-6">
                  <div>
                    <p className="text-sm text-primary-foreground/70 mb-2">Общо салдо</p>
                    <h2 className="text-5xl font-bold tracking-tight">€1 648,25</h2>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-primary-foreground/70 mb-2">Налични средства</p>
                      <h2 className="text-5xl font-bold tracking-tight">€10,53</h2>
                    </div>
                    <span className="self-start px-3 py-1.5 bg-primary-foreground/20 rounded-full text-xs font-medium">
                      +€61,26 този месец
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => navigate("/deposit")}
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl"
                  >
                    <Plus className="w-4 h-4" /> Депозирай
                  </Button>
                  <Button
                    onClick={() => navigate("/withdraw")}
                    variant="outline"
                    className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-xl"
                  >
                    <ArrowUpRight className="w-4 h-4" /> Изтегли
                  </Button>
                  <Button
                    onClick={() => navigate("/primary-market")}
                    variant="outline"
                    className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-xl"
                  >
                    <Sparkles className="w-4 h-4" /> Инвестирай
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 virr-card-shadow"
              >
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-xs font-medium">Депозирани</span>
                </div>
                <p className="text-3xl font-bold text-foreground">€376</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-card border border-border rounded-2xl p-5 virr-card-shadow"
              >
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-xs font-medium">Изтеглени</span>
                </div>
                <p className="text-3xl font-bold text-foreground">€0</p>
              </motion.div>
            </div>
          </div>

          {/* Profit cards row */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Печалба тази година" sublabel="2026" value="€15" variant="primary" delay={0.1} showChart />
            <StatCard label="Печалба този месец" sublabel="01.2026" value="€15" variant="primary" delay={0.15} showChart />
            <StatCard label="APR" sublabel="Среднопретеглен лихвен %" value="16 %" icon={Percent} variant="accent" delay={0.2} showChart />
            <StatCard label="XIRR" sublabel="Вътрешна норма на възвръщаемост" value="17 %" icon={TrendingUp} variant="accent" delay={0.25} showChart />
          </div>

          {/* Charts + quick stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <MonthlyChart />
              <ProjectionChart />
            </div>
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-4 virr-card-shadow">
                <h3 className="font-semibold text-foreground mb-2 px-1">Бърз преглед</h3>
                <QuickStats />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardDesktop;