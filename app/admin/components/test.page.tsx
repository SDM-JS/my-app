"use client"

// // import { useTheme } from "next-themes"
// // import Image from "next/image"
// // import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
// // // { cameFromData }: { cameFromData: { internet: number, wordOfMouth: number, socialMedia: number } [] }
// // export default function StatsChart() {
// //     const { resolvedTheme } = useTheme()
// //     const data = [
// //         {
// //             name: 'Page A',
// //             uv: 4000,
// //             pv: 2400,
// //             amt: 2400,
// //         },
// //         {
// //             name: 'Page B',
// //             uv: 3000,
// //             pv: 1398,
// //             amt: 2210,
// //         },
// //     ];

// //     return (
// //         <div className="rounded-lg p-4 h-full">
// //             <div className="flex justify-between items-center">
// //                 <h1 className="text-lg font-semibold">some Rents</h1>
// //                 <Image src="/next.svg" alt="te" width={20} height={20} />
// //             </div>
// //             <ResponsiveContainer width="100%" height="90%">
// //                 <BarChart width={500} height={300} data={data} barSize={20}>
// //                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
// //                     <XAxis
// //                         dataKey="name"
// //                         axisLine={false}
// //                         tick={{ fill: resolvedTheme === "dark" ? "#d1d5db" : "" }}
// //                         tickLine={false}
// //                     />
// //                     <YAxis
// //                         axisLine={false}
// //                         tick={{ fill: resolvedTheme === "dark" ? "#d1d5db" : "" }}
// //                         tickLine={false}
// //                     />
// //                     <Tooltip
// //                         contentStyle={{
// //                             borderRadius: "10px",
// //                             borderColor: "lightgray",
// //                             color: "black"
// //                         }}
// //                         itemStyle={{ color: "black" }}
// //                     />
// //                     <Legend
// //                         align="left"
// //                         verticalAlign="top"
// //                         wrapperStyle={{
// //                             paddingTop: "20px",
// //                             paddingBottom: "40px"
// //                         }}
// //                     />
// //                     <Bar
// //                         dataKey="uv"
// //                         fill={resolvedTheme === "dark" ? "#fff" : "#000"}
// //                         legendType="circle"
// //                         radius={[10, 10, 0, 0]}
// //                     />
// //                     <Bar
// //                         dataKey="pv"
// //                         fill={"#000"}
// //                         legendType="circle"
// //                         radius={[10, 10, 0, 0]}
// //                     />
// //                 </BarChart>
// //             </ResponsiveContainer>
// //         </div>
// //     )
// // }
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// #region Sample data
const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

// #endregion
const BiaxialBarChart = () => {
    return (
        <BarChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            data={data}
            margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
        </BarChart>
    );
};

export default BiaxialBarChart;