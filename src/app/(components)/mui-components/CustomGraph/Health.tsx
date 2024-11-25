import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Health: React.FC<any> = ({ data }) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={550}>
      <LineChart data={data}>
        {/* <Legend
          layout="horizontal"
          verticalAlign="top"
          align="center"
          iconType="circle"
        /> */}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="createdAt"
          tickSize={3}
          tickMargin={16}
          height={100}
          width={500}
          unit={""}
          angle={-45}
          textAnchor="middle"
        />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="averageValue"
          activeDot={{ r: 8 }}
          stroke="#8884d8"
        />
        {/* <Line type="monotone" dataKey="maxValue" stroke="#82ca9d" />
        <Line type="monotone" dataKey="minValue" stroke="#ffc658" />
     */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Health;
