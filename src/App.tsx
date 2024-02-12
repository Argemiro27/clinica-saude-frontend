import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  RouteProps,
} from "react-router-dom";
import Container from "./components/Container";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isLoggedIn } from "./services/sessionService";
import logo from "./assets/logo.png";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Cadastros = lazy(() => import("./pages/Cadastros"));
const Agendamentos = lazy(() => import("./pages/Agendamentos"));
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Button, Collapse, Dropdown } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { ArrowDropDown } from '@mui/icons-material';
import Usuarios from "./pages/Cadastros/Usuarios";
import GradeHoraria from "./pages/Agendamentos/GradeHoraria";
import { IAuthData } from "./interfaces/AuthData";
import StorageAuthService from "./services/storage/Auth";


const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [cadastrosOpen, setCadastrosOpen] = useState(false);
  const [agendamentosOpen, setAgendamentosOpen] = useState(false);

  const handleCadastrosToggle = () => {
    setCadastrosOpen(!cadastrosOpen);
    setAgendamentosOpen(false); // Fecha o outro collapse
  };

  const handleAgendamentosToggle = () => {
    setAgendamentosOpen(!agendamentosOpen);
    setCadastrosOpen(false); // Fecha o outro collapse
  };
  useEffect(() => {
    // Realize a verificação de login aqui e atualize o estado
    setIsAuthenticated(isLoggedIn());
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // Get para recuperar os dados do usuário logado
  const usuarioLogado: IAuthData | null = StorageAuthService.getUsuarioLoggedData();


  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {isAuthenticated !== null && (
          <>
            {isAuthenticated ? (
              <Container>
                <Sidebar>
                  <div className="logowrapper w-100 d-flex justify-content-center">
                    <img src={logo} height="100" className="logo-menu m-5" />
                  </div>
                  <div className="links d-flex flex-column align-items-center">
                    <Link
                      to="/dashboard"
                      className="btn btn-link-sidebar w-75 text-start d-flex"
                    >
                      <DashboardIcon className="link-icon" /> DASHBOARD
                    </Link>
                    <Button
                      variant="link"
                      onClick={handleCadastrosToggle}
                      aria-controls="cadastros-collapse"
                      className="btn w-75 btn-link-sidebar text-start d-flex"
                      aria-expanded={cadastrosOpen}
                    >
                      <BookIcon className="link-icon" /> CADASTROS <ArrowDropDown />
                    </Button>
                    <Collapse in={cadastrosOpen} className="collapse-sidebar">
                      <div id="cadastros-collapse">
                        <ul className="p-3 links-collapse">
                          <li><Link to="/cadastros/cad-usuarios">USUÁRIOS</Link></li>
                          <li><Link to="/cad-exercicios">PACIENTES</Link></li>
                          <li><Link to="/action-1">FUNCIONÁRIOS</Link></li>
                        </ul>
                      </div>
                    </Collapse>
                    <Button
                      variant="link"
                      onClick={handleAgendamentosToggle}
                      aria-controls="agendamentos-collapse"
                      className="btn w-75 btn-link-sidebar text-start d-flex"
                      aria-expanded={agendamentosOpen}
                    >
                      <CalendarTodayIcon className="link-icon" /> AGENDAMENTOS <ArrowDropDown />
                    </Button>
                    <Collapse in={agendamentosOpen} className="collapse-sidebar">
                      <div id="agendamentos-collapse">
                        <ul className="p-3 links-collapse">
                          <li><Link to="/agendamentos/gradehoraria">GRADE DE HORÁRIOS</Link></li>
                          <li><Link to="/cad-exercicios">AGENDAR CONSULTA</Link></li>
                        </ul>
                      </div>
                    </Collapse>

                    <button
                      className="btn btn-link-sidebar w-75 text-start d-flex"
                      onClick={handleLogout}
                    >
                      <ExitToAppIcon className="link-icon" />
                      LOGOUT
                    </button>
                  </div>

                  <div className="wrapper-dropdown-usuario bg-primary d-flex justify-content-center">
                    <Dropdown className="position-absolute bottom-0 mb-4 ">
                      <Dropdown.Toggle className="btn-sidebar-usuario d-flex align-items-center btn-avatar"
                        id="dropdown-basic">
                        <div className="avatar-wrapper">
                          <Avatar
                            alt="Remy Sharp"
                            src="https://mui.com/static/images/avatar/1.jpg"
                            sx={{ width: 24, height: 24, marginRight: 1 }}
                          />
                        </div>
                        <div className="nome-usuario ml-2">{usuarioLogado?.usuario?.nome}</div>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Sidebar>

                <Content>
                  <Routes>
                    <Route
                      path="/dashboard"
                      element={<PrivateRoute element={<Dashboard />} />}
                    />
                    <Route
                      path="/cadastros"
                      element={<PrivateRoute element={<Cadastros />} />}
                    />
                    <Route
                      path="/cadastros/cad-usuarios"
                      element={<PrivateRoute element={<Usuarios />} />}
                    />
                    <Route
                      path="/agendamentos"
                      element={<PrivateRoute element={<Agendamentos />} />}
                    />

                    <Route
                      path="/agendamentos/gradehoraria"
                      element={<PrivateRoute element={<GradeHoraria />} />}
                    />
                  </Routes>
                </Content>
              </Container>
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            )}
          </>
        )}
      </Suspense>
    </Router>
  );
};

export default App;
