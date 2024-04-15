import React, { useState } from "react";
import estiloLogin from "./login.module.css";
import LogoProfat from "../../assets/img/LogoProfat.png";

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, senha }),
            });

            if (response.ok) {
                console.log('Login autorizado');
            } else {
                // Login não autorizado, exiba uma mensagem de erro
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro interno do servidor');
        }
    };

    return (
        <>
            <div className={estiloLogin.loginContainer}>
                <h1 className="mb-5">Sistema de Faturamento - PROFAT</h1>
                <form className={estiloLogin.formContainer} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Usuário</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-success w-100">Entrar</button>
                </form>
                <img src={LogoProfat} alt="Logo da PROFAT" className={estiloLogin.imgLogo} />
            </div>
        </>
    );
}
