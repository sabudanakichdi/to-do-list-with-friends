import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Text } from "recharts";
import axios from "axios";
import config from "../../config.json";

const backendUrl = config.backendUrl;

function PieChartComponent({ title, group }) {
  const [groupStats, setGroupStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (group) {
          const response = await axios.get(
            backendUrl + `/api/dashboard/${group}/stats`
          );
          const data = response.data;
          console.log("Group Stats", data);

          setGroupStats(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [group]);


  let scaledData = null;
  if (groupStats === null) {
    scaledData = null;
  } else {
    scaledData = Object.entries(groupStats).map(([status, count]) => ({
      name: status,
      value: count * 300,
      color:
        status === "in-progress"
          ? "#FED0EE"
          : status === "to-do"
          ? "#DFAEFF"
          : "#D0E8FF",
    }));
  }

  // Custom label function
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
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
        {scaledData[index].name}
      </Text>
    );
  };

  return (
    <div className="pie-chart-component">
      <h3>{title}</h3>
      {groupStats ? (
        <PieChart width={200} height={200}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={scaledData}
            cx={100}
            cy={100}
            outerRadius={95}
            label={renderCustomLabel}
            labelLine={false}
          >
            {scaledData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PieChartComponent;
