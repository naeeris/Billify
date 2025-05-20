// services/authUtils.js

// Devuelve el rol actual del usuario desde localStorage
export const getUserRole = () => {
  return localStorage.getItem("role");
};

// Devuelve true si el usuario tiene rol "admin"
export const isAdminUser = () => {
  return getUserRole() === "admin";
};

// Devuelve true si el usuario tiene rol "estandar"
export const isStandardUser = () => {
  return getUserRole() === "estandar";
};

// Devuelve el nombre de usuario actual (por si lo necesitas mostrar)
export const getCurrentUsername = () => {
  return localStorage.getItem("username");
};

// Devuelve el ID del usuario actual
export const getUserId = () => {
  return localStorage.getItem("userId");
};
