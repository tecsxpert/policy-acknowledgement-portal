import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="bg-blue-700 text-white p-4 flex items-center justify-between sticky top-0 z-50">

      {/* Left side title */}
      <h1 className="text-xl font-bold">
        Policy Acknowledgement Portal
      </h1>

      {/* Right side navbar links */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="hover:text-gray-300"
        >
          Policies
        </Link>

        <Link
          to="/dashboard"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          to="/ai"
          className="hover:text-gray-300"
        >
          AI Panel
        </Link>

        <Link
          to="/analytics"
          className="hover:text-gray-300"
        >
          Analytics
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;