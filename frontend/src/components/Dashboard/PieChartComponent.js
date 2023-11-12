import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Text } from 'recharts';

function PieChartComponent({ title }) {
  const data = [
    { name: 'In-Progress', value: 300, color: '#FED0EE' },
    { name: 'To-Do', value: 400, color: '#DFAEFF' },
    { name: 'Completed', value: 300, color: '#D0E8FF' },
  ];

  // Custom label function
  const renderCustomLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, index
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <Text
        x={x}
        y={y}
        fill="#555"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {data[index].name}
      </Text>
    );
  };

  return (
    <div className="pie-chart-component">
      <h3>{title}</h3>
      <PieChart width={200} height={200}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx={100}
          cy={100}
          outerRadius={95}
          label={renderCustomLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default PieChartComponent;

