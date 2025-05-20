import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import Layout from "./components/Layout/Layout";
import Invoices from "./pages/Invoices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas protegidas por token */}
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/invoices" element={<Invoices />} />
          </Route>
        </Route>

        {/* Cualquier otra ruta redirige al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Aquí sí es correcto */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}


export default App;
