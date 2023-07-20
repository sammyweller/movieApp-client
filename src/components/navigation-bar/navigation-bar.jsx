import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss"

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar  className="nav-bar" expand="lg" style={{ border: "0px solid rgba(0, 0, 0, 0)", backgroundColor: "rgba(0, 0, 0, 0)" }}>
      <Container>
        <Navbar.Brand style={{ color: "white", fontSize: "28px"}} as={Link} to="/">
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: "white" }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {!user && (
              <>
                <Nav.Link style={{ color: "white"}} as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link style={{ color: "white"}} as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link style={{ color: "white"}} as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link style={{ color: "white"}} as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link style={{ color: "white"}} onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};