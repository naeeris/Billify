import axios from "./axiosInstance";

export const getSuppliers = async () => {
  const response = await axios.get("/suppliers/");
  return response.data;
};

export const createSupplier = async (supplierData) => {
  const response = await axios.post("/suppliers/", supplierData);
  return response.data;
};

export const updateSupplier = async (id, supplierData) => {
  const response = await axios.put(`/suppliers/${id}/`, supplierData);
  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await axios.delete(`/suppliers/${id}/`);
  return response.data;
};
