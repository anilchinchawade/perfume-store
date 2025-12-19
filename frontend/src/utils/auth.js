import { jwtDecode } from "jwt-decode";

export const getToken = () => {
    return localStorage.getItem("adminToken");
};

export const logout = () => {
    localStorage.removeItem("adminToken");
};

export const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch {
        return false;
    }
};
