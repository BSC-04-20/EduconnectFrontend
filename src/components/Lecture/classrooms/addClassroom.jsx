import React, { useState } from "react"; 
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { useNavigate } from "react-router-dom";

function AddClassForm() {
  const [className, setClassName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!className) {
      setErrorMessage("Class name is required!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await AuthenticatedUserUrl.post("/classes/create", {
        name: className,
      });

      if (response.status === 201 || response.status === 200) {
        alert("Class added successfully!");
        setClassName(""); // Reset form
        navigator("/lecture/classroom")
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error adding class. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mt-24 my-auto mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Create New Class
      </h2>
      {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="className">
            Class Name
          </label>
          <input
            type="text"
            id="className"
            name="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            placeholder="Enter class name"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-sky-900 text-white font-semibold rounded-lg mt-4"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Class"}
        </button>
      </form>
    </div>
  );
}

export default AddClassForm;
