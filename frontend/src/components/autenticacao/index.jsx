import axios from "axios";
import dbConfig from "../util/dbConfig";

export const verificarAutenticacao = async () => {
    try {
        const token = localStorage.getItem("token");

        if (token) {
            const response = await axios.get(
                `${dbConfig()}/recursoProtegido`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (response.status === 200) {
                return true; // usuário autenticado
            } else {
                return false; // usuário não autenticado
            }
        } else {
            return false; // usuário não autenticado
        }
    } catch (error) {
        // Lidar com erros de requisição
        return false; // usuário não autenticado
    }
};