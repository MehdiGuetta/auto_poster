import { useState } from "react";
import axios from "axios";

const Test = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const url = `http://localhost/autoPoster/api/users.php?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`;

      const response = await axios.get(url);

      console.log(response.data)

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
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {user && <div>Welcome, {user.name}</div>}
    </div>
  );
};

export default Test;
