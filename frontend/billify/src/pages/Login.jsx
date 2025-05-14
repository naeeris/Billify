import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService"; 
import useDarkMode from "../components/hooks/DarkMode"; 
import "./Login.css";

const Login = ({ onLogin }) => {

  const DarkMode = useDarkMode();
  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.access); // Usa 'token' para consistencia
      localStorage.setItem("userId", data.user_id); // <-- Asegúrate de que el backend envíe esto
      localStorage.setItem("username", formData.username);
      localStorage.setItem("role", data.role);

      navigate("/invoices");

    } catch (err) {
      setError("Error al iniciar sesión. Verifica tu usuario y contraseña.");
    }
  };

  return (
    <div className={`login-page ${DarkMode ? 'dark-mode' : ''}`}>
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4 text-white">Billify</h2>

        <div className="form-group mb-3">
          <label className="text-white">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className="text-white">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-light w-100 fw-bold">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
