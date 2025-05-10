import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
})

export const getInvoices     = () => api.get('/invoices').then(r => r.data)
export const getInvoiceById  = id => api.get(`/invoices/${id}`).then(r => r.data)
export const createInvoice   = inv => api.post('/invoices', inv).then(r => r.data)
export const updateInvoice   = (id, inv) => api.put(`/invoices/${id}`, inv).then(r => r.data)
export const deleteInvoice   = id => api.delete(`/invoices/${id}`).then(r => r.data)