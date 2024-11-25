import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Stack } from "@mui/material";
interface ViewCountData {
  _id: string;
  views: number;
}

interface CustomBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

const CustomRoundedBar: React.FC<CustomBarProps> = ({
  x,
  y,
  width,
  height,
  fill,
}) => {
  // Define the arc radius for rounding the top corners
  const radius = 10;

  return (
    <path
      d={`
        M${x},${y + height} 
        v${-height + radius} 
        a${radius},${radius} 0 0,1 ${radius},-${radius} 
        h${width - 2 * radius} 
        a${radius},${radius} 0 0,1 ${radius},${radius} 
        v${height - radius} 
        z
      `}
      fill={fill}
    />
  );
};

// Define the props for CustomGraph
interface CustomGraphProps {
  viewCount: ViewCountData[];
}

const CustomGraph: React.FC<CustomGraphProps> = ({ viewCount }) => {
  const colors = {
    steps: {
      stroke: "#6D6ED1",
      fill: "#6D6ED1",
    },
    text: "#697077",
    background: "#fff",
  };

  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={600} width="100%">
        <BarChart data={viewCount}>
          <XAxis
            dataKey="day"
            tickSize={1}
            tickMargin={35}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            height={80}
            width={500}
            unit={""}
            angle={-45} // Set angle to 0 to make the labels horizontal
            textAnchor="middle" // Center the text horizontally
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              color: "#222",
            }}
            itemStyle={{ color: colors.steps.stroke }}
          />
          <Bar
            dataKey="count"
            stroke={colors.steps.stroke}
            fill={colors.steps.fill}
            strokeWidth={2}
            barSize={20}
            // shape={CustomRoundedBar}
          />
        </BarChart>
      </ResponsiveContainer>
    </Stack>
  );
};

export default CustomGraph;
