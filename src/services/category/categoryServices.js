import api from "../api";

export const getCategories = () => api.get("/category");
export const createCategory = (data) => api.post("/category", data);
export const deleteCategory = (id) => api.delete(`/category/${id}`);