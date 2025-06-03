import { NavLink, useMatch } from "react-router-dom";
import { toast } from "react-toastify";

const SidebarItem = ({ icon, label, id, collapsed }) => {
  const match = useMatch(`/${id}/*`);
  const isActive = Boolean(match);

  const handleClick = (e) => {
    if (id === "statics") {
      e.preventDefault(); // cancela la navegación
      toast.info("Coming soon... This feature is not available yet.");
    }
  };

  return (
    <NavLink to={`/${id}`} className={`sidebar-item ${isActive ? "active" : ""}`} onClick={handleClick}>
      <span className="sidebar-icon">{icon}</span>
      {!collapsed && <span className="sidebar-label">{label}</span>}
    </NavLink>
  );
};

export default SidebarItem;
