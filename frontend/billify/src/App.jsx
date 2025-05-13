import { Routes, Route, Navigate  } from 'react-router-dom';
import Login from './components/Layout/Login';
import './App.css';



function App() {
  return (
        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Cualquier otra ruta redirige al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes> 
  )
}

export default App