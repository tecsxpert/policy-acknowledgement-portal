import { useState, useEffect } from "react";
import axios from "axios";

function PolicyForm({ editPolicy, fetchPolicies, clearEdit }) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    category: "",
  });

  useEffect(() => {

    if (editPolicy) {

      setFormData({
        title: editPolicy.title || "",
        description: editPolicy.description || "",
        status: editPolicy.status || "",
        category: editPolicy.category || "",
      });

    }

  }, [editPolicy]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editPolicy) {

        await axios.put(
          `http://localhost:8080/api/policies/${editPolicy.id}`,
          formData
        );

        alert("Policy Updated");

        clearEdit();

      } else {

        await axios.post(
          "http://localhost:8080/api/policies",
          formData
        );

        alert("Policy Added");
      }

      setFormData({
        title: "",
        description: "",
        status: "",
        category: "",
      });

      fetchPolicies();

    } catch (error) {

      console.error(error);
      alert("Error saving policy");

    }
  };

  return (

   <form
  onSubmit={handleSubmit}
  className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full"
>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <select
  name="status"
  value={formData.status}
  onChange={handleChange}
  className="border p-2 rounded w-full"
>

  <option value="">
    Select Status
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

     <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="border p-2 rounded w-full"
>

  <option value="">
    Select Category
  </option>

  <option value="HR">
    HR
  </option>

  <option value="IT">
    IT
  </option>

  <option value="Finance">
    Finance
  </option>

  <option value="Admin">
    Admin
  </option>

  <option value="Security">
    Security
  </option>

  <option value="Management">
    Management
  </option>

</select>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        {editPolicy ? "Update Policy" : "Add Policy"}
      </button>

    </form>
  );
}

export default PolicyForm;