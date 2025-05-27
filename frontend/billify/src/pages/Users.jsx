import { useEffect, useState } from "react";
import useDarkMode from "../components/hooks/DarkMode";
import { getUsers, deleteUser } from "../services/userService";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserModal from "./UserModal";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refreshUsers, setRefreshUsers } = useOutletContext();

  const DarkMode = useDarkMode();
  
  // Para manejar la edición de usuarios
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const tableClass = `table table-hover align-middle ${DarkMode ? "table-dark" : "table-light"}`;

  // Verifica si el usuario es administrador
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/"); 
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshUsers]);

  if (loading) return <p>Loading users...</p>;

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await deleteUser(id);
      setRefreshUsers((prev) => !prev);
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  const handleCloseModal = () => {
  setSelectedUser(null);
  setShowUserModal(false);
  };

  const handleUserSaved = (shouldClose = true) => {
    setRefreshUsers((prev) => !prev);
    if (shouldClose) handleCloseModal();
  };

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <div style={{ width: "90%", maxWidth: "900px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <h2 className={DarkMode ? "text-white" : ""}>Users</h2>
        </div>

        <div className="table-responsive">
          <table className={tableClass}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.is_active ? "Yes" : "No"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm me-2"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUserModal(true);
                      }}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(user.id)}
                        title="Delete"
                      >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal para crear o editar usuario */}
        {showUserModal && (
          <UserModal
            show={showUserModal}
            onClose={handleCloseModal}
            onUserSaved={handleUserSaved}
            user={selectedUser}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
