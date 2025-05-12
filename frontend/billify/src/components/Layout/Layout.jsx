import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import useDarkMode from '../hooks/DarkMode';
import './Layout.css';

const Layout = () => {
  const DarkMode = useDarkMode();

  return (
    <div className={`app-container ${DarkMode ? 'dark-mode' : ''}`}>
      <Sidebar />
      <div className="content-area">
        <Navbar />
        <main className="main-content">
          <Outlet /> {/* Aquí se renderizarán las rutas */}
        </main>
      </div>
    </div>
  );
};

export default Layout;