import { FaUserCircle, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDarkMode from "../../hooks/DarkMode";
import InvoiceModal from "../../../pages/InvoiceModal";
import "./Navbar.css";

const Navbar = ({ collapsed, setRefreshInvoices }) => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const navigate = useNavigate(); // Hook para navegar a diferentes rutas
  const DarkMode = useDarkMode();

  const username = localStorage.getItem("username");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleInvoiceCreated = (shouldClose = true) => {
    setRefreshInvoices((prev) => !prev); // ← esto notifica al padre que recargue
    if (shouldClose) {
      setShowInvoiceModal(false); // ← esto cierra el modal
    }
  };

  // Determina el texto del botón según la ruta actual
  const getButtonType = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("invoices")) return "New Invoice";
    if (path.includes("creditnotes")) return "New Credit Note";
    if (path.includes("suppliers")) return "New Supplier";
    return "New Item"; // Valor por defecto si no coincide con ninguna ruta
  };

  // Maneja el clic en el botón contextual y redirige a la ruta correspondiente
  const handleAddClick = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("invoices")) {
      setShowInvoiceModal(true); // ← en lugar de navigate
    } else if (path.includes("creditnotes")) navigate("/creditnotes/new");
    else if (path.includes("suppliers")) navigate("/suppliers/new");
    else navigate("/create");
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
          <FaUserCircle className="user-icon" />
        </div>
      </div>
      {showInvoiceModal && (
        <InvoiceModal
          show={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          onInvoiceCreated={handleInvoiceCreated}
        />
      )}
    </nav>
  );
};

export default Navbar;
