import axios from "axios";
import type { Recipe } from "../types/recipetype";

const BASE = "https://dummyjson.com";

export const getAllRecipesApi = async () => {
  const response = await axios.get<{ recipes: Recipe[] }>(`${BASE}/recipes?limit=100`);
  return response.data.recipes;
};
export const getRecipeByIdApi = (id: number) =>
  axios.get<Recipe>(`${BASE}/recipes/${id}`);

export const searchRecipesApi = (q: string, params?: { limit?: number }) =>
  axios.get<{ recipes: Recipe[] }>(`${BASE}/recipes/search`, { params: { q, ...(params ?? {}) } });

export const addRecipeApi = (data: Omit<Recipe, "id">) =>
  axios.post<Recipe>(`${BASE}/recipes/add`, data);

export const updateRecipeApi = (id: number, data: Partial<Omit<Recipe, "id">>) =>
  axios.put<Recipe>(`${BASE}/recipes/${id}`, data);

export const deleteRecipeApi = (id: number) =>
  axios.delete<{ id: number }>(`${BASE}/recipes/${id}`);
