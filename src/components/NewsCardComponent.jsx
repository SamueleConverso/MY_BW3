/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Container } from "react-bootstrap";
import { ChevronCompactDown, ChevronCompactUp } from "react-bootstrap-icons";

const NewsCardComponent = ({ infoHome }) => {
  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const API_KEY = "1121e117f9f647919c31cb873e8210c8";
  const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.articles) {
          setNews(data.articles);
        } else {
          console.error("Errore: 'articles' non trovato nella risposta API");
        }
      } catch (error) {
        console.error("Errore nel recupero delle notizie:", error);
      }
    };

    fetchNews();
  }, []);

  const toggleNews = () => {
    if (expanded) {
      setVisibleCount(5);
      setExpanded(false);
    } else {
      setVisibleCount((prevCount) => prevCount + 5);
      setExpanded(true);
    }
  };

  return (
    <Col md={12}>
      <Card className="mb-3" style={{ width: "100%", minWidth: "300px" }}>
        <Card.Body>
          <Container fluid className="p-0">
            <Card.Title className="d-flex justify-content-between align-items-center">
              <h2>In primo piano</h2>
              <img
                src={infoHome}
                alt="Premium Icon"
                width="15"
                height="15"
                className="ms-auto"
              />
            </Card.Title>
          </Container>
          <Card.Subtitle className="mb-2 text-muted border-bottom border-2 pb-1 border-light-subtle">
            a cura di LinkedinNews
          </Card.Subtitle>
          <ul className="list-unstyled">
            {news.length > 0 ? (
              news.slice(0, visibleCount).map((article, index) => (
                <li key={index} className="mb-3">
                  <strong>{article.title}</strong> <br />
                  <small className="text-muted">
                    {new Date(article.publishedAt).toLocaleTimeString()} •{" "}
                    {article.source?.name || "Sconosciuto"}
                  </small>
                  {article.urlToImage && (
                    <div className="mt-2">
                      <img
                        src={article.urlToImage}
                        alt="News"
                        style={{ width: "100%", borderRadius: "5px" }}
                      />
                    </div>
                  )}
                  <hr
                    style={{ border: "1px solid #e5e5e5", margin: "10px 0" }}
                  />
                </li>
              ))
            ) : (
              <li>Caricamento notizie...</li>
            )}
          </ul>
          <Card.Link
            href="#"
            onClick={toggleNews}
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {expanded ? "Mostra meno" : "Vedi altro"}
            {expanded ? (
              <ChevronCompactUp className="mx-2" style={{ fontSize: "20px" }} />
            ) : (
              <ChevronCompactDown
                className="mx-2"
                style={{ fontSize: "20px" }}
              />
            )}
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

NewsCardComponent.propTypes = {
  infoHome: PropTypes.string.isRequired,
};

export default NewsCardComponent;
