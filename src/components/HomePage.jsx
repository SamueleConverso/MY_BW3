/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import {
  PersonFillAdd,
  BookmarkFill,
  Plus,
  CardImage,
} from "react-bootstrap-icons";
import HomePagePremium from "../assets/HomePagePremium.svg";
import infoHome from "../assets/infoHome.svg";
import SinglePost from "./SinglePost";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPosts, getMyProfile } from "../redux/action";
import { useSelector } from "react-redux";
import * as Icon from "react-bootstrap-icons";
import { useState } from "react";
import { sendPost } from "../redux/action";
import { getComments } from "../redux/action";
import { Link } from "react-router-dom";
import NewsCardComponent from "./NewsCardComponent";

const HomePage = () => {
  const [writtenPost, setWrittenPost] = useState("");
  const [isPostPic, setIsPostPic] = useState(false);
  const [pic, setPic] = useState(null);
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.myProfile);
  const [fileName, setFileName] = useState("");
  // const [showCard, setShowCard] = useState(true);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getMyProfile());
    dispatch(getComments());
  }, []);

  const posts = useSelector((state) => {
    return state.posts;
  });
  const showCard = useSelector((state) => {
    return state.showCard;
  });

  const hasPostsLoaded = useSelector((state) => {
    return state.hasPostsLoaded;
  });

  const handleSubmit = function () {
    setWrittenPost("");
    if (!pic && !isPostPic) {
      dispatch(sendPost(writtenPost));
    } else {
      dispatch(sendPost(writtenPost, pic));
      setFileName(null);
      setPic(null);
      setIsPostPic(false);
    }
  };
  const handlePostPic = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const newPic = new FormData();
    newPic.append("post", e.target.files[0]);
    setPic(newPic);
    setIsPostPic(true);
  };

  return (
    <Container fluid className="py-3" style={{ backgroundColor: "#F4F2EE" }}>
      <Container className="home-container">
        <Row>
          {/* Left Sidebar */}
          <Col md={3}>
            <Card className="mb-3">
              <Card.Body className="text-center position-relative">
                <Link to="/profile">
                  <img
                    src={
                      myProfile.image ||
                      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    }
                    alt="Profile Avatar"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                </Link>

                <Card.Title>
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {myProfile.name} {myProfile.surname}
                  </Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {myProfile.title || "Cosa fa nella vita"}
                </Card.Subtitle>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-start">
                    <span className="text-secondary">Collegamenti</span>
                    <br />
                    <strong>Espandi la tua rete</strong>
                  </div>
                  <PersonFillAdd />
                </div>
                <hr />

                <Card.Text className="text-secondary text-start ">
                  Fai crescere la tua carriera <br />
                  Prova Premium <br />
                  <img
                    src={HomePagePremium}
                    alt="Premium Icon"
                    width="24"
                    height="24"
                    className="me-2"
                  />
                  <strong className="text-dark">
                    Da non perdere: Premium per 0 EUR
                  </strong>
                  <br />
                </Card.Text>
                <hr />
                <Link to="/favourites" className="text-decoration-none">
                  <button className="btn btn-light d-flex align-items-center justify-content-center w-100 rounded-pill fw-bold py-2 my-2 position-relative overflow-hidden linkedin-style-button">
                    <span className="d-flex align-items-center z-2 position-relative">
                      <BookmarkFill
                        className="me-2"
                        size={20}
                        color="#0A66C2"
                      />{" "}
                      <span className="text-dark">Elementi salvati</span>
                    </span>
                  </button>
                </Link>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Text href="#" className="text-primary">
                  Gruppi
                </Card.Text>
                <Card.Text className="text-primary d-flex justify-content-between align-items-center">
                  Eventi
                  <Plus size={24} className="text-dark" />
                </Card.Text>

                <hr />
                <Card.Link
                  href="#"
                  className="d-block text-center text-decoration-none text-secondary"
                >
                  <strong> Scopri di più </strong>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col md={6}>
            {showCard && (
              <Card className="mb-3">
                <Card.Body>
                  <img
                    className="mx-auto d-block"
                    src="src\assets\img\AAYQAgSuAAgAAQAAAAAAABlvNp5yzndgSdCsu3q6Pw22qA.png"
                    alt=""
                    style={{ width: "30%", height: "30%" }}
                  />
                  <h5 className="text-center">
                    Ciao {myProfile.name}, in questo momento stai cercando un
                    lavoro?
                  </h5>

                  <p className="text-secondary text-center">
                    Solo tu puoi vedere la tua risposta
                  </p>
                  <div>
                    <Button
                      variant="outline-primary"
                      className="me-2 jobButton"
                      style={{ width: "50%", borderRadius: "25px" }}
                      onClick={() => {
                        dispatch({
                          type: "SHOW_CARD",
                          payload: false,
                        });
                      }}
                    >
                      Sì
                    </Button>
                    <Button
                      variant="outline-primary"
                      style={{ width: "48%", borderRadius: "25px" }}
                      onClick={() => {
                        dispatch({
                          type: "SHOW_CARD",
                          payload: false,
                        });
                      }}
                    >
                      No, ma sono disponibile
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}

            <Card className="mb-3">
              <Card.Body>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (writtenPost) {
                      handleSubmit();
                    } else {
                      alert("Scrivi qualcosa.");
                    }
                  }}
                >
                  <Form.Group className="d-flex">
                    <img
                      src={
                        myProfile.image ||
                        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                      }
                      alt="Profile Avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    />
                    <Form.Control
                      value={writtenPost}
                      onChange={(e) => {
                        setWrittenPost(e.target.value);
                      }}
                      type="text"
                      placeholder="Scrivi qualcosa..."
                      style={{ borderRadius: "25px", fontWeight: "600" }}
                      className="ms-1"
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex flex-column align-items-center justify-content-between mt-3">
                  <div className="d-flex flex-column align-items-center mb-3">
                    <label
                      htmlFor="image-upload"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ddd",
                        transition: "background-color 0.3s ease",
                        marginBottom: "8px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e0e0e0")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f0f0f0")
                      }
                    >
                      <CardImage
                        className="me-2 text-primary"
                        style={{ fontSize: "20px", color: "#0a66c2" }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        Carica un&apos;immagine
                      </span>
                    </label>

                    <input
                      id="image-upload"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        handlePostPic(e);
                        if (e.target.files && e.target.files[0]) {
                          setFileName(e.target.files[0].name);
                        } else {
                          setFileName(null);
                        }
                      }}
                      style={{ display: "none" }}
                    />

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      {fileName ? fileName : "Nessun file caricato"}
                    </div>
                  </div>

                  <Button
                    className="align-self-center postButton23"
                    variant="light"
                    style={{
                      width: "fit-content",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      backgroundColor: "#fff",
                      color: "#0a66c2",
                      border: "2px solid #0a66c2",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#0a66c2";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#fff";
                      e.currentTarget.style.color = "#0a66c2";
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (writtenPost) {
                        handleSubmit();
                      } else {
                        alert("Scrivi qualcosa.");
                      }
                    }}
                  >
                    <Icon.Check
                      style={{ fontSize: "24px", color: "inherit" }}
                    />
                    Pubblica post
                  </Button>
                </div>
              </Card.Body>
            </Card>
            {hasPostsLoaded ? (
              <div>
                {posts &&
                  posts
                    .slice(posts.length - 25, posts.length)
                    .reverse()
                    .map((post) => {
                      return <SinglePost key={post._id} post={post} />;
                    })}
              </div>
            ) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            {/* <Card>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/72px-LinkedIn_icon.svg.png"
                    roundedCircle
                    className="me-2"
                    width="48"
                    height="48"
                  />
                  <div>
                    <h6 className="mb-0">LinkedIn Notizie</h6>
                    <small className="text-muted">
                      992.394 follower <br /> Post sponsorizzato
                    </small>
                  </div>
                </div>
                <Card.Title>Prima del colloquio, rileggi il tuo CV</Card.Title>
                <Card.Text>
                  In un post HR manager Francesco Perillo riporta alcuni esempi
                  concreti di...
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="light" className="commentButton">
                    <HandThumbsUp /> Consiglia
                  </Button>
                  <Button variant="light" className="commentButton">
                    <ChatDots /> Commenta
                  </Button>
                  <Button variant="light" className="commentButton">
                    <ArrowRepeat /> Diffondi il post
                  </Button>
                  <Button variant="light" className="commentButton">
                    <img
                      src={send}
                      alt="Premium Icon"
                      width="15"
                      height="15"
                      className="me-2"
                    />{" "}
                    Condividi
                  </Button>
                </div>
              </Card.Body>
            </Card> */}
          </Col>

          {/* Right Sidebar */}
          <Col md={3} className="d-flex justify-content-center">
            <NewsCardComponent infoHome={infoHome} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
