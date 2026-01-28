import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";

const data = [
  { year: "2027", value: 1900 },
  { year: "2028", value: 2200 },
  { year: "2029", value: 2500 },
  { year: "2030", value: 2800 },
  { year: "2031", value: 3200 },
  { year: "2032", value: 3500 },
  { year: "2033", value: 3900 },
  { year: "2034", value: 4200 },
  { year: "2035", value: 4600 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium">
        €{payload[0].value.toLocaleString()}
      </div>
    );
  }
  return null;
};

const ProjectionChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-2xl p-4 virr-card-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Очаквано салдо</h3>
        <span className="text-xs text-muted-foreground">10 години</span>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="15%">
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
              interval={1}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`hsl(var(--primary) / ${0.3 + (index * 0.07)})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-accent rounded-xl p-3 text-center">
          <p className="text-[10px] text-muted-foreground mb-1">Инвестирате</p>
          <p className="text-sm font-bold text-foreground">€1 638</p>
        </div>
        <div className="virr-gradient rounded-xl p-3 text-center">
          <p className="text-[10px] text-primary-foreground/70 mb-1">Очаквана печалба</p>
          <p className="text-sm font-bold text-primary-foreground">€2 794</p>
        </div>
        <div className="bg-accent rounded-xl p-3 text-center">
          <p className="text-[10px] text-muted-foreground mb-1">Общо</p>
          <p className="text-sm font-bold text-foreground">€4 432</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectionChart;
