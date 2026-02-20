import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  sublabel?: string;
  icon?: LucideIcon;
  variant?: "default" | "primary" | "accent";
  delay?: number;
  showChart?: boolean;
}

const StatCard = ({ 
  label, 
  value, 
  sublabel, 
  icon: Icon, 
  variant = "default",
  delay = 0,
  showChart = false
}: StatCardProps) => {
  const variants = {
    default: "glass",
    primary: "virr-gradient-glass text-primary-foreground",
    accent: "glass-accent"
  };

  const textVariants = {
    default: {
      label: "text-muted-foreground",
      value: "text-foreground",
      sublabel: "text-muted-foreground"
    },
    primary: {
      label: "text-primary-foreground/80",
      value: "text-primary-foreground",
      sublabel: "text-primary-foreground/70"
    },
    accent: {
      label: "text-accent-foreground/70",
      value: "text-accent-foreground",
      sublabel: "text-accent-foreground/60"
    }
  };

  const miniChartBars = [40, 65, 45, 80, 55, 90, 70, 100];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`${variants[variant]} rounded-2xl p-4 virr-card-shadow relative overflow-hidden`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {Icon && (
              <Icon className={`w-4 h-4 ${textVariants[variant].label}`} />
            )}
            <span className={`text-xs font-medium ${textVariants[variant].label}`}>
              {label}
            </span>
          </div>
          {sublabel && (
            <span className={`text-[10px] ${textVariants[variant].sublabel} block mb-1`}>
              {sublabel}
            </span>
          )}
          <span className={`text-2xl font-bold ${textVariants[variant].value}`}>
            {value}
          </span>
        </div>
        
        {showChart && (
          <div className="flex items-end gap-0.5 h-10">
            {miniChartBars.map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: delay + i * 0.05 }}
                className={`w-1.5 rounded-full ${
                  variant === "primary" 
                    ? "bg-primary-foreground/30" 
                    : "bg-primary/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
