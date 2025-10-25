import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./styles/global.scss";
import AppRoutes from "./routes";
import React from "react";
import SideBar from "@/components/Navbar/SideBar";
function AppWrapper() {
  const location = useLocation();

  // Lista de rotas em que a Sidebar NÃO deve aparecer
  const noSidebarRoutes = ["/login", "/recuperar-senha", "/alterar-senha", "/login-colaborador", "/verificar-pin", "/responder-pesquisa"];

  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <>
      {showSidebar && <SideBar />}
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
