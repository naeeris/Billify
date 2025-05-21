import axios from "./axiosInstance";

export const getCreditNotes = async () => {
  const response = await axios.get("/credit-notes/");
  return response.data;
};

export const createCreditNote = async (creditNoteData) => {
  const response = await axios.post("/credit-notes/", creditNoteData);
  return response.data;
};

export const updateCreditNote = async (id, creditNoteData) => {
  const response = await axios.put(`/credit-notes/${id}/`, creditNoteData);
  return response.data;
};

export const deleteCreditNote = async (id) => {
  const response = await axios.delete(`/credit-notes/${id}/`);
  return response.data;
};
