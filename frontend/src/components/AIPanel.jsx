import { useState } from "react";
import api from "../services/api";

function AIPanel() {

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [error, setError] = useState("");

  const fetchAIResponse = async () => {

    setLoading(true);

    setError("");

    try {

      // Replace endpoint later if needed
      const result = await api.post("/ai/recommend", {

        title: "WFH Policy",
        description: "Work from home for employees"

      });

      setResponse(result.data);

    } catch (err) {

      console.error(err);

      // Temporary dummy response if backend AI not ready
      setResponse({

        summary: "Work from home policy for employees",

        recommendation:
          "Approve with manager consent",

        priority: "High"

      });

      setError(
        "AI backend not connected. Showing dummy response."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">

          AI Policy Assistant

        </h1>

        <button
          onClick={fetchAIResponse}
          className="bg-blue-500 hover:bg-blue-700 transition duration-300 text-white px-4 py-2 rounded"
        >

          Generate AI Response

        </button>

        {loading && (

          <div className="mt-6">

            <div className="animate-pulse text-blue-600 text-lg">

              Loading AI response...

            </div>

          </div>

        )}

        {error && (

          <div className="mt-4 text-red-500">

            {error}

          </div>

        )}

        {response && !loading && (

          <div className="mt-6 bg-gray-50 border rounded-lg p-5 shadow">

            <h2 className="text-2xl font-semibold text-blue-700 mb-4">

              AI Recommendation

            </h2>

            <div className="mb-3">

              <span className="font-bold">

                Summary:

              </span>

              <p className="text-gray-700">

                {response.summary}

              </p>

            </div>

            <div className="mb-3">

              <span className="font-bold">

                Recommendation:

              </span>

              <p className="text-gray-700">

                {response.recommendation}

              </p>

            </div>

            <div>

              <span className="font-bold">

                Priority:

              </span>

              <span className="ml-2 text-blue-700 font-semibold">

                {response.priority}

              </span>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default AIPanel;