import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../../pages/login/index.jsx";
import PaginaInicial from "../../pages/homePage/index.jsx";
import { useEffect, useState } from "react";
import { verificarAutenticacao } from "../autenticacao/index.jsx";
import ErroPage from "../../pages/error/index.jsx";
import CadastroUsuario from "../../pages/cadastroUsuario/index.jsx";
import EditaUsuario from "../../pages/editaUsuario/index.jsx";

export default function Rotas() {
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const verificarEAutenticar = async () => {
            try {
                const autenticado = await verificarAutenticacao();
                setAutenticado(autenticado);
            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
            } finally {
                setCarregando(false);
            }
        };

        verificarEAutenticar();
    }, []);

    if (carregando) {
        return <p>Carregando...</p>;
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                
                {/* Acesso Restrito */}
                <Route path="/PaginaInicial" element={autenticado ? <PaginaInicial /> : <ErroPage />} />
                <Route path="/CadastroUsuario" element={autenticado ? <CadastroUsuario /> : <ErroPage />} />
                <Route path="/EditaUsuario" element={autenticado ? <EditaUsuario /> : <ErroPage />} />
                
            </Routes>
        </BrowserRouter>
    );
}