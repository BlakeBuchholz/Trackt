import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Routesjs from "./backend/routes/routes.js";
import LoginButton from "./components/LoginButton";
import "./App.scss";

function App() {
  const [user, setUser] = useState({
    steamId: null,
  })

  useEffect(() => {
    fetch("/api/getUser")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.steamId) {
          setUser({ steamId: data.steamId });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  

  return (
    <Router>
      <div>
        <header>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Brand className="nav-brand" as={Link} to="/">
                TRACKT
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                  <Nav.Link as={Link} to="/features">
                    Features
                  </Nav.Link>
                  <Nav.Link as={Link} to="/pricing">
                    Pricing
                  </Nav.Link>
                  <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <LoginButton steamId={user.steamId} />
                  <Nav.Link as={Link} to="/profile">
                    My Profile
                  </Nav.Link>
                  <Nav.Link href="#signup">Signup</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <Routesjs />
      </div>
    </Router>
  );
}

export default App;
