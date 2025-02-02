import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import {
  FaHome,
  FaSearch,
  FaUserFriends,
  FaBriefcase,
  FaEnvelope,
  FaBell,
  FaChevronDown,
} from "react-icons/fa";
import { BsGrid3X3Gap } from "react-icons/bs";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const NavBar = () => {
  // Stato per gestire il valore di ricerca
  const [searchValue, setSearchValue] = useState("");
  // Hook per la navigazione
  const navigate = useNavigate();

  // Funzione per gestire la ricerca
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      // Naviga alla pagina dei lavori con il parametro di ricerca
      navigate(`/jobs?search=${encodeURIComponent(searchValue)}`);
    }
  };
  return (
    <Container fluid className="bg-light">
      <Container className="nav-container">
        <nav className="navbar navbar-expand-lg sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="LinkedIn Logo" style={{ height: "40px" }} />
            </Link>
            {/* Form di ricerca */}
            <Form
              className="d-flex align-items-center border rounded p-2 d-none d-lg-flex"
              style={{
                backgroundColor: "#EDF3F8",
                height: "50px",
              }}
              onSubmit={handleSearch}
            >
              <FaSearch className="text-muted ms-2" />
              <Form.Control
                type="search"
                placeholder="Cerca..."
                className="border-0 bg-transparent shadow-none"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {/* Pulsante di ricerca che cambia colore quando c'è un valore di ricerca */}
              <Button
                variant={searchValue ? "primary" : "light"}
                className="ms-2"
                type="submit"
              >
                Cerca
              </Button>
            </Form>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              {/* Navbar per schermi più piccoli  */}
              <ul className="navbar-nav ms-auto d-lg-none">
                <div className="row w-100">
                  <li className="nav-item col-6">
                    <a className="nav-link" href="#">
                      <div className="d-flex flex-column align-items-center">
                        <FaSearch />
                        <div>Cerca</div>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item col-6">
                    <Link className="nav-link" to="/">
                      <div className="d-flex flex-column align-items-center">
                        <FaHome />
                        <div>Home</div>
                      </div>
                    </Link>
                  </li>
                </div>
                <div className="row w-100">
                  <li className="nav-item col-6">
                    <Link className="nav-link" to="/notfound">
                      <div className="d-flex flex-column align-items-center">
                        <FaUserFriends />
                        <div>Rete</div>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item col-6">
                    <Link className="nav-link" to="/jobs">
                      <div className="d-flex flex-column align-items-center">
                        <FaBriefcase />
                        <div>Lavori</div>
                      </div>
                    </Link>
                  </li>
                </div>
                <div className="row w-100">
                  <li className="nav-item col-6">
                    <Link className="nav-link" to="/notfound">
                      <div className="d-flex flex-column align-items-center">
                        <FaEnvelope />
                        <div>Messaggistica</div>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item col-6">
                    <Link className="nav-link" to="/notfound">
                      <div className="d-flex flex-column align-items-center">
                        <FaBell />
                        <div>Notifiche</div>
                      </div>
                    </Link>
                  </li>
                </div>
                <div className="row w-100">
                  <li className="nav-item col-6 dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                          alt=""
                          style={{ width: "17px", borderRadius: "50%" }}
                        />
                        <div>
                          Me <FaChevronDown style={{ fontSize: "15px" }} />
                        </div>
                      </div>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="/profile">
                          Profilo
                        </a>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/notfound">
                          Impostazioni
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/notfound">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item col-6 dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="d-flex flex-column align-items-center">
                        <BsGrid3X3Gap />
                        <div>
                          Per le Aziende{" "}
                          <FaChevronDown style={{ fontSize: "15px" }} />
                        </div>
                      </div>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/notfound">
                          Posta Lavoro
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/notfound">
                          Controlla lavori
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/notfound">
                          Pagina Compagnia
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
              </ul>

              {/* Navbar per schermi più grandi  */}
              <ul className="navbar-nav d-none d-lg-flex ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <div className="d-flex flex-column align-items-center">
                      <FaHome />
                      <div>Home</div>
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/notfound">
                    <div className="d-flex flex-column align-items-center">
                      <FaUserFriends />
                      <div>Rete</div>
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/jobs">
                    <div className="d-flex flex-column align-items-center">
                      <FaBriefcase />
                      <div>Lavori</div>
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/notfound">
                    <div className="d-flex flex-column align-items-center">
                      <FaEnvelope />
                      <div>Messaggistica</div>
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/notfound">
                    <div className="d-flex flex-column align-items-center">
                      <FaBell />
                      <div>Notifiche</div>
                    </div>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ marginRight: "15px" }}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                        alt=""
                        style={{
                          width: "17px",
                          borderRadius: "50%",
                          margin: "0",
                        }}
                      />
                      <div>
                        Me <FaChevronDown style={{ fontSize: "15px" }} />{" "}
                      </div>
                    </div>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="btn m-2 rounded-pill fw-bold mt-3 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: "transparent",
                          color: "#0B66C2",
                          border: "2px solid #0B66C2",
                          padding: "10px 20px",
                          fontSize: "14px",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          width: "200px",
                          margin: "0 auto",
                          textDecoration: "none",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#0B66C2";
                          e.target.style.color = "white";
                          e.target.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#0B66C2";
                          e.target.style.boxShadow =
                            "0 2px 4px rgba(0, 0, 0, 0.1)";
                        }}
                      >
                        Visualizza il Profilo
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/notfound">
                        Impostazioni
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/notfound">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
                <div className="d-flex align-items-center">
                  <div className="vertical-hr"></div>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownCompanies"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ marginRight: "15px" }}
                    >
                      <div className="d-flex flex-column align-items-center">
                        <BsGrid3X3Gap />
                        <div>
                          Per le Aziende{" "}
                          <FaChevronDown style={{ fontSize: "15px" }} />
                        </div>
                      </div>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownCompanies"
                    >
                      <li>
                        <Link className="dropdown-item" to="/notfound">
                          Posta Lavoro
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/notfound">
                          Controlla lavori
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/notfound">
                          Pagina Compagnia
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://premium.linkedin.com/"
                    target="_blank"
                  >
                    <div className="d-flex flex-column align-items-center text-center text-decoration-underline">
                      <div
                        style={{
                          fontSize: "12px",
                          width: "90%",
                          color: "#5C3B09",
                          fontWeight: "600",
                        }}
                      >
                        Prova Premium per 0 EUR
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </Container>
  );
};

export default NavBar;
