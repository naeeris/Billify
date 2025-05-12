import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import InvoicesMenu from './components/Invoices/InvoicesMenu';
import './App.css';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rutas principales */}
         
          
          
          {/* Rutas de creación */}
          
        </Route>
      </Routes>
  )
}

export default App