import axios from "./axiosInstance";

export const getSuppliers = async () => {
  const response = await axios.get("/suppliers/");
  return response.data;
};

export const createSupplier = async (supplierData) => {
  const response = await axios.post("/suppliers/", supplierData);
  return response.data;
};
