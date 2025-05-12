import { useState } from 'react'; //Con este estado manejamos el colapsado del sidebar
import { FaFileInvoice, FaFileInvoiceDollar, FaUsers, FaChartBar, FaChevronLeft } from 'react-icons/fa';
import  useDarkMode  from '../../hooks/DarkMode';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false); // Estado para manejar el colapso del sidebar
  const DarkMode = useDarkMode();

  // Función para alternar el estado del sidebar, cambiando entre colapsado y expandido con true o false
  const toggleSidebar = () => { 
    setCollapsed(!collapsed);
  };

  // Elementos del menú del sidebar
  const menuItems = [
    { id: 'invoices', label: 'Invoices', icon: <FaFileInvoice /> },
    { id: 'creditNotes', label: 'Credit Notes', icon: <FaFileInvoiceDollar /> },
    { id: 'suppliers', label: 'Suppliers', icon: <FaUsers /> },
    { id: 'statics', label: 'Statics', icon: <FaChartBar /> },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${DarkMode ? 'dark-mode' : ''}`}> {/* Sidebar principal con clase condicional para colapsado o no*/}
      {/* Encabezado del Sidebar */}
      <div className="sidebar-header">
        {!collapsed && <h3>Billify</h3>} {/* Título del sidebar, solo se muestra cuando no está colapsado */}
      </div>
      
      {/* Menú de Navegación - Mapea el array del menu para generar los botones de navegación */}
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className="sidebar-item"
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
          </button>
        ))}
      </nav>
      
      {/* Pie del Sidebar */}
      <div className="sidebar-footer">
          <button className="hide-btn" onClick={toggleSidebar}>
            <FaChevronLeft className={`hide-icon ${collapsed ? 'rotated' : ''}`} />
            {!collapsed && <span className="hide-text">Hide</span>}
          </button>
      </div>
    </div>
  );
};

export default Sidebar;