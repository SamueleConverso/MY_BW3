import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { Container, Row, Col, Image } from "react-bootstrap";

const InterestsSection = () => {
  const [activeTab, setActiveTab] = useState("aziende");

  const companies = [
    {
      name: "Amazon",
      followers: "33 mln di follower",
      image:
        "https://static.vecteezy.com/ti/vettori-gratis/p1/14018561-amazon-logo-su-trasparente-sfondo-gratuito-vettoriale.jpg",
    },
    {
      name: "Meta",
      followers: "28 mln di follower",
      image:
        "https://logos-world.net/wp-content/uploads/2021/11/Meta-Emblem.png",
    },
    {
      name: "Google",
      followers: "40 mln di follower",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png",
    },
  ];

  const university = {
    name: "Epicode",
    course: "Corso Full Stack Web Developer",
    image:
      "https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_2/opuditjprznysvuug8jw",
  };
  return (
    <Container fluid className="bg-white mt-3 border rounded-3 p-3 shadow-sm">
      <p className="m-0 fw-bold fs-5 mb-3">Interessi</p>

      <Row className="border-bottom pb-2 mb-3">
        <Col xs={6} className="text-center">
          <p
            className={`m-0 ${
              activeTab === "aziende" ? "fw-bold text-success" : "text-muted"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("aziende")}
          >
            Aziende
          </p>
        </Col>
        <Col xs={6} className="text-center">
          <p
            className={`m-0 ${
              activeTab === "universita" ? "fw-bold text-success" : "text-muted"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("universita")}
          >
            Corsi e Università
          </p>
        </Col>
      </Row>

      {activeTab === "aziende" && (
        <Row className="gy-3">
          {companies.map((company, index) => (
            <Col xs={12} md={4} key={index}>
              <div className="d-flex align-items-center">
                <Image
                  src={company.image}
                  alt={company.name}
                  roundedCircle
                  width={50}
                  height={50}
                  className="me-3"
                />
                <div>
                  <p className="fw-bold m-0">{company.name}</p>
                  <p className="text-muted small">{company.followers}</p>
                  <p className="border border-secondary rounded-pill px-2 py-1 d-inline-block small">
                    <Icon.Check className="me-1" />
                    Già segui
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      {activeTab === "universita" && (
        <Row>
          <Col xs={12}>
            <div className="d-flex align-items-center">
              <Image
                src={university.image}
                alt={university.name}
                roundedCircle
                width={50}
                height={50}
                className="me-3"
              />
              <div>
                <p className="fw-bold m-0">{university.name}</p>
                <p className="text-muted small">{university.course}</p>
                <p className="border border-secondary rounded-pill px-2 py-1 d-inline-block small">
                  <Icon.Check className="me-1" />
                  Già segui
                </p>
              </div>
            </div>
          </Col>
        </Row>
      )}

      <hr className="my-3" />
      <p
        className="m-0 text-center text-primary fw-medium"
        style={{ cursor: "pointer" }}
      >
        Mostra tutti gli interessi
        <Icon.ArrowRight className="ms-1" />
      </p>
    </Container>
  );
};

export default InterestsSection;
