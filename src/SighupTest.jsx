import { useState } from "react";
import axios from "axios";

const SignupTest = () => {
  const [name, setName] = useState("mehdiiiii");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("dfghjkhgfddfghj");
  const [timezone, setTimezone] = useState("UTC");
  const [createdAt, setCreatedAt] = useState("2025-01-29");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const url = "http://localhost/autoPoster/api/userSignup.php"; // URL for POST request
      const requestData = {
        name,
        email,
        password,
        token,
        timezone,
        createdAt,
      };

      const response = await axios.post(url, requestData); // Use POST method and send data in the body

      if (response.data.error) {
        setError(response.data.error);
        setUser(null);
      } else {
        setUser(response.data.user);
        setError("");
      }
    } catch (err) {
      setError("An error occurred during login.", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Enter your password"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="token"
          className="block text-sm font-medium text-gray-700"
        >
          Token
        </label>
        <input
          type="text"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Enter a token"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="timezone"
          className="block text-sm font-medium text-gray-700"
        >
          Timezone
        </label>
        <select
          id="timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
        >
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New York</option>
          <option value="Europe/London">Europe/London</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="createdAt"
          className="block text-sm font-medium text-gray-700"
        >
          Created At
        </label>
        <input
          type="datetime-local"
          id="createdAt"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4 text-center">
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </div>

      {error && <div className="text-red-600 text-center">{error}</div>}
      {user && (
        <div className="text-green-600 text-center">Welcome, {user.name}</div>
      )}
    </div>
  );
};

export default SignupTest;
