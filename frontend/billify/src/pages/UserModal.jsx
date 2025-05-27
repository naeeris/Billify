import { useEffect, useState } from "react";
import { createUser, updateUser } from "../services/userService";
import useDarkMode from "../components/hooks/DarkMode";

const UserModal = ({ show, onClose, onUserSaved, user }) => {
  const DarkMode = useDarkMode();
  const isEditMode = !!user;

  // Estado para el formulario del usuario, por defecto vacío y con rol inicial "estandar"
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "estandar",
    is_active: true,
  });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
        password: "",
        role: user.role,
        is_active: user.is_active,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      role: "estandar",
      is_active: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await updateUser(user.id, {
          ...form,
          password: form.password || undefined, // evita sobreescribir si está vacía
        });
      } else {
        await createUser(form);
      }

      if (onUserSaved) onUserSaved(true);
    } catch (err) {
      console.error("Error al guardar usuario:", err);
    }
  };

  const handleSaveAndNew = async () => {
    try {
      await createUser(form);
      if (onUserSaved) onUserSaved(false);
      resetForm();
    } catch (err) {
      console.error("Error al crear usuario:", err);
    }
  };

  if (!show) return null;

  const containerClass = DarkMode ? "bg-dark text-white border-secondary" : "";

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 2000,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="modal-dialog">
        <div className={`modal-content ${containerClass}`}>
          <form onSubmit={handleSubmit}>
            <div className={`modal-header ${containerClass}`}>
              <h5 className="modal-title">
                {isEditMode ? "Editar usuario" : "Nuevo usuario"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className={`modal-body ${containerClass}`}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              {!isEditMode && (
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
              )}
              {isEditMode && (
                <input
                  type="password"
                  name="password"
                  placeholder="New Password (optional)"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control mb-2"
                />
              )}
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="form-select mb-2"
              >
                <option value="estandar">Standard</option>
                <option value="admin">Administrator</option>
              </select>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  id="activeCheck"
                />
                <label
                  className={`form-check-label ${DarkMode ? "text-white" : ""}`}
                  htmlFor="activeCheck"
                >
                  User active
                </label>
              </div>
            </div>
            <div className={`modal-footer ${containerClass}`}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              {!isEditMode && (
                <button type="button" className="btn btn-success" onClick={handleSaveAndNew}>
                  Save and add another
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {isEditMode ? "Save changes" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
