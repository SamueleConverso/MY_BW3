import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h1 className="display-1">404</h1>
          <h2>Pagina non trovata</h2>
          <p>Ci dispiace, la pagina che stai cercando non esiste.</p>
          <Link to="/">
            <Button variant="primary">Torna alla Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
