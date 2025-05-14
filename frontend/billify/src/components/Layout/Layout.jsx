import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import useDarkMode from "../hooks/DarkMode";
import { useState } from "react";
import "./Layout.css";

const Layout = () => {
  const DarkMode = useDarkMode();
  const [collapsed, setCollapsed] = useState(false);
  const [refreshInvoices, setRefreshInvoices] = useState(false);


  const handleInvoiceCreated = () => {
    setRefreshInvoices((prev) => !prev); // 🔄 Cambia el flag para que Invoices.jsx lo detecte
    setShowInvoiceModal(false); // Cierra el modal
  };

  return (
    <div className={`app-container ${DarkMode ? "dark-mode" : ""}`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`content-area ${collapsed ? "collapsed" : ""}`}>
        <Navbar collapsed={collapsed} setRefreshInvoices={setRefreshInvoices} />
        <main
          className={`main-content ${DarkMode ? "dark-mode" : ""} ${
            collapsed ? "collapsed" : ""
          }`}
        >
          <Outlet context={{ refreshInvoices }} /> {/* Aquí se renderizarán las rutas hijas */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
