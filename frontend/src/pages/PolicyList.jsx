import { useEffect, useState } from "react";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";
import { Link } from "react-router-dom";

function PolicyList({ setEditPolicy, refresh }) {

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  useEffect(() => {

    fetchPolicies();

  }, [refresh]);

  useEffect(() => {

    const delaySearch = setTimeout(() => {

      fetchFilteredPolicies();

    }, 500);

    return () => clearTimeout(delaySearch);

  }, [search, statusFilter, fromDate, toDate]);

  const fetchPolicies = async () => {

    try {

      const response = await api.get("/policies");

      setPolicies(response.data);

      setLoading(false);

    } catch (error) {

      console.error("Error fetching policies:", error);

      setLoading(false);

    }
  };

  const fetchFilteredPolicies = async () => {

    try {

      let url = "/policies/search?";

      if (search) {
        url += `q=${search}&`;
      }

      if (statusFilter) {
        url += `status=${statusFilter}&`;
      }

      if (fromDate) {
        url += `from=${fromDate}&`;
      }

      if (toDate) {
        url += `to=${toDate}`;
      }

      if (
        !search &&
        !statusFilter &&
        !fromDate &&
        !toDate
      ) {

        fetchPolicies();

        return;
      }

      const response = await api.get(url);

      setPolicies(response.data);

    } catch (error) {

      console.error(
        "Error filtering policies:",
        error
      );

    }
  };

  const deletePolicy = async (id) => {

    try {

      await api.delete(`/policies/${id}`);

      fetchPolicies();

    } catch (error) {

      console.error(
        "Error deleting policy:",
        error
      );

    }
  };

  if (loading) {

    return (

      <div className="p-6 text-blue-600 text-lg">

        Loading policies...

      </div>
    );
  }

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6 text-blue-700">

        Policies

      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <input
          type="text"
          placeholder="Search policies..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 w-full md:w-64 rounded"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border p-2 rounded"
        >

          <option value="">
            All Status
          </option>

          <option value="Approved">
            Approved
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Rejected">
            Rejected
          </option>

        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) =>
            setFromDate(e.target.value)
          }
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) =>
            setToDate(e.target.value)
          }
          className="border p-2 rounded"
        />

      </div>

      {policies.length === 0 ? (

        <p className="text-gray-500">

          No policies found.

        </p>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] border border-gray-300 shadow-md rounded-lg">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="px-4 py-2 border">
                  ID
                </th>

                <th className="px-4 py-2 border">
                  Title
                </th>

                <th className="px-4 py-2 border">
                  Status
                </th>

                <th className="px-4 py-2 border">
                  Category
                </th>

                <th className="px-4 py-2 border">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {policies.map((policy) => (

                <tr
                  key={policy.id}
                  className="hover:bg-gray-100"
                >

                  <td className="px-4 py-2 border">

                    {policy.id}

                  </td>

                  <td className="px-4 py-2 border">

                    <Link
                      to={`/policy/${policy.id}`}
                      className="text-blue-600 hover:underline"
                    >

                      {policy.title}

                    </Link>

                  </td>

                  <td className="px-4 py-2 border">

                    <StatusBadge
                      status={policy.status}
                    />

                  </td>

                  <td className="px-4 py-2 border">

                    {policy.category}

                  </td>

                  <td className="px-4 py-2 border">

                    <button
                      onClick={() =>
                        setEditPolicy(policy)
                      }
                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2 text-sm"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        deletePolicy(policy.id)
                      }
                     className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default PolicyList;