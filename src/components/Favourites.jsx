import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { removeFromFavorites } from "../redux/action";

const Favourites = () => {
  const favorites = useSelector((state) => state.favorites || []);
  const dispatch = useDispatch();

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Le tue offerte lavorative salvate</h2>
      {favorites.length > 0 ? (
        <Row>
          {favorites.map((job) => (
            <Col md={6} lg={4} key={job._id} className="mb-3">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Card.Title className="h5 mb-3">{job.title}</Card.Title>
                      <Card.Text className="text-muted mb-2">
                        <strong>Azienda:</strong> {job.company_name}
                      </Card.Text>
                      <Card.Text className="text-muted">
                        <strong>Categoria:</strong> {job.category}
                      </Card.Text>
                    </div>
                  </div>
                  <Button
                    variant="outline-danger"
                    className="mt-3 align-self-start"
                    onClick={() => dispatch(removeFromFavorites(job._id))}
                  >
                    Rimuovi dai preferiti
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-muted">Nessuna offerta preferita.</p>
      )}
    </Container>
  );
};

export default Favourites;
