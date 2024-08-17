import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signin", data);

//Products
export const getAllProducts = async (filter) =>
  await API.get(`/products?${filter}`);

export const getProductDetails = async (id) => await API.get(`/products/${id}`);

//Cart
/**
 * Retrieves the user's cart from the server.
 *
 * @param {string} token - The user's authentication token.
 * @return {object} The user's cart data.
 */

export const getCart = async (token) =>
  await API.get("/user/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });


 /**
 * Adds a product to the user's cart.
 *
 * @param {string} token - The user's authentication token.
 * @param {object} data - The product data to be added to the cart.
 * @return {object} The response from the server.
 */ 
export const addToCart = async (token, data) =>
  await API.post(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });


  /**
 * Deletes a product from the user's cart.
 *
 * @param {string} token - The user's authentication token.
 * @param {object} data - The product data to be deleted from the cart.
 * @return {object} The response from the server.
 */
export const deleteFromCart = async (token, data) =>
  await API.patch(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });


//Favourites
/**
 * Retrieves the user's favourite products from the server.
 *
 * @param {string} token - The user's authentication token.
 * @return {object} The user's favourite products data.
 */
export const getFavourite = async (token) =>
  await API.get(`/user/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });


/**
 * Adds a product to the user's favorite list.
 *
 * @param {string} token - The user's authentication token.
 * @param {object} data - The product data to be added to the favorite list.
 * @return {Promise<object>} A promise that resolves to the response from the server.
 */  
export const addToFavourite = async (token, data) =>
  await API.post(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });


/**
 * Deletes a product from the user's favorite list.
 *
 * @param {string} token - The user's authentication token.
 * @param {object} data - The product data to be deleted from the favorite list.
 * @return {object} The response from the server.
 */ 
export const deleteFromFavourite = async (token, data) =>
  await API.patch(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

//Orders
/**
 * Places an order on the server.
 *
 * @param {string} token - The user's authentication token.
 * @param {object} data - The order data to be sent to the server.
 * @return {object} The response from the server.
 */
export const placeOrder = async (token, data) =>
  await API.post(`/user/order/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });



/**
 * Retrieves the user's orders from the server.
 *
 * @param {string} token - The user's authentication token.
 * @return {Promise<Object>} A promise that resolves to the response from the server.
 */
export const getOrders = async (token) =>
  await API.get(`/user/order/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
