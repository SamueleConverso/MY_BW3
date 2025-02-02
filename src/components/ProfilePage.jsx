import { Col, Container, Row } from "react-bootstrap";
import CentralSection from "./CentralSection";
import SideBar from "./SideBar";
import { useDispatch } from "react-redux";
import { getExperience, getMyProfile } from "../redux/action";
import { useEffect } from "react";

function ProfilePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getExperience());
  });

  return (
    <div style={{ backgroundColor: "#F4F2EE" }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={8} className="order-first order-lg-first">
            <CentralSection />
          </Col>

          <Col xs={12} lg={4} className="order-last order-lg-last">
            <SideBar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfilePage;
