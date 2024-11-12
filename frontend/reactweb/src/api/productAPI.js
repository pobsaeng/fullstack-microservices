import { getRequest, postRequest, putRequest, deleteRequest } from "./backendAPI"; // Assume these functions are defined

export const fetchProductAPI = async () => {
  const response = await getRequest('/products');
  return response;
};

export const createProductAPI = async (newProduct) => {
  const response = await postRequest('/products', newProduct);
  return response;
};

export const updateProductAPI = async (id, updatedProduct) => {
  const response = await putRequest(`/products/${id}`, updatedProduct);
  return response;
};

export const deleteProductAPI = async (id) => {
  await deleteRequest(`/products/${id}`);
  return id;
};


