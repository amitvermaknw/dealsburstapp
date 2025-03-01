import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.APP_LOCAL_BASE_URL : process.env.APP_PROD_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "app-token"
    },
});

export default apiClient;