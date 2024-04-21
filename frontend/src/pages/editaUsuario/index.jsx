import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import axios from "axios"; // Importe o Axios
import dbConfig from "../../components/util/dbConfig.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import estiloEditaUser from "./editauser.module.css";
import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle";

export default function EditaUsuario() {
    const [id, setId] = useState("");
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

    // Estado para receber os dados gravados no BD
    const [data, setData] = useState([]);

    // Função para buscar dados da API e atualizar o estado 'data'
    const fetchData = async () => {
        try {
            // Faz uma requisição para buscar dados da API
            const res = await fetch(`${dbConfig()}/caduser`);

            // Converte a resposta da requisição para o formato JSON
            const fetchedData = await res.json();

            // Atualiza o estado 'data' do componente com os dados obtidos da API
            setData(fetchedData);
        } catch (err) {
            // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
            alert(err)
            console.log(err);
        }
    };

    // Função executada ao clicar no botao Deletar
    const handleDeleteRegistro = (id, usuario, nome_completo) => {
        // Exibe um diálogo de confirmação ao usuário, mostrando os detalhes do registro que será excluído
        const shouldDelete = window.confirm(
            `Tem certeza de que deseja excluir este registro? Usuário: ${usuario} Nome Completo: ${nome_completo}`
        );

        if (shouldDelete) {
            // Chama a função de exclusão se o usuário confirmar
            deleteRegistro(id);
        }
    };

    // Função para deletar um registro pelo ID
    const deleteRegistro = async (id) => {
        try {
            // Envia uma requisição DELETE para a URL específica do ID fornecido
            const response = await axios.delete(`${dbConfig()}/caduser/${id}`);

            // Exibe um alerta da mensagem retornada após a exclusão (mensagem de sucesso ou erro)
            alert(response.data.message);

            // Atualiza os dados após a exclusão
            await fetchData();
        } catch (error) {
            // Em caso de erro na requisição, exibe um alerta
            alert('Erro:', error);
        }
    };

    // Busca de dados por Id para a edição
    const buscarDadosPorId = async (id) => {
        try {
            // Faz uma requisição GET para obter os dados de um registro específico com o ID fornecido
            const response = await axios.get(`${dbConfig()}/caduser/selectId/${id}`);
            const data = response.data;

            // Cria uma instância de um modal usando Bootstrap
            const editModal = new bootstrapBundle.Modal(document.getElementById("editarRegistro"));

            // Verifica se há dados retornados antes de definir os estados para evitar erros
            if (data) {

                // Define os estados com os dados obtidos da requisição, usando valores padrão vazios caso não haja dados
                setId(data.id || "");
                setUsuario(data.usuario || "");
                setNome_completo(data.nome_completo || "");
                setSenha(data.senha || "");
                setIsAdmin(data.isAdmin || "");

                // Mostra o modal de edição após definir os estados com os dados
                editModal.show();
            }

        } catch (error) {
            // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
            alert(error);
            console.error("Erro ao buscar dados:", error);
        }
    };

    // Ao clicar no botão atualizar dados do modal de edição essa função será executada
    const atualizarDadosPorId = async (id) => {
        try {
            // Envia uma requisição PUT para atualizar os dados do registro com o ID fornecido
            const response = await axios.put(`${dbConfig()}/civis_pe/${id}`, {
                // Envia os dados a serem atualizados no corpo da requisição

            });

            // Exibe um alerta com a mensagem da resposta para informar o usuário sobre o resultado da operação
            alert(response.data.message);

            await fetchData();

            // Retorna os dados da resposta da requisição
            return response.data;
        } catch (error) {
            const msg = error.response.data.message;
            // Em caso de erro na requisição, exibe um alerta e imprime o erro no console
            //alert('Erro ao atualizar dados:', msg);
            alert(`Erro ao atualizar dados: ${msg}`);
            console.log('Erro ao atualizar dados:', msg);

            // Lança o erro novamente para ser tratado por quem chamou essa função
            throw error;
        }
    };

    // Este useEffect será executado após a montagem inicial do componente
    useEffect(() => {
        // Chama a função fetchData para buscar dados da API e atualizar o estado 'data'
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="text-center mt-3">Editar usuário</h1>
                <hr />

                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Usuário</th>
                            <th scope="col">Nome Completo</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dados) => {
                            let id = dados.id;
                            return (
                                <tr key={dados.id} className="align-middle">
                                    <td>{dados.id}</td>
                                    <td>{dados.usuario}</td>
                                    <td>{dados.nome_completo}</td>
                                    <td className="d-print-none">
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <div>

                                                <button className={estiloEditaUser.btn_acao}>
                                                    <FontAwesomeIcon
                                                        className="fa-lg"
                                                        icon={faPenToSquare}
                                                        color="#FFD700"
                                                        onClick={() => buscarDadosPorId(dados.id)}
                                                    />
                                                </button>

                                            </div>
                                            <div>
                                                <button
                                                    className={estiloEditaUser.btn_acao}
                                                    onClick={() =>
                                                        handleDeleteRegistro(dados.id, dados.usuario, dados.nome_completo)
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faTrash} color="#FF0000" className="fa-lg" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* MODAL Editar Registro*/}
            <div className="modal fade" id="editarRegistro" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editarRegistroLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editarRegistroLabel"><FontAwesomeIcon icon={faPenToSquare} className="me-2" /> Editar Registro</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" id="modal-body">
                            <form className="row g-3 was-validated">
                                <div className="col-md-12">
                                    <label htmlFor="usuario" className="form-label">
                                        Usuário
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira o nome completo"
                                        id="usuario"
                                        required
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="nome-completo" className="form-label">
                                        Nome Completo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira o nome completo"
                                        id="nome-completo"
                                        required
                                        value={nome_completo}
                                        onChange={(e) => setNome_completo(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="senha" className="form-label">
                                        Senha
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Insira o nome completo"
                                        id="senha"
                                        required
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                    <div className="valid-feedback">OK!</div>
                                    <div className="invalid-feedback">Campo obrigatório.</div>
                                </div>

                                <div className="col-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="invalidCheck2" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                                        <label className="form-check-label" htmlFor="invalidCheck2">
                                            Administrador
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onClick={(e) => atualizarDadosPorId(id)} className="btn btn-md btn-success">Atualizar Registro</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
