import { FaUserCircle, FaPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import useDarkMode from "../../hooks/DarkMode";
import InvoiceModal from "../../../pages/InvoiceModal";
import CreditNoteModal from "../../../pages/CreditNoteModal";
import SupplierModal from "../../../pages/SupplierModal";
import UserModal from "../../../pages/UserModal";
import "./Navbar.css";

const Navbar = ({
  collapsed,
  setRefreshInvoices,
  setRefreshCreditNotes,
  setRefreshSuppliers,
  setRefreshUsers,
}) => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const navigate = useNavigate(); // Hook para navegar a diferentes rutas
  const DarkMode = useDarkMode();

  const username = localStorage.getItem("username");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showCreditNoteModal, setShowCreditNoteModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // Funcion para manejar la creación de facturas
  const handleInvoiceCreated = (shouldClose = true) => {
    setRefreshInvoices((prev) => !prev); // ← esto notifica al padre que recargue
    if (shouldClose) {
      setShowInvoiceModal(false); // ← esto cierra el modal
    }
  };

  // Funcion para manejar la creación de abonos
  const handleCreditNoteCreated = (shouldClose = true) => {
    setRefreshCreditNotes((prev) => !prev); // ← esto notifica al padre que recargue
    if (shouldClose) {
      setShowCreditNoteModal(false); // ← esto cierra el modal
    }
  };

  // Funcion para manejar la creación de proveedores
  const handleSupplierSaved = (shouldClose = true) => {
    setRefreshSuppliers((prev) => !prev); // ← esto notifica al padre que recargue
    if (shouldClose) setShowSupplierModal(false);
  };

  // Funcion para manejar la creación de usuarios
  const handleUserSaved = (shouldClose = true) => {
    setRefreshUsers((prev) => !prev);
    if (shouldClose) setShowUserModal(false);
  };

  // Determina el texto del botón según la ruta actual
  const getButtonType = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("invoices")) return "New Invoice";
    if (path.includes("credit-notes")) return "New Credit Note";
    if (path.includes("suppliers")) return "New Supplier";
    if (path.includes("users")) return "New User";
    return "New Item"; // Valor por defecto si no coincide con ninguna ruta
  };

  // Maneja el clic en el botón contextual y redirige a la ruta correspondiente
  const handleAddClick = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("invoices")) {
      setShowInvoiceModal(true); // ← en lugar de navigate
    } else if (path.includes("credit-notes")) {
      setShowCreditNoteModal(true); // ← en lugar de navigate
    } else if (path.includes("suppliers")) {
      setShowSupplierModal(true); // ← en lugar de navigate
    } else if (path.includes("users")) {
      setShowUserModal(true);
    } else navigate("/create");
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav
      className={`navbar ${collapsed ? "collapsed" : ""} ${
        DarkMode ? "dark-mode" : ""
      }`}
    >
      <div className="navbar-content">
        {/* Botón contextual */}
        <button className="add-button" onClick={handleAddClick}>
          <FaPlus className="button-icon" />
          {getButtonType()}
        </button>

        {/* Área de usuario - Redirige al perfil */}
        <div className="user-area" onClick={() => navigate("/profile")}>
          <span className="welcome-text">
            Welcome, <strong>{username}</strong>
          </span>
          <FaUserCircle className="user-icon me-2" />
          <button
            onClick={handleLogout}
            title="Log out"
            className="btn btn-outline-danger btn-sm"
          >
            <FiLogOut />
          </button>
        </div>
      </div>
      {showInvoiceModal && (
        <InvoiceModal
          show={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          onInvoiceCreated={handleInvoiceCreated}
        />
      )}
      {showCreditNoteModal && (
        <CreditNoteModal
          show={showCreditNoteModal}
          onClose={() => setShowCreditNoteModal(false)}
          onCreditNoteCreated={handleCreditNoteCreated}
        />
      )}
      {showSupplierModal && (
        <SupplierModal
          show={showSupplierModal}
          onClose={() => setShowSupplierModal(false)}
          onSupplierSaved={handleSupplierSaved}
          supplier={null} // Aquí puedes pasar un proveedor específico si es necesario
        />
      )}
      {showUserModal && (
        <UserModal
          show={showUserModal}
          onClose={() => setShowUserModal(false)}
          onUserSaved={handleUserSaved}
          user={null}
        />
      )}
    </nav>
  );
};

export default Navbar;
