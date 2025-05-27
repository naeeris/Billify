import { useState, useEffect } from "react"; //Con este estado manejamos el colapsado del sidebar
import {
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaUsers,
  FaChartBar,
  FaChevronLeft,
  FaUserShield
} from "react-icons/fa";
import useDarkMode from "../../hooks/DarkMode";
import SidebarItem from "./SidebarItem";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const DarkMode = useDarkMode();
  const [isAdmin, setIsAdmin] = useState(false);

  // Aquí agregamos la lógica para determinar si el usuario es administrador mediante el role
  useEffect(() => {
    const role = localStorage.getItem("role"); // Obtenemos el role del usuario desde localStorage
    setIsAdmin(role === "admin");
  }, []);

  // Función para alternar el estado del sidebar, cambiando entre colapsado y expandido con true o false
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Elementos del menú del sidebar
  const menuItems = [
    { id: "invoices", label: "Invoices", icon: <FaFileInvoice /> },
    { id: "credit-notes", label: "Credit Notes", icon: <FaFileInvoiceDollar /> },
    { id: "statics", label: "Statics", icon: <FaChartBar /> },
  ];

  // Si el usuario es administrador, agregamos el elemento de proveedores y usuarios al sidebar
  if (isAdmin) {
    menuItems.push({
      id: "suppliers",
      label: "Suppliers",
      icon: <FaUsers />,
    });
    menuItems.push({
      id: "users",
      label: "Users",
      icon: <FaUserShield />,
    });
  }

  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : ""} ${
        DarkMode ? "dark-mode" : ""
      }`}
    >
      {" "}
      {/* Sidebar principal con clase condicional para colapsado o no*/}
      {/* Encabezado del Sidebar */}
      <div className="sidebar-header">
        {!collapsed && <h3>Billify</h3>}{" "}
        {/* Título del sidebar, solo se muestra cuando no está colapsado */}
      </div>
      {/* Menú de Navegación - Mapea el array del menu para generar los botones de navegación */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
          />
        ))}
      </nav>
      {/* Pie del Sidebar */}
      <div className="sidebar-footer">
        <button className="hide-btn" onClick={toggleSidebar}>
          <FaChevronLeft
            className={`hide-icon ${collapsed ? "rotated" : ""}`}
          />
          {!collapsed && <span className="hide-text">Hide</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
