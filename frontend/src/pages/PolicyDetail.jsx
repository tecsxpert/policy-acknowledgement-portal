
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

import StatusBadge from "../components/StatusBadge";

function PolicyDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [policy, setPolicy] = useState(null);

  useEffect(() => {

    fetchPolicy();

  }, []);

  const fetchPolicy = async () => {

    try {

      const response = await api.get(`/policies/${id}`);

      setPolicy(response.data);

    } catch (error) {

      console.error("Error fetching policy", error);

    }
  };

  const deletePolicy = async () => {

    try {

      await api.delete(`/policies/${id}`);

      alert("Policy Deleted");

      navigate("/");

    } catch (error) {

      console.error(error);

    }
  };

  if (!policy) {

    return (

      <div className="p-6 text-blue-600">

        Loading...

      </div>
    );
  }

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="bg-white shadow-md rounded p-6 max-w-2xl">

        <h1 className="text-3xl font-bold text-blue-700 mb-4">

          {policy.title}

        </h1>

        <div className="mb-4">

          <StatusBadge status={policy.status} />

        </div>

        <p className="text-gray-700 mb-4">

          {policy.description}

        </p>
        <div className="mb-2">

            <span className="font-semibold">
                Policy ID:
            </span>

            {" "}

             {policy.id}

        </div>

        <div className="mb-2">

          <span className="font-semibold">
            Category:
          </span>

          {" "}

          {policy.category}

        </div>

        <div className="mb-6">

          <span className="font-semibold">
            Created At:
          </span>

          {" "}

          {policy.createdAt}

        </div>

        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-700 transition duration-300 text-white px-4 py-2 rounded"
          >

            Back

          </button>

          <button
            onClick={deletePolicy}
            className="bg-red-500 hover:bg-red-700 transition duration-300 text-white px-4 py-2 rounded"
          >

            Delete

          </button>

        </div>

      </div>

    </div>
  );
}

export default PolicyDetail;