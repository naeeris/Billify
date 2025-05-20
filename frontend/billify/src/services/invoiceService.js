import axios from "./axiosInstance";

export const getInvoices = async () => {
  const response = await axios.get("/invoices/");
  return response.data;
};

export const createInvoice = async (invoiceData) => {
  const response = await axios.post("/invoices/", invoiceData);
  return response.data;
};

export const deleteInvoice = async (id) => {
  const response = await axios.delete(`/invoices/${id}/`);
  return response.data;
};

export const updateInvoice = async (id, invoiceData) => {
  const response = await axios.put(`/invoices/${id}/`, invoiceData);
  return response.data;
};