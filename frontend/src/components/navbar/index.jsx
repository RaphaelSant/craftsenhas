import React from "react";
import ProfatLogo from "../../assets/img/LogoProfat.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";



export default function Navbar() {

    const logout = () => {
        // Limpar os dados de autenticação ao fazer logout
        localStorage.removeItem("token");
        // Redirecionar para a página de login após o logout
        return (window.location.href = "/");
    };

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <Link to="/PaginaInicial" className="navbar-brand"><img src={ProfatLogo} alt="Profat Logo" /></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="https://www.google.com">Relatórios</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="https://www.google.com">Convênios</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="https://www.google.com" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Administrador
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="https://www.google.com">Cadastrar Usuário</a></li>
                                <li><a class="dropdown-item" href="https://www.google.com">Editar Usuário</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="https://www.google.com">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item d-flex">
                            <button className="nav-link" onClick={logout}>
                                {" "}
                                
                                <FontAwesomeIcon icon={faPowerOff} /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

