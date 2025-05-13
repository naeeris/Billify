import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "estandar",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    } catch (err) {
      setError("Error al iniciar sesión. Verifica tu usuario y contraseña.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Iniciar sesión</h2>

      <div>
        <label>Usuario:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {/*}
      <div>
        <label>Rol:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="estandar">Usuario Estándar</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Acceder</button>
    </form>
  );
};

export default Login;
