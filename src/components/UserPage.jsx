import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
import SecondCentralSection from "./SecondCentralSection";

function UserPage() {
  const { id } = useParams();

  return (
    <Container>
      <Row>
        <Col md={8} xs={12} className="order-1">
          <SecondCentralSection userId={id} />
        </Col>

        <Col md={4} xs={12} className="order-2">
          <SideBar />
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
