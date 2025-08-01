import axios from "axios";

const baseURL = import.meta.env.VITE_PUBLIC_REACT_APP_BASE_URL_API;

export const axiosServices = () => {
  const Axios = axios.create({
    baseURL: baseURL,
    headers: {
      Accept: "application/json",
    },
  });

  return Axios;
};
