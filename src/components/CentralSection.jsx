import { Button, Card, Form, Modal, Container, Spinner } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import ExperienceSection from "./ExperienceSection";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExp,
  postExperience,
  postPropic,
  putExperience,
  putProfile,
} from "../redux/action";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import InterestsSections from "./InterestsSections";

function CentralSection() {
  const [show, setShow] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showExperiencePut, setShowExperiencePut] = useState(false);
  const [showProfilePut, setShowProfilePut] = useState(false);
  const [randomImage, setRandomImage] = useState(null);
  const API_KEY = "48545245-df42dd6ae1b58ed4617a974db";

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=coding&image_type=photo&per_page=50`
      );
      const data = await response.json();

      if (data.hits.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        setRandomImage(data.hits[randomIndex].largeImageURL);
      }
    } catch (error) {
      console.error("Errore nel fetch delle immagini:", error);
    }
  };

  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    area: "",
    description: "",
  });
  const [expForPutState, setExpForPutState] = useState({});
  const [expPic, setExpPic] = useState();
  const [hasDelPut, setHasDelPut] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowExperience = () => setShowExperience(true);
  const handleCloseExperience = () => setShowExperience(false);
  const handleCloseExperiencePut = () => {
    setShowExperiencePut(false);
    dispatch({
      type: "GET_EXPFORPUT",
      payload: {},
    });
  };
  const handleCloseProfilePut = () => setShowProfilePut(false);

  const handleCloseExperienceDel = () => {
    dispatch({
      type: "SHOW_EXPERIENCE_DEL",
      payload: false,
    });
  };

  const dispatch = useDispatch();

  // USE SELECTOR
  const myProfile = useSelector((state) => {
    return state.myProfile;
  });
  const newExpId = useSelector((state) => {
    return state.newExperienceId;
  });
  const expForPut = useSelector((state) => {
    return state.expForPut;
  });
  const showExperienceDel = useSelector((state) => {
    return state.showExperienceDel.show;
  });
  const delId = useSelector((state) => {
    return state.showExperienceDel.id;
  });
  const hasExpPicPut = useSelector((state) => {
    return state.hasExpPicPut;
  });
  const hasExpPicPost = useSelector((state) => {
    return state.hasExpPicPost;
  });
  const hasPropicLoaded = useSelector((state) => {
    return state.hasPropicLoaded;
  });
  const hasExpLoaded = useSelector((state) => {
    return state.hasExpLoaded;
  });

  const [myProfileInfo, setMyProfileInfo] = useState({});

  const handlePropic = (e) => {
    const propicData = new FormData();
    propicData.append("profile", e.target.files[0]);
    dispatch(postPropic(propicData));
  };

  const handleExpPic = (e) => {
    e.preventDefault();
    const expPicData = new FormData();
    expPicData.append("experience", e.target.files[0]);
    setExpPic(expPicData);
    dispatch({
      type: "HAS_EXP_PIC_POST",
      payload: true,
    });
  };

  const handleExpPicPut = (e) => {
    e.preventDefault();
    const expPicData = new FormData();
    expPicData.append("experience", e.target.files[0]);
    setExpPic(expPicData);
    dispatch({
      type: "HAS_EXP_PIC_PUT",
      payload: true,
    });
  };

  const handleNewExperience = (e) => {
    e.preventDefault();
    dispatch(postExperience(newExperience, expPic, newExpId, hasExpPicPost));

    setNewExperience({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      area: "",
      description: "",
    });
  };

  const handlePutExperience = (e) => {
    e.preventDefault();
    dispatch(putExperience(expForPutState, expForPut, hasExpPicPut, expPic));
  };

  const handlePutProfile = (e) => {
    e.preventDefault();
    dispatch(putProfile(myProfileInfo));
  };

  useEffect(() => {
    if (expForPut.role) {
      setShowExperiencePut(true);
      setExpForPutState({
        role: expForPut.role,
        company: expForPut.company,
        startDate: expForPut.startDate,
        endDate: expForPut.endDate,
        area: expForPut.area,
        description: expForPut.description,
      });
    }
  }, [expForPut]);

  useEffect(() => {
    setMyProfileInfo({
      name: myProfile.name,
      surname: myProfile.surname,
      email: myProfile.email,
      bio: myProfile.bio,
      title: myProfile.title,
      area: myProfile.area,
    });
  }, [myProfile]);

  return (
    <Container className="mt-3 my-3 ">
      <div className="container-fluid p-0">
        <Card
          className="border-0 shadow-sm rounded-3"
          style={{ minHeight: "400px" }}
        >
          <Card.Img
            className="card-img-top"
            style={{
              height: "200px",
              objectFit: "cover",
              backgroundImage: `url(${randomImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          />
          <div className="position-relative">
            <Button
              onClick={handleShow}
              className="position-absolute translate-middle-y rounded-circle p-0 border-2 border-white"
              style={{
                width: "85px",
                height: "85px",
                top: "20%",
                left: "5%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {hasPropicLoaded ? (
                <img
                  src={myProfile.image || "https://placecats.com/300/300"}
                  alt="Profile"
                  className="w-100 h-100 rounded-circle"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Button>
          </div>

          <div
            className="position-absolute d-flex justify-content-center align-items-center rounded-circle bg-white"
            style={{
              top: "4%",
              right: "5%",
              width: "40px",
              height: "40px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Icon.Pencil style={{ color: "#0B66C2", fontSize: "20px" }} />
          </div>

          <Card.Body className="pt-5">
            <div className="d-flex justify-content-between flex-wrap mb-2">
              <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-2">
                <Card.Title className="m-0">
                  {myProfile.name} {myProfile.surname}
                </Card.Title>
                <div
                  className="d-flex align-items-center px-2 py-1 border rounded-3"
                  style={{
                    borderColor: "#0B66C2",
                    color: "#0B66C2",
                    fontSize: "12px",
                  }}
                >
                  <Icon.ShieldCheck
                    className="me-1"
                    style={{ fontSize: "12px" }}
                  />
                  <span>Aggiungi badge di verifica</span>
                </div>
              </div>
              <button className="btn" onClick={() => setShowProfilePut(true)}>
                <Icon.Pencil className="align-self-center" />
              </button>
            </div>

            <Card.Text className="text-muted mt-1" style={{ fontSize: "14px" }}>
              {myProfile.title}
            </Card.Text>

            <div className="d-flex flex-wrap gap-1 mb-1">
              <p className="m-0 text-muted" style={{ fontSize: "12px" }}>
                {myProfile.area}
              </p>
              <p className="m-0" style={{ fontSize: "12px" }}>
                &middot;
              </p>
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "#0B66C2", fontSize: "12px" }}
              >
                Informazioni di contatto
              </a>
            </div>

            <a
              href="#"
              className="text-decoration-none d-block mb-2"
              style={{ color: "#0B66C2", fontSize: "12px" }}
            >
              14 collegamenti
            </a>

            <div className="d-flex flex-wrap gap-2 mb-3">
              <p
                className="m-0 bg-primary text-white rounded-3 px-3 py-1"
                style={{ fontSize: "12px" }}
              >
                Disponibile per
              </p>
              <p
                className="m-0 border rounded-3 px-3 py-1 text-primary"
                style={{
                  fontSize: "12px",
                  borderColor: "#0B66C2",
                  cursor: "pointer",
                }}
              >
                Aggiungi sezione del profilo
              </p>
              <p
                className="m-0 border rounded-3 px-3 py-1 text-primary"
                style={{
                  fontSize: "12px",
                  borderColor: "#0B66C2",
                  cursor: "pointer",
                }}
              >
                Migliora profilo
              </p>
              <p
                className="m-0 border rounded-3 px-3 py-1 text-muted"
                style={{
                  fontSize: "12px",
                  borderColor: "gray",
                  cursor: "pointer",
                }}
              >
                Altro
              </p>
            </div>

            <div
              className="w-100 rounded-3 p-3"
              style={{ backgroundColor: "#DDE7F1" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="m-0 fw-bold" style={{ fontSize: "14px" }}>
                  Disponibile a lavorare
                </p>
                <Icon.Pencil />
              </div>
              <p className="m-0" style={{ fontSize: "12px" }}>
                Altra descrizione...
              </p>
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "#0B66C2", fontSize: "12px" }}
              >
                Mostra dettagli
              </a>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Scegli un Immagine profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" name="proPicInput" onChange={handlePropic} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          marginTop: "10px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "16px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <p className="ms-3" style={{ fontWeight: "bold", fontSize: "14px" }}>
            Consigliato per te
          </p>
          <Icon.X
            className="text-black"
            style={{ cursor: "pointer", fontSize: "16px" }}
          />
        </div>

        <p className="ms-3 text-secondary" style={{ fontSize: "12px" }}>
          <Icon.EyeFill /> Solo per te
        </p>

        <div
          style={{
            width: "90%",
            borderRadius: "12px",
            margin: "10px auto 0 auto",
            padding: "12px",
            backgroundColor: "#f8f9fa",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="d-flex align-items-center">
            <img
              src="https://placecats.com/50/50"
              alt="User"
              style={{
                borderRadius: "10px",
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
            <p className="m-2" style={{ fontSize: "12px", color: "#333" }}>
              Entra in contatto con una persona che ricopre il ruolo di
              ingegnere Full Stack per raggiungere i tuoi obiettivi
              professionali
            </p>
          </div>

          <p
            className="mb-5 text-secondary"
            style={{ fontSize: "10px", marginTop: "10px" }}
          >
            Trova persone che possono fornire indicazioni e aiutarti a trovare
            potenziali opportunità.
          </p>

          <p
            style={{
              marginBottom: "0px",
              border: "1px solid #ddd",
              width: "fit-content",
              borderRadius: "20px",
              color: "#007bff",
              cursor: "pointer",
              fontSize: "12px",
              padding: "6px 12px",
              textAlign: "center",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#007bff";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#007bff";
            }}
          >
            Cerca persone
          </p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          marginTop: "20px",
          border: "1px solid #ddd",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
            Analisi
          </p>
          <Icon.X
            className="text-black"
            style={{ cursor: "pointer", fontSize: "18px" }}
          />
        </div>

        <p
          className="m-0 text-secondary"
          style={{ fontSize: "12px", marginTop: "5px" }}
        >
          <Icon.EyeFill style={{ fontSize: "12px" }} /> Solo per te
        </p>

        <div className="d-flex gap-3 mt-3 justify-content-center">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              padding: "10px",
              width: "130px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            className="cardAnalisi"
          >
            <Icon.PeopleFill style={{ fontSize: "30px", color: "#0B66C2" }} />
            <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
              7 visualizzazioni del profilo
            </p>
            <p
              className="m-0 text-center"
              style={{ fontSize: "12px", color: "#6c757d" }}
            >
              Scopri chi ha visitato il tuo profilo.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              padding: "10px",
              width: "130px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            className="cardAnalisi"
          >
            <Icon.BarChartFill style={{ fontSize: "30px", color: "#0B66C2" }} />
            <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
              2 impressioni dei post
            </p>
            <p
              className="m-0 text-center"
              style={{ fontSize: "12px", color: "#6c757d" }}
            >
              Scopri chi sta interagendo con i tuoi post.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              padding: "10px",
              width: "130px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            className="cardAnalisi"
          >
            <Icon.Search style={{ fontSize: "30px", color: "#0B66C2" }} />
            <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
              3 comparse nei motori di ricerca
            </p>
            <p
              className="m-0 text-center"
              style={{ fontSize: "12px", color: "#6c757d" }}
            >
              Vedi quante volte compari nei risultati di ricerca.
            </p>
          </div>
        </div>

        <hr style={{ marginTop: "20px", borderColor: "#ddd" }} />

        <p
          className="m-0 text-center"
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#0B66C2",
            cursor: "pointer",
          }}
        >
          Mostra tutte le analisi
          <Icon.ArrowRight className="ms-1" />
        </p>
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          marginTop: "10px",
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "12px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 fw-bold fs-5">Attività</p>
          <div className="d-flex gap-2">
            <Link
              to="/"
              className="m-0"
              style={{
                color: "#0B66C2",
                fontWeight: "bold",
                border: "2px solid #0B66C2",
                borderRadius: "10px",
                padding: "6px 12px",
                cursor: "pointer",
                transition: "background 0.3s",
                textDecoration: "none",
                display: "inline-block",
              }}
              onMouseOver={(e) =>
                (e.target.style.background = "rgba(122, 181, 240, 0.54)")
              }
              onMouseOut={(e) => (e.target.style.background = "white")}
            >
              Crea un post
            </Link>
          </div>
        </div>

        <a
          href="#"
          className="d-block mt-2 text-decoration-none fw-bold"
          style={{ color: "#0B66C2", fontSize: "16px" }}
        >
          0 follower
        </a>

        <p
          className="m-0 fw-bold text-secondary mt-2"
          style={{ fontSize: "14px" }}
        >
          Non hai ancora pubblicato nulla
        </p>
        <p className="m-0 text-secondary" style={{ fontSize: "14px" }}>
          I post che condividi appariranno qui.
        </p>

        <hr className="my-3" />

        <p
          className="m-0 text-center fw-bold"
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#0B66C2",
            cursor: "pointer",
          }}
        >
          Mostra tutte le attività
          <Icon.ArrowRight className="ms-2" style={{ color: "#0B66C2" }} />
        </p>
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          marginTop: "10px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {hasExpLoaded ? (
          <ExperienceSection />
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        <div className="text-center">
          <Button
            onClick={handleShowExperience}
            className="btn rounded-pill fw-bold mt-3 d-flex align-items-center justify-content-center"
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
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#0B66C2";
              e.target.style.color = "white";
              e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#0B66C2";
              e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
            }}
          >
            Aggiungi Esperienza
          </Button>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          marginTop: "10px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <p
            className="m-0 fw-bold"
            style={{ fontSize: "18px", color: "#333" }}
          >
            Competenze
          </p>
          <div className="d-flex flex-wrap gap-2 mt-2">
            <span
              className="badge bg-primary"
              style={{
                fontSize: "14px",
                padding: "6px 12px",
                borderRadius: "30px",
              }}
            >
              React
            </span>
            <span
              className="badge bg-secondary"
              style={{
                fontSize: "14px",
                padding: "6px 12px",
                borderRadius: "30px",
              }}
            >
              JavaScript
            </span>
            <span
              className="badge bg-success"
              style={{
                fontSize: "14px",
                padding: "6px 12px",
                borderRadius: "30px",
              }}
            >
              CSS
            </span>
            <span
              className="badge bg-info"
              style={{
                fontSize: "14px",
                padding: "6px 12px",
                borderRadius: "30px",
              }}
            >
              Bootstrap
            </span>
            <span
              className="badge bg-warning"
              style={{
                fontSize: "14px",
                padding: "6px 12px",
                borderRadius: "30px",
              }}
            >
              HTML
            </span>
            <span
              className="badge bg-dark"
              style={{
                fontSize: "14px",
                padding: "6px 12px",
                borderRadius: "30px",
              }}
            >
              Node.js
            </span>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            backgroundColor: "white",
            marginTop: "10px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="d-flex justify-content-between mb-3">
            <p className="m-0 fw-bold align-self-center fs-5">Formazione</p>
            <div className="d-flex gap-3">
              <Icon.Plus
                className="align-self-center"
                style={{
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "#0B66C2",
                }}
              />
              <Icon.Pencil
                className="align-self-center"
                style={{ cursor: "pointer", color: "#0B66C2" }}
              />
            </div>
          </div>

          <p className="m-0 fw-bold">Harvard University</p>
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/800px-Harvard_University_coat_of_arms.svg.png"
              alt="Harvard University"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
            <p className="m-0">Master in Computer Science • 2022 - 2024</p>
          </div>
          <hr />

          <p className="m-0 fw-bold">
            Massachusetts Institute of Technology (MIT)
          </p>
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/4/44/MIT_Seal.svg"
              alt="MIT"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
            <p className="m-0">
              Bachelor in Artificial Intelligence • 2018 - 2022
            </p>
          </div>
          <hr />

          <p className="m-0 fw-bold">Stanford University</p>
          <div className="d-flex align-items-center gap-2">
            <img
              src="data:image/png;base64,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"
              alt="Stanford University"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
            <p className="m-0">
              Specializzazione in Machine Learning • 2024 - Presente
            </p>
          </div>
          <hr className="mb-0" />

          <p
            className="m-0 text-center text-primary fw-medium"
            style={{ cursor: "pointer" }}
          >
            Mostra tutta la formazione (3)
            <Icon.ArrowRight className="ms-1" />
          </p>
        </div>
      </div>

      <InterestsSections />

      {/* MODALE PER POST EXP */}
      <Modal show={showExperience} onHide={handleCloseExperience}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi un Esperienza!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewExperience}>
            <Form.Label className="mt-2 fw-lighter">Ruolo</Form.Label>
            <Form.Control
              type="text"
              required
              value={newExperience.role}
              onChange={(e) => {
                setNewExperience({
                  ...newExperience,
                  role: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">Azienda</Form.Label>
            <Form.Control
              type="text"
              required
              value={newExperience.company}
              onChange={(e) => {
                setNewExperience({
                  ...newExperience,
                  company: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">
              Descrivici la tua esperienza lavorativa
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={newExperience.description}
              onChange={(e) => {
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">Data di inizio</Form.Label>
            <Form.Control
              type="date"
              required
              value={newExperience.startDate.split("T")[0]}
              onChange={(e) => {
                setNewExperience({
                  ...newExperience,
                  startDate: e.target.value,
                });
              }}
            />
            <Form.Label>Questa esperienza di lavoro si è terminata</Form.Label>
            <Form.Check className="ms-2" />
            <Form.Label className="mt-2 fw-lighter">Data di fine</Form.Label>
            <Form.Control
              type="date"
              value={newExperience.endDate.split("T")[0]}
              onChange={(e) => {
                setNewExperience({
                  ...newExperience,
                  endDate: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">Zona di lavoro</Form.Label>
            <Form.Control
              type="text"
              value={newExperience.area}
              onChange={(e) => {
                setNewExperience({
                  ...newExperience,
                  area: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">
              Immagine Azienda
            </Form.Label>
            <input
              type="file"
              name="proPicInput"
              onChange={(e) => {
                handleExpPic(e);
              }}
            />
            <Button
              type="submit"
              className="btn rounded-pill border border-1 text-white px-3 py-1 fw-medium mt-3 ms-1"
            >
              Salva
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExperience}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODALE PER PUT */}
      <Modal
        show={showExperiencePut}
        onHide={handleCloseExperiencePut}
        onShow={() => {
          setHasDelPut(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica Esperienza!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePutExperience}>
            <Form.Label className="mt-2 fw-lighter">Ruolo</Form.Label>
            <Form.Control
              type="text"
              required
              value={expForPutState.role}
              onChange={(e) => {
                setExpForPutState({
                  ...expForPutState,
                  role: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">Azienda</Form.Label>
            <Form.Control
              type="text"
              required
              value={expForPutState.company}
              onChange={(e) => {
                setExpForPutState({
                  ...expForPutState,
                  company: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">
              Descrivici la tua esperienza lavorativa
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={expForPutState.description}
              onChange={(e) => {
                setExpForPutState({
                  ...expForPutState,
                  description: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">Data di inizio</Form.Label>
            <Form.Control
              type="date"
              required
              value={
                expForPutState.startDate &&
                expForPutState.startDate.split("T")[0]
              }
              onChange={(e) => {
                setExpForPutState({
                  ...expForPutState,
                  startDate: e.target.value,
                });
              }}
            />
            <Form.Label>Questa esperienza di lavoro si è terminata</Form.Label>
            <Form.Check className="ms-2" />
            <Form.Label className="mt-2 fw-lighter">Data di fine</Form.Label>
            <Form.Control
              type="date"
              value={
                expForPutState.endDate && expForPutState.endDate.split("T")[0]
              }
              onChange={(e) => {
                setExpForPutState({
                  ...expForPutState,
                  endDate: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">Zona di lavoro</Form.Label>
            <Form.Control
              type="text"
              value={expForPutState.area}
              onChange={(e) => {
                setExpForPutState({
                  ...expForPutState,
                  area: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-3 fw-lighter">
              Immagine Azienda:
            </Form.Label>
            <div>
              {!hasDelPut && expForPut.image && (
                <div>
                  <img
                    src={expForPut.image}
                    alt="immagine azienda"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  />
                  <button
                    className="btn"
                    onClick={() => {
                      setExpForPutState({
                        ...expForPutState,
                        image: null,
                      });
                      setHasDelPut(true);
                    }}
                  >
                    <Icon.XCircleFill className="text-danger" />
                  </button>
                </div>
              )}
              <input
                className="mt-1"
                type="file"
                name="proPicInput"
                onChange={(e) => {
                  handleExpPicPut(e);
                }}
              />
            </div>
            <Button
              type="submit"
              className="btn rounded-pill border border-1 text-white px-3 py-1 fw-medium mt-3 ms-1"
            >
              Salva
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExperiencePut}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODALE PER LA DELETE DI EXP */}
      <Modal show={showExperienceDel} onHide={handleCloseExperienceDel}>
        <Modal.Header closeButton>
          <Modal.Title>ELIMINARE Esperienza?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sei sicuro di voler eliminare questa esperienza?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(deleteExp(delId));
            }}
          >
            SI ELIMINA
          </Button>
          <Button variant="secondary" onClick={handleCloseExperienceDel}>
            NO
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODALE PER LA PUT DEL PROFILO */}
      <Modal size="lg" show={showProfilePut} onHide={handleCloseProfilePut}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Profilo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handlePutProfile}>
            <Form.Label className="mt-2 fw-lighter">Nome</Form.Label>
            <Form.Control
              type="text"
              required
              value={myProfileInfo.name}
              onChange={(e) => {
                setMyProfileInfo({
                  ...myProfileInfo,
                  name: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">Cognome</Form.Label>
            <Form.Control
              type="text"
              required
              value={myProfileInfo.surname}
              onChange={(e) => {
                setMyProfileInfo({
                  ...myProfileInfo,
                  surname: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">Email</Form.Label>
            <Form.Control
              type="text"
              required
              value={myProfileInfo.email}
              onChange={(e) => {
                setMyProfileInfo({
                  ...myProfileInfo,
                  email: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">Biografia</Form.Label>
            <Form.Control
              as="textarea"
              required
              value={myProfileInfo.bio}
              onChange={(e) => {
                setMyProfileInfo({
                  ...myProfileInfo,
                  bio: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">
              Occupazione Attuale
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={myProfileInfo.title}
              onChange={(e) => {
                setMyProfileInfo({
                  ...myProfileInfo,
                  title: e.target.value,
                });
              }}
            />
            <Form.Label className="mt-2 fw-lighter">Area di Lavoro</Form.Label>
            <Form.Control
              type="text"
              required
              value={myProfileInfo.area}
              onChange={(e) => {
                setMyProfileInfo({
                  ...myProfileInfo,
                  area: e.target.value,
                });
              }}
            />
            <Button
              type="submit"
              className="btn rounded-pill border border-1 text-white px-3 py-1 fw-medium mt-3 ms-1"
            >
              Salva
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProfilePut}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CentralSection;
