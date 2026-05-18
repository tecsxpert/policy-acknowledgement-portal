import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

function Analytics() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/policies/stats"
      );

      const stats = response.data;

      const formattedData = [
        {
          name: "Approved",
          value: stats.approved
        },
        {
          name: "Pending",
          value: stats.pending
        },
        {
          name: "Rejected",
          value: stats.rejected
        }
      ];

      setData(formattedData);

    } catch (error) {

      console.error("Error fetching analytics:", error);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
  Analytics Dashboard
</h1>

      <select>
        <option>This Week</option>
        <option>This Month</option>
        <option>This Year</option>
      </select>

      <div style={{ marginTop: "30px" }}>

        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>

      </div>

      <div style={{ marginTop: "30px" }}>

        <BarChart width={300} height={250} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" />
        </BarChart>

      </div>

    </div>
  );
}

export default Analytics;