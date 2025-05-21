import { NavLink, useMatch } from "react-router-dom";

const SidebarItem = ({ icon, label, id, collapsed }) => {
  const match = useMatch(`/${id}/*`);
  const isActive = Boolean(match);

  return (
    <NavLink to={`/${id}`} className={`sidebar-item ${isActive ? "active" : ""}`}>
      <span className="sidebar-icon">{icon}</span>
      {!collapsed && <span className="sidebar-label">{label}</span>}
    </NavLink>
  );
};

export default SidebarItem;
