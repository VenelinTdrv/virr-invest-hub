import { Home, TrendingUp, Wallet, PieChart, MoreHorizontal, Coins, Bell, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
  { icon: Home, label: "Начало", path: "/" },
  { icon: TrendingUp, label: "Инвестиране", path: "/investments" },
  { icon: Coins, label: "Злато", path: "/gold" },
  { icon: Wallet, label: "Трансфер", path: "/transfer" },
  { icon: PieChart, label: "Портфолио", path: "/portfolio" },
  { icon: Bell, label: "Известия", path: "/notifications" },
  { icon: MoreHorizontal, label: "Повече", path: "/more" },
];

const DesktopSidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-card border-r border-border flex flex-col py-6 px-4">
      <div className="flex items-center gap-2 px-3 mb-10">
        <div className="w-9 h-9 rounded-xl virr-gradient flex items-center justify-center">
          <span className="text-primary-foreground font-bold">V</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">Virr.io</span>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map((item) => {
          const active = pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary"
                />
              )}
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <NavLink
        to="/welcome"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <LogOut className="w-5 h-5" />
        <span>Изход</span>
      </NavLink>
    </aside>
  );
};

export default DesktopSidebar;