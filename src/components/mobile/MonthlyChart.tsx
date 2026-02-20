import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const data = [
  { month: "05", value: 1 },
  { month: "06", value: 1 },
  { month: "07", value: 3 },
  { month: "08", value: 4 },
  { month: "09", value: 6 },
  { month: "10", value: 9 },
  { month: "11", value: 12 },
  { month: "12", value: 15 },
];

const MonthlyChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-2xl p-4 virr-card-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Месечна печалба</h3>
        <span className="text-xs text-muted-foreground">2025</span>
      </div>
      
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `€${value}`}
              width={35}
            />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === data.length - 1 
                    ? 'hsl(var(--primary))' 
                    : 'hsl(var(--primary) / 0.4)'
                  } 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MonthlyChart;
