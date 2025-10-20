import React from "react";
import { VStack, Button, Icon, Box, Image, Spacer } from "@chakra-ui/react";
import { useNavigate, useLocation} from "react-router-dom";
import { MdPeopleOutline, MdOutlineSearch, MdOutlineHome, MdOutlineExitToApp} from "react-icons/md"
import logo from "@/assets/Aeris.svg";
import "./Sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname; 


  const menuItems = [
    { id: "home", label: "Home", icon: MdOutlineHome , path: "/home", activate: ['/home', '/nova-pesquisa', '/gerenciar-pesquisa'].includes(currentPath) },
    { id: "pesquisas", label: "Pesquisas", icon: MdOutlineSearch, path: "/pesquisas", activate: ['/pesquisas'].includes(currentPath) },
    { id: "usuarios", label: "Usuários", icon: MdPeopleOutline, path: "/usuarios", activate: ['/usuarios'].includes(currentPath) },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <VStack className="sidebar" align="stretch">
      <Box className="sidebar-logo">
        <Image src={logo} alt="Logo Aeris" className="logo" />
      </Box>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            justifyContent="flex-start"
            variant="ghost"
            className={`menu-item ${item.activate === true ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <Icon as={item.icon}/>
            {item.label}
          </Button>
        ))}
      </div>

      <Spacer />

      <Box className="sidebar-footer">
        <Button
          justifyContent="flex-start"
          variant="ghost"
          className="logout-btn"
          onClick={handleLogout}
        >
          <MdOutlineExitToApp />
          Sair
        </Button>
      </Box>
    </VStack>
  );
};

export default Sidebar;
