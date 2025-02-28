import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; 

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
};

export const getUsers = async (page = 1, search = "") => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/users`, {
        params: { page, search }, // Enviamos la página y la búsqueda como parámetros
        headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; 
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return { data: [], total: 0, per_page: 10, current_page: 1 }; 
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getUserStatistics = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}/statistics`, {
        headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        return { usersLast30Days: [], actionsPerUser: [], mostActiveUsers: [] };
    }
};
