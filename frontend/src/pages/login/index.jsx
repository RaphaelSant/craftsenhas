import React, { useState } from "react";
import estiloLogin from "./login.module.css";
import LogoProfat from "../../assets/img/LogoProfat.png";
import dbConfig from "../../components/util/dbConfig.jsx";
import axios from "axios";
import { verificarAutenticacao } from "../../components/autenticacao/index.jsx";

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${dbConfig()}/login`, {
                usuario: usuario,
                senha: senha
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

                // Verifique a autenticação após o login
                const autenticado = await verificarAutenticacao();

                if (autenticado) {
                    setMensagem('Usuário autenticado!');
                    setTimeout(() => {
                        setMensagem('');
                    }, 2000); // Limpa a mensagem após 2 segundos
                    window.location.href = "/PaginaInicial";
                } else {
                    setMensagem('Usuário não autenticado');
                    console.log(response);
                }
            } else {
                // Se a resposta não contiver um token, considere como falha de autenticação
                setMensagem('Usuário ou senha incorretos');
            }
        } catch (error) {
            // Se houver um erro na requisição, exiba uma mensagem de erro genérica
            //console.error(error.response.data);
            setError(error.response.data);
        }
    };

    return (
        <>
            <div className={estiloLogin.loginContainer}>
                <h1 className="mb-5">Sistema de Faturamento - PROFAT</h1>
                <form className={estiloLogin.formContainer} onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Usuário</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {mensagem && !error && <div className="alert alert-success">{mensagem}</div>}
                    <button type="submit" className="btn btn-success w-100">Entrar</button>
                </form>
                <img src={LogoProfat} alt="Logo da PROFAT" className={estiloLogin.imgLogo} />
            </div>
        </>
    );
}
