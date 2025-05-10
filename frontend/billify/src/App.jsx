import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar   from './components/Layout/Navbar'
import Sidebar  from './components/Layout/Sidebar'
import Dashboard   from './components/Dashboard/Dashboard'
import InvoiceList from './components/Invoices/InvoiceList'
import InvoiceForm from './components/Invoices/InvoiceForm'
import InvoiceView from './components/Invoices/InvoiceView'

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/"                      element={<Dashboard />} />
            <Route path="/invoices"              element={<InvoiceList />} />
            <Route path="/invoices/new"          element={<InvoiceForm />} />
            <Route path="/invoices/edit/:id"     element={<InvoiceForm edit />} />
            <Route path="/invoices/:id"          element={<InvoiceView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

