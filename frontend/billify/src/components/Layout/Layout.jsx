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
  const [refreshCreditNotes, setRefreshCreditNotes] = useState(false);

  return (
    <div className={`app-container ${DarkMode ? "dark-mode" : ""}`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`content-area ${collapsed ? "collapsed" : ""}`}>
        <Navbar collapsed={collapsed} setRefreshInvoices={setRefreshInvoices} setRefreshCreditNotes={setRefreshCreditNotes} />
        <main
          className={`main-content ${DarkMode ? "dark-mode" : ""} ${
            collapsed ? "collapsed" : ""
          }`}
        >
          {/* Aquí se renderizarán las rutas hijas */}
          <Outlet
            context={{
              refreshInvoices, setRefreshInvoices,
              refreshCreditNotes, setRefreshCreditNotes,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Layout;
