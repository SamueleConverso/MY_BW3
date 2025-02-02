import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import BorsaLavoro from "../assets/BorsaLavoro.svg";
import { useState, useEffect } from "react";
import NewOfferJob from "../assets/NewOfferJob.svg";
import { BookmarkFill, Bookmark, ListUl } from "react-bootstrap-icons";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/action";

const JobsPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites || []);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const location = useLocation();

  // Fetch dei lavori
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialSearch = searchParams.get("search");
    if (initialSearch) {
      setSearch(initialSearch);
      fetchJobs(initialSearch);
    } else {
      fetchJobs();
    }
  }, [location]);

  const fetchJobs = async (query = "") => {
    setLoading(true);
    const url = query
      ? `https://strive-benchmark.herokuapp.com/api/jobs?search=${query}`
      : "https://strive-benchmark.herokuapp.com/api/jobs";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setJobs(data.data);
      } else {
        console.error("Errore nel recupero dei dati");
      }
    } catch (error) {
      console.error("Errore durante il fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchJobs(search);
  };

  const toggleFavorite = (job) => {
    if (favorites.some((fav) => fav._id === job._id)) {
      dispatch(removeFromFavorites(job._id));
    } else {
      dispatch(addToFavorites(job));
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleNextPage = () => {
    if (indexOfLastJob < jobs.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Container
      fluid
      className="py-3"
      style={{ backgroundColor: "#F4F2EE", overflow: "hidden" }}
    >
      <Container className="jobs-container">
        <Row>
          {/* Left Sidebar */}
          <Col md={3}>
            <Card>
              <Card.Body>
                <Link
                  to="#"
                  className="jobsButton2 p-2 d-flex align-items-center py-3 w-100 text-decoration-none bg-transparent border-0 rounded-3 transition-all position-relative overflow-hidden linkedin-style-button"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <ListUl
                    className="me-2 list-icon"
                    size={32}
                    style={{
                      color: "#0A66C2",
                      transition: "transform 0.3s ease, color 0.3s ease",
                    }}
                  />
                  <strong
                    style={{
                      color: "#333",
                      fontSize: "1.1rem",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Preferenze
                  </strong>

                  <div
                    className="position-absolute top-0 left-0 w-100 h-100 bg-primary opacity-0 transition-all"
                    style={{
                      zIndex: -1,
                      background: "linear-gradient(45deg, #0A66C2, #74b9ff)",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.3s ease, opacity 0.3s ease",
                    }}
                  ></div>
                </Link>
                <Link
                  to="/favourites"
                  className="jobsButton1 p-2 d-flex align-items-center my-3 py-3 w-100 text-decoration-none bg-transparent border-0 rounded-3 transition-all position-relative overflow-hidden linkedin-style-button"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <BookmarkFill
                    className="bookmark-icon me-2"
                    size={32}
                    style={{
                      color: "#0A66C2",
                      transition: "transform 0.3s ease, color 0.3s ease",
                    }}
                  />
                  <strong
                    style={{
                      color: "#333",
                      fontSize: "1.1rem",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Le mie offerte di lavoro
                  </strong>

                  <div
                    className="position-absolute top-0 left-0 w-100 h-100 bg-primary opacity-0 transition-all"
                    style={{
                      zIndex: -1,
                      background: "linear-gradient(45deg, #0A66C2, #74b9ff)",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.3s ease, opacity 0.3s ease",
                    }}
                  ></div>
                </Link>
              </Card.Body>
            </Card>
            <div className="py-3">
              <Button
                variant="outline-primary"
                className="w-100 rounded-pill fs-6 newOfferButton"
              >
                <img
                  src={NewOfferJob}
                  alt="Premium Icon"
                  width="24"
                  height="24"
                  className="me-2"
                />
                Pubblica offerta gratuita
              </Button>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={8}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={BorsaLavoro}
                    alt="Borsa Lavoro Icon"
                    width="50"
                    height="50"
                    className="me-3 mx-center"
                  />
                </div>
                <h5 className="text-center">Cerca offerte di lavoro</h5>
                <form className="d-flex my-4" onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cerca un lavoro"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="btn btn-primary ms-2" type="submit">
                    Cerca
                  </button>
                </form>
                {loading ? (
                  <div className="text-center my-5">
                    <Spinner animation="border" role="status"></Spinner>
                  </div>
                ) : currentJobs.length > 0 ? (
                  currentJobs.map((job) => (
                    <div key={job._id} className="card mb-3 position-relative">
                      <div
                        className="position-absolute top-0 end-0 m-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleFavorite(job)}
                      >
                        {favorites.some((fav) => fav._id === job._id) ? (
                          <BookmarkFill size={24} color="#0A66C2" />
                        ) : (
                          <Bookmark size={24} color="#333" />
                        )}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <p className="card-text">
                          <strong>Azienda:</strong> {job.company_name}
                        </p>
                        <p className="card-text">
                          <strong>Categoria:</strong> {job.category}
                        </p>
                        <p className="card-text">
                          <strong>Descrizione:</strong>{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: job.description,
                            }}
                          />
                        </p>
                        <a
                          href="https://i.makeagif.com/media/6-20-2016/OWLxRA.gif"
                          className="btn btn-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Scopri di più
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nessun lavoro trovato.</p>
                )}
              </Card.Body>
            </Card>

            {/* Pagination controls */}
            <div className="d-flex justify-content-between mt-3">
              <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Precedente
              </Button>
              <Button
                onClick={handleNextPage}
                disabled={indexOfLastJob >= jobs.length}
              >
                Successivo
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default JobsPage;
