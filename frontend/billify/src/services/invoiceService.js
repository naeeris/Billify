import axios from "./axiosInstance";

export const getInvoices = async () => {
  const response = await axios.get("/invoices/");
  return response.data;
};
