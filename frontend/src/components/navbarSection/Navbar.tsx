import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import ProviderProps from "../../types/ProviderProps";
import "./Navbar.css";
import { getProviderByIdFromApi } from "../../apis/providerApis";
import jwt_decode from "jwt-decode";
import TokenProps from "../../types/tokenProps";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../store";
import { getImagePath } from "../../utils/getImagePath";

export default function NavbarSection() {
  const token = useSelector((state: any) => state.token.value);
  const dispatch = useDispatch();
  const linkStyle = {
    color: "white",
    opacity: 0.9,
    margin: "0 40px",
  };

  const [role, setRole] = useState<string>("");
  const [provider, setProvider] = useState<ProviderProps>({
    id: "",
    name: "",
    logo: "",
    city: "",
    address: "",
    email: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    messenger: "",
    observation: "",
    createdAt: "",
    deletedAt: "",
  });

  useEffect(() => {
    if (token) {
      const user = jwt_decode<TokenProps>(token);
      console.log(user);
      setRole(user.role);
      if (user.id && user.role === "provider") {
        getProviderByIdFromApi(user.id).then((res) => {
          setProvider(res);
        });
      }
    } else {
      setRole("");
    }
  }, [token]);

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          src="/logo_app.png"
          width="45"
          height="40"
          className="d-inline-block align-top rounded-circle "
          alt="mon logo"
          style={{ marginLeft: "20px" }}
        />
        <span
          style={{
            fontSize: "12px",
            marginLeft: "5px",
            fontFamily: "Lilita One",
          }}
        >
          SoukPiecesCasse
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {role == "admin" ? (
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/admin/categories" style={linkStyle}>
              Catégories
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/cars" style={linkStyle}>
              Voitures
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/providers" style={linkStyle}>
              Fournisseurs
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/login"
              style={linkStyle}
              onClick={() => {localStorage.removeItem("token")
            dispatch(setToken(undefined))}}
            >
              Se déconnecter
            </Nav.Link>
          </Nav>
        ) : role == "provider" ? (
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" style={linkStyle}>
              Acceuil
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={`/pieces/provider/${provider.id}`}
              style={linkStyle}
            >
              Voir les pièces
            </Nav.Link>
            <Nav.Link as={Link} to="/pieces/add" style={linkStyle}>
              Ajouter une pièce
            </Nav.Link>
            <NavDropdown
              title={
                <img
                  src={provider.logo? getImagePath(provider.logo) : "https://via.placeholder.com/150"}
                  className="rounded-circle d-inline-block align-top"
                  width="32"
                  height="32"
                />
              }
              align="end"
            >
              <NavDropdown.Item as={Link} to={`/providers/${provider.id}`}>
                Consulter votre profil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to="/login"
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(setToken(undefined));
                }}
              >
                Se déconnecter
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" style={linkStyle}>
              Acceuil
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={linkStyle}>
              À propos
            </Nav.Link>
            <Nav.Link as={Link} to="/login" style={linkStyle}>
              Se Connecter
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
