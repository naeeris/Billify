import axios from "./axiosInstance";

export const getInvoices = async () => {
  const response = await axios.get("/invoices/");
  return response.data;
};

export const createInvoice = async (invoiceData) => {
  const response = await axios.post("/invoices/", invoiceData);
  return response.data;
};