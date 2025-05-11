import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CurrencyCode, formatCurrency, currencySymbols } from "@/lib/currency";

interface ResultsChartProps {
  data: number[];
  currency: CurrencyCode;
}

export default function ResultsChart({ data, currency }: ResultsChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const monthNames = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", 
                      "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12"];
  
  useEffect(() => {
    // Format data for the chart
    const formattedData = data.map((value, index) => ({
      name: monthNames[index],
      value: Math.round(value)
    }));
    
    setChartData(formattedData);
  }, [data]);

  const formatYAxis = (value: number) => {
    // Simple formatting for axis labels
    if (currency === 'USD') {
      return `${currencySymbols[currency]}${value.toLocaleString()}`;
    } else {
      return `${value.toLocaleString()} ${currencySymbols[currency]}`;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-blackened p-2 rounded text-white border border-cherry shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm font-bold">
            {formatCurrency(payload[0].value, currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 182, 204, 0.2)" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#021d33', fontSize: 12 }}
          axisLine={{ stroke: '#dfe4ef' }}
          tickLine={{ stroke: '#dfe4ef' }} 
        />
        <YAxis 
          tickFormatter={formatYAxis}
          tick={{ fill: '#021d33', fontSize: 12 }}
          axisLine={{ stroke: '#dfe4ef' }}
          tickLine={{ stroke: '#dfe4ef' }} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#d60d46" 
          strokeWidth={3}
          dot={{ r: 4, fill: "#d60d46", stroke: "#d60d46" }}
          activeDot={{ r: 6, fill: "#d60d46", stroke: "#fff", strokeWidth: 2 }}
          fill="url(#colorUv)"
        />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d60d46" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#d60d46" stopOpacity={0.05}/>
          </linearGradient>
        </defs>
      </LineChart>
    </ResponsiveContainer>
  );
}
