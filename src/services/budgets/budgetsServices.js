import api from "../api";

export const getBudgets = (month) => api.get(`/budgets?month=${month}`);
export const upsertBudget = (data) => api.put("/budgets", data);
export const deleteBudget = (id) => api.delete(`/budgets/${id}`);
