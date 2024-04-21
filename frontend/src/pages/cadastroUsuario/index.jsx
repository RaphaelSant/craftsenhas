import React, { useState } from "react";
import Navbar from "../../components/navbar";
import estiloCadUser from "./caduser.module.css";
import axios from "axios"; // Importe o Axios
import dbConfig from "../../components/util/dbConfig.jsx";

export default function CadastroUsuario() {
    const [usuario, setUsuario] = useState("");
    const [nome_completo, setNome_completo] = useState("");
    const [senha, setSenha] = useState("");
    const [isAdmin, setIsAdmin] = useState(0);
    const [validated, setValidated] = useState(false);
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [senhaError, setSenhaError] = useState("");

    // Função para limpar todos os campos do formulário
    const clearFormFields = () => {
        setUsuario("");
        setNome_completo("");
        setSenha("");
        setIsAdmin(0);
        setValidated(false);
        setConfirmarSenha("");
        setSenhaError("");
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (senha !== confirmarSenha) {
            event.stopPropagation();
            setSenhaError("As senhas não correspondem!");
            return;
        } else {
            setSenhaError("");
        }

        try {
            const response = await axios.post(`${dbConfig()}/caduser`, {
                usuario,
                nome_completo,
                senha,
                isAdmin
            });

            alert(response.data);
            console.log(response.data);
            if (response.status !== 400) {
                clearFormFields();
            }
        } catch (error) {
            console.error("Erro ao enviar dados para o backend:", error);
            alert('Erro ao enviar dados para o backend:', error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-center mt-3">Cadastro de usuário</h1>
                <hr />
                <form className={`${estiloCadUser.form_container} row g-3 ${validated ? 'was-validated' : ''}`} onSubmit={handleSubmit} noValidate>
                    <div className="col-md-12">
                        <label htmlFor="validationCustomUsername" className="form-label">Nome de Login</label>
                        <input type="text" className="form-control" id="validationCustomUsername" placeholder="Nome de login" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="validationCustomNome" className="form-label">Nome Completo</label>
                        <input type="text" className="form-control" id="validationCustomNome" placeholder="Nome Completo" value={nome_completo} onChange={(e) => setNome_completo(e.target.value)} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="validationCustomSenha" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="validationCustomSenha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="validationCustomConfirmarSenha" className="form-label">Confirmar Senha</label>
                        <input type="password" className="form-control" id="validationCustomConfirmarSenha" placeholder="Confirmar Senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
                        {senhaError && <div className="invalid-feedback d-block">{senhaError}</div>}
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="invalidCheck2" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                            <label className="form-check-label" htmlFor="invalidCheck2">
                                Administrador
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-success w-100" type="submit">Cadastrar Usuário</button>
                    </div>
                </form>
            </div>
        </>
    );
}
