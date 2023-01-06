import { api } from "./api";

// export const getListRecipeAPI = async (file, token) => {
//    const config = {
//       headers: {
//          "Content-Type": "multipart/form-data",
//          Authorization: `Bearer ${token}`,
//       },
//    };

//    return await axios.post(`${baseURL}`, config);
// };

// getlist API
export const getListRecipeAPI = () => {
   alert("listRecipesParam");
   return api("GET", "recipes/", null);
};

// getByName API
export const getRecipeByNameAPI = (nameParam) => {
   return api("GET", "recipes/" + nameParam, null);
};

export const addRecipeNewAPI = (RecipeNew) => {
   return api("POST", "recipes/", RecipeNew);
};

// Delete
export const deleteRecipeAPI = (id) => {
   let url = "recipes/" + id;
   return api("DELETE", url, null);
};

// Update
export const updateRecipeAPI = (id, recipeUpdate) => {
   let url = "recipes/" + id;
   return api("PUT", url, recipeUpdate);
};
