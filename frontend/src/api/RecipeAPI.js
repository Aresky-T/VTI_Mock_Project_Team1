import { api } from "./api";

// get listAccount API
const getListRecipeAPI = () => {
   return api("GET", "recipes/", null);
};

// get listAccount API
export const getRecipeByNameAPI = (id) => {
   return api("GET", "recipes/" + id, null);
};

// Add New Account
export const addRecipeNewAPI = (AccountNew) => {
   return api("POST", "recipes/", AccountNew);
};

// Delete Account
export const deleteRecipeAPI = (id) => {
   let url = "recipes/" + id;
   return api("DELETE", url, null);
};

// Update Account
export const updateRecipeAPI = (id, recipeUpdate) => {
   let url = "recipes/" + id;
   return api("PUT", url, recipeUpdate);
};
export default getListRecipeAPI;
