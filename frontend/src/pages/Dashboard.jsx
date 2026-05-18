import { useEffect, useState } from "react";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import KpiCard from "../components/KpiCard";

function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const response = await api.get("/policies/stats");

      setStats(response.data);

    } catch (error) {

      console.error("Error fetching stats", error);

    }
  };

  const chartData = [

    {
      name: "Approved",
      value: stats.approved,
    },

    {
      name: "Pending",
      value: stats.pending,
    },

    {
      name: "Rejected",
      value: stats.rejected,
    },

  ];

  const COLORS = [
    "#22c55e",
    "#eab308",
    "#ef4444",
  ];

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">

        Dashboard

      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        <KpiCard
          title="Total Policies"
          value={stats.total}
        />

        <KpiCard
          title="Approved"
          value={stats.approved}
        />

        <KpiCard
          title="Pending"
          value={stats.pending}
        />

        <KpiCard
          title="Rejected"
          value={stats.rejected}
        />

      </div>

      <div className="bg-white p-4 md:p-6 rounded shadow-md overflow-x-auto">

        <h2 className="text-xl font-semibold mb-4">

          Policy Status Chart

        </h2>

       <PieChart width={300} height={250}>

          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >

            {chartData.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </div>

    </div>
  );
}

export default Dashboard;