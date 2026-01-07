import axios, { AxiosResponse } from "axios";

/**
 * Axios instance configured for public JSON requests.
 */
export const axiosPublic = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sends a POST request to the given URL with the given data.
 *
 * @param {string} url The URL of the API endpoint.
 * @param {any} data The data to be sent in the request body.
 * @returns {Promise<AxiosResponse<any>>} The response from the server.
 */
export const apiPost = (url: string, data: any): Promise<AxiosResponse<any>> => {
  return axiosPublic.post(url, data);
};
