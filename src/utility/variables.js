import axios from "axios"

export const base_url = "http://127.0.0.1:8000";
export const requestHeaders = {
    headers: {
        "Content-Type": "application/json"
    }
};

const token = localStorage.getItem("token");

export const withAuthHeaders = {
    headers: {
        ...requestHeaders.headers,
        Authorization: `Token ${token ? token : ""}`
    }
};

export const getCategorias = (search) => {
    return axios.get(`${base_url}/categoria/get_categorias?search=${search}`, withAuthHeaders).then(response => {
        if (response.data) {
            return response.data
        }
        return [];
    }).catch((e) => {
        console.log(e);
    });
};