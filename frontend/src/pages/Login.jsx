import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Temporary dummy credentials for frontend testing
    const dummyEmail = "admin@gmail.com";
    const dummyPassword = "admin123";

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      alert("Login Successful");
      window.location.href = "/";
    } catch (error) {
      console.error("Backend login failed:", error);

      // Dummy login until Java Developer 1 completes JWT backend
      if (email === dummyEmail && password === dummyPassword) {
        localStorage.setItem("token", "dummy-token");

        alert("Dummy Login Successful");
        window.location.href = "/";
      } else {
        alert("Invalid credentials. Use admin@gmail.com / admin123");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 md:p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Test Login: admin@gmail.com / admin123
        </p>
      </form>
    </div>
  );
}

export default Login;