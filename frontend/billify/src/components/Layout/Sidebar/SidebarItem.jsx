import { NavLink, useMatch } from 'react-router-dom';

import 'react-tooltip/dist/react-tooltip.css';

const SidebarItem = ({ icon, label, id, collapsed }) => {
  // Verifica si la ruta actual coincide con el ítem
  const match = useMatch(`/${id}/*`);
  const isActive = Boolean(match);

  return (
    <>
      <NavLink
        to={`/${id}`}
        className={`sidebar-item ${isActive ? 'active' : ''}`}
        data-tooltip-id={`sidebar-tooltip-${id}`}
        data-tooltip-content={label}
        data-tooltip-place="right"
      >
        <span className="sidebar-icon">{icon}</span>
        {!collapsed && <span className="sidebar-label">{label}</span>}
      </NavLink>
      
      
    </>
  );
};

export default SidebarItem;