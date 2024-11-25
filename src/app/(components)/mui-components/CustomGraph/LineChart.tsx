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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const LineChartCom = () => {
  return (
    <ResponsiveContainer height={400} width="100%">
      <LineChart data={data}>
        <Legend
          layout="horizontal"
          verticalAlign="top"
          align="center"
          iconType="circle"
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="pv"
          stroke="#00028C"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#6DA430" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartCom;
// import React from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// interface ViewCountData {
//   _id: string;
//   views: number;
// }

// interface CustomBarProps {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   fill: string;
// }

// const CustomRoundedBar: React.FC<CustomBarProps> = ({
//   x,
//   y,
//   width,
//   height,
//   fill,
// }) => {
//   // Define the arc radius for rounding the top corners
//   const radius = 10;

//   return (
//     <path
//       d={`
//         M${x},${y + height}
//         v${-height + radius}
//         a${radius},${radius} 0 0,1 ${radius},-${radius}
//         h${width - 2 * radius}
//         a${radius},${radius} 0 0,1 ${radius},${radius}
//         v${height - radius}
//         z
//       `}
//       fill={fill}
//     />
//   );
// };

// // Define the props for CustomGraph
// interface CustomGraphProps {
//   viewCount: ViewCountData[];
// }

// const CustomGraph: React.FC<CustomGraphProps> = ({ viewCount }) => {
//   const colors = {
//     steps: {
//       stroke: "#6D6ED1",
//       fill: "#6D6ED1",
//     },
//     text: "#697077",
//     background: "#fff",
//   };

//   return (
//     <ResponsiveContainer height={600} width="100%">
//       <BarChart data={viewCount}>
//         <XAxis
//           dataKey="day"
//           tickSize={8}
//           tickMargin={15}
//           tick={{ fill: colors.text }}
//           tickLine={{ stroke: colors.text }}
//           height={50}
//         />
//         <YAxis
//           tick={{ fill: colors.text }}
//           tickLine={{ stroke: colors.text }}
//         />
//         <CartesianGrid strokeDasharray="1" />
//         <Tooltip
//           contentStyle={{
//             backgroundColor: colors.background,
//             color: "#222",
//           }}
//           itemStyle={{ color: colors.steps.stroke }}
//         />
//         <Bar
//           dataKey="count"
//           stroke={colors.steps.stroke}
//           fill={colors.steps.fill}
//           strokeWidth={6}
//           barSize={18}
//           //   shape={CustomRoundedBar}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default CustomGraph;
