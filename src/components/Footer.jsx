import { Container, Row, Col, Nav, Form } from "react-bootstrap";
import { QuestionCircle, Gear, ShieldCheck } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <Container className="px-5 footer-container">
        <Row className="gx-5">
          <Col xs={12} sm={6} md={3}>
            <Nav className="flex-column small">
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Informazioni
              </Nav.Link>
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Informativa sulla community professionale
              </Nav.Link>
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Privacy e condizioni
              </Nav.Link>
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Sales Solutions
              </Nav.Link>
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Centro sicurezza
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Nav className="flex-column small">
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Accessibilità
              </Nav.Link>
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Carriera
              </Nav.Link>
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Opzioni per gli annunci pubblicitari
              </Nav.Link>
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Mobile
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Nav className="flex-column small">
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Talent Solutions
              </Nav.Link>
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Soluzioni di marketing
              </Nav.Link>
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Pubblicità
              </Nav.Link>
              <Nav.Link
                href="/"
                className="text-dark p-0 mb-2 text-decoration-none hover-underline footerText"
              >
                Piccole imprese
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Nav className="flex-column small">
              <div className="mb-3">
                <Nav.Link
                  href="/"
                  className="text-dark p-0 mb-1 hover-underline footerText "
                >
                  <QuestionCircle className="me-2" />
                  Domande?
                </Nav.Link>
                <small className="text-muted">
                  Visita il nostro Centro assistenza.
                </small>
              </div>
              <div className="mb-3">
                <Nav.Link
                  href="/"
                  className="text-dark p-0 mb-1 hover-underline footerText"
                >
                  <Gear className="me-2" />
                  Gestisci il tuo account e la tua privacy
                </Nav.Link>
                <small className="text-muted">Vai alle impostazioni</small>
              </div>
              <div>
                <Nav.Link
                  href="/"
                  className="text-dark p-0 mb-1 hover-underline footerText"
                >
                  <ShieldCheck className="me-2" />
                  Trasparenza sui contenuti consigliati
                </Nav.Link>
                <small className="text-muted">
                  Scopri di più sui contenuti consigliati.
                </small>
              </div>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12} sm="auto">
            <Form.Select size="sm" className="w-auto footerLanguage">
              <option>Italiano (Italiano)</option>
              <option>English (Inglese)</option>
              <option>Français (Francese)</option>
              <option>Deutsch (Tedesco)</option>
              <option>Spanish (Spagnolo)</option>
              <option>Português (Portoghese)</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <small className="text-muted copyright">
              LinkedIn Corporation © 2025
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
