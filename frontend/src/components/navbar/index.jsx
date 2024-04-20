import React from "react";
import ProfatLogo from "../../assets/img/LogoProfat.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";



export default function Navbar() {

    const logout = () => {
        // Limpar os dados de autenticação ao fazer logout
        localStorage.removeItem("token");
        // Redirecionar para a página de login após o logout
        return (window.location.href = "/");
    };

    const token = localStorage.getItem('token');
    let isAdmin = false;
    let userName;

    if (token) {
        // Decodificar o token para acessar as informações
        const decodedToken = jwtDecode(token);

        // Verificar se o token indica que o usuário é administrador
        isAdmin = decodedToken && decodedToken.isAdmin === 1; // 'role' é apenas um exemplo, você deve usar a chave correta no token
        userName = decodedToken && decodedToken.nome_completo;
    }


    //const decodedToken = jwtDecode(token);

    //console.log(userName);
    //console.log(token);
    //console.log(decodedToken.isAdmin);
    //console.log(isAdmin);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link to="/PaginaInicial" className="navbar-brand"><img src={ProfatLogo} alt="Profat Logo" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.google.com">Relatórios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.google.com">Convênios</a>
                        </li>
                        {isAdmin && (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="https://www.google.com" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Administrador
                                </a>
                                <ul className="dropdown-menu text-center">
                                    <li><Link className="dropdown-item" to={"/CadastroUsuario"}>Cadastrar Usuário</Link></li>
                                    <li><a className="dropdown-item" href="https://www.google.com">Editar Usuário</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="https://www.google.com">Something else here</a></li>
                                </ul>
                            </li>
                        )}

                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="https://www.google.com" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faUser} /> {userName}
                            </a>
                            <ul className="dropdown-menu text-center">
                                <li><a className="dropdown-item" href="https://www.google.com">Editar Senha</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li className="dropdown-item" onClick={logout}>
                                    <Link className="nav-link text-danger-emphasis"><FontAwesomeIcon icon={faPowerOff} /> Sair</Link>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

