import api from "./api";


// Login API

export const loginUser = async (userData) => {

    try {

        const response = await api.post(
            "/auth/login",
            userData
        );

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
// Register API

export const registerUser = async (userData) => {
    try {
        const response = await api.post(
            "/auth/register",
            userData
        );
        return response.data;
    } catch (error) {
        throw error.response.data;

    }

};