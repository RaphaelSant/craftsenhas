import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../../pages/login/index.jsx";
import PaginaInicial from "../../pages/homePage/index.jsx";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/PaginaInicial" element={<PaginaInicial />} />
            </Routes>
        </BrowserRouter>
    );
}