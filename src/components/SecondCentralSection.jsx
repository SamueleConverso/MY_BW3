import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useParams } from "react-router-dom";

const SecondCentralSection = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [randomImage, setRandomImage] = useState(null);

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk3NTA4OTE2ZjYzNTAwMTVmZWNiODQiLCJpYXQiOjE3Mzc5Njk4MDEsImV4cCI6MTczOTE3OTQwMX0.gV22i7NwH_DHYfKE81N9UEY1Up6WHrH2EPIoPu8OD9w";

  const API_KEY = "48545245-df42dd6ae1b58ed4617a974db";

  const [selectedSection, setSelectedSection] = useState("Aziende");
  useEffect(() => {
    if (!userId) {
      setError("Nessun ID utente fornito.");
      setLoading(false);
      return;
    }

    const API_URL = `https://striveschool-api.herokuapp.com/api/profile/${userId}`;
    const EXPERIENCE_URL = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`;

    const fetchData = async () => {
      try {
        console.log("🚀 Fetching user from:", API_URL);
        const userResponse = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        if (!userResponse.ok)
          throw new Error(
            `Errore ${userResponse.status}: ${userResponse.statusText}`
          );

        const userData = await userResponse.json();
        setUser(userData);

        console.log(" Fetching experiences from:", EXPERIENCE_URL);
        const expResponse = await fetch(EXPERIENCE_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        if (!expResponse.ok)
          throw new Error(
            `Errore ${expResponse.status}: ${expResponse.statusText}`
          );

        const expData = await expResponse.json();
        setExperiences(expData);
        fetchRandomImage();
      } catch (error) {
        console.error("❌ Errore nel fetch:", error);
        setError("Impossibile caricare il profilo utente o le esperienze.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=coding&image_type=photo&per_page=50`
      );
      const data = await response.json();

      if (data.hits.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        setRandomImage(data.hits[randomIndex].largeImageURL);
      } else {
        console.log("Nessuna immagine trovata.");
      }
    } catch (error) {
      console.error("Errore nel fetch delle immagini:", error);
    }
  };

  if (loading) {
    return null;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <>
      <div style={{ width: "100%", height: "500px" }}>
        <Card style={{ width: "100%", height: "100%", position: "relative" }}>
          <Card.Img
            style={{
              width: "100%",
              height: "50%",
              backgroundImage: `url(${
                randomImage || user?.image || "https://placecats.com/700/700"
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
            variant="top"
          />
          <img
            src={user.image || "https://placecats.com/100/100"}
            style={{
              width: "120px",
              height: "120px",
              position: "absolute",
              top: "30%",
              borderRadius: "50%",
              border: "3px solid white",
              marginLeft: "20px",
              zIndex: 2,
            }}
            alt="Profilo utente"
          />
          <Card.Body
            style={{
              paddingTop: "60px",
              minHeight: "150px",
            }}
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-1">
                <Card.Title className="m-0">
                  {user.name} {user.surname}
                </Card.Title>
                <Icon.VolumeUpFill className="align-self-center" />
              </div>
            </div>
            <Card.Text className="m-0">
              {user.title || "Titolo non disponibile"}
            </Card.Text>
            <div className="d-flex align-items-center gap-1">
              <p
                className="m-0 text-secondary"
                style={{ fontSize: "15px", lineHeight: "1.5" }}
              >
                {user.area || "Località non disponibile"}
              </p>
              <p
                className="m-0 text-secondary"
                style={{ fontSize: "15px", lineHeight: "1.5" }}
              >
                - Italia
              </p>
              <p
                className="m-0"
                style={{ fontSize: "15px", lineHeight: "1.5" }}
              >
                &middot;
              </p>
              <a
                href="#"
                className="text-decoration-none"
                style={{
                  color: "#0B66C2",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                Informazioni di contatto
              </a>
            </div>

            <a
              href="#"
              className="text-decoration-none"
              style={{
                color: "#0B66C2",
                fontSize: "15px",
                display: "block",
                marginTop: "5px",
              }}
            >
              14 collegamenti
            </a>

            <div
              className="d-flex align-items-center"
              style={{
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div className="d-flex">
                <img
                  src="https://placecats.com/700/700"
                  alt="Utente 1"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid white",
                    marginRight: "-10px",
                    zIndex: 2,
                  }}
                />
                <img
                  src="https://placecats.com/700/700"
                  alt="Utente 2"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid white",
                    zIndex: 1,
                  }}
                />
              </div>
              <p
                className="hoverable-text m-0"
                style={{
                  fontSize: "12px",
                  color: "gray",
                  marginLeft: "10px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Michela Vivacqua</strong>,{" "}
                <strong>Gaetano Napoli</strong> e un altro collegamento in
                comune
              </p>
            </div>
            <div className="d-flex gap-1">
              <p
                className="m-0, fw-bold"
                style={{
                  backgroundColor: "#0B66C2",
                  color: "white",
                  width: "110px",
                  height: "35px",
                  borderRadius: "20px",
                  padding: "2px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <Icon.PersonPlus className="align-self-center" />
                {"Collegati"}
              </p>
              <p
                className="m-0, fw-bold"
                style={{
                  color: "#0B66C2",
                  width: "110px",
                  height: "35px",
                  borderRadius: "20px",
                  padding: "2px",
                  cursor: "pointer",
                  border: "1px solid #0B66C2",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                Messaggio
              </p>
              <p
                className="m-0, fw-bold"
                style={{
                  color: "black",
                  width: "70px",
                  borderRadius: "20px",
                  padding: "2px",
                  cursor: "pointer",
                  border: "1px solid gray",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Altro
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div
        style={{
          width: "100%",
          border: "1px solid #d3d3d3",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "white",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        {/*prima card*/}
        <p className="m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          Informazioni
        </p>
        <p className="m-0" style={{ fontSize: "14px" }}>
          {user.bio || "Nessuna informazione disponibile"}
        </p>
      </div>

      {/*seconda card*/}
      <div
        style={{
          width: "100%",
          border: "1px solid #d3d3d3",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "white",
          marginBottom: "20px",
        }}
      >
        <p className="m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          Attività
        </p>
        <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
          644 follower
        </p>
        <p className="m-0" style={{ fontSize: "14px" }}>
          {user.name} non ha ancora pubblicato nulla.
          <br />I post recenti che {user.name} condivide appariranno qui.
        </p>
        <hr style={{ border: "1px solid #e5e5e5", margin: "10px 0" }} />
        <p
          className="m-0"
          style={{
            fontSize: "17px",
            fontWeight: "bold",
            color: "#181817",
            textAlign: "center",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {" "}
          Mostra tutte le attività →
        </p>
      </div>
      {/*terza card*/}
      <div
        style={{
          width: "100%",
          border: "1px solid #d3d3d3",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "white",
          marginBottom: "10px",
        }}
      >
        <p className="m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          Esperienza
        </p>

        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <div key={index} className="w-100">
              <div className="d-flex align-items-center mt-3">
                <img
                  src={exp.image || "https://placehold.co/50x50"}
                  alt={exp.company}
                  style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                />
                <div style={{ marginLeft: "10px" }}>
                  <p className="m-0 fw-bold" style={{ fontSize: "14px" }}>
                    {exp.role}
                  </p>
                  <p
                    className="m-0 text-secondary"
                    style={{ fontSize: "12px" }}
                  >
                    {exp.company} · {exp.contractType || "N/A"}
                  </p>
                  <p
                    className="m-0 text-secondary"
                    style={{ fontSize: "12px" }}
                  >
                    {exp.startDate
                      ? `${new Date(exp.startDate).toLocaleDateString()} - ${
                          exp.endDate
                            ? new Date(exp.endDate).toLocaleDateString()
                            : "Presente"
                        }`
                      : "Data non disponibile"}
                  </p>
                  <p
                    className="m-0 text-secondary"
                    style={{ fontSize: "12px" }}
                  >
                    {exp.area || "Località non disponibile"}
                  </p>
                </div>
              </div>

              {index !== experiences.length - 1 && (
                <hr style={{ border: "1px solid #e5e5e5", margin: "10px 0" }} />
              )}
            </div>
          ))
        ) : (
          <p className="text-secondary mt-2">Nessuna esperienza disponibile</p>
        )}
      </div>

      {/*quarta card*/}
      <div
        style={{
          width: "100%",
          border: "1px solid #d3d3d3",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "white",
          marginTop: "10px",
        }}
      >
        <p className="m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          Formazione
        </p>
        <div className="d-flex" style={{ marginTop: "15px" }}>
          <img
            src="/uni.jpeg"
            alt="Logo università"
            style={{ width: "50px", height: "50px" }}
          />
          <div style={{ marginLeft: "10px" }}>
            <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
              Università degli Studi di Udine
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              Laurea Triennale in Scienze e Tecnologie Multimediali,
              Dipartimento di Scienze matematiche, informatiche e multimediali
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              2010 - 2013
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              Votazione: 108/110
            </p>
          </div>
        </div>
      </div>
      {/*quinta card*/}
      <div
        style={{
          width: "100%",
          border: "1px solid #d3d3d3",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "white",
          marginTop: "10px",
        }}
      >
        <p className="m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          Licenze e certificazioni
        </p>
        <div className="d-flex" style={{ marginTop: "15px" }}>
          <img
            src="/inglese.jpeg"
            alt="Logo Cambridge"
            style={{ width: "50px", height: "50px" }}
          />
          <div style={{ marginLeft: "10px" }}>
            <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
              Cambridge English Level 2 Certificate in ESOL International
              (First) - Grade A Level C1
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              Cambridge University Press & Assessment
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              Data di rilascio: lug 2014
            </p>
          </div>
        </div>
      </div>

      {/*sestacard*/}
      <div
        style={{
          width: "100%",
          border: "1px solid #d3d3d3",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "white",
          marginTop: "10px",
        }}
      >
        <p className="m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          Volontariato
        </p>

        <div className="d-flex" style={{ marginTop: "15px" }}>
          <img
            src="/volontario.jpeg"
            alt="Logo Core Maintainer"
            style={{ width: "50px", height: "50px" }}
          />
          <div style={{ marginLeft: "10px" }}>
            <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
              Core Maintainer
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              HospitalRun
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              ago 2019 - dic 2019 · 5 mesi
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              Scienza e tecnologia
            </p>
          </div>
        </div>

        <hr style={{ border: "1px solid #e5e5e5", margin: "10px 0" }} />

        <div className="d-flex" style={{ marginTop: "15px" }}>
          <img
            src="/donatori.png"
            alt="Logo Donatore di Sangue"
            style={{ width: "50px", height: "50px" }}
          />
          <div style={{ marginLeft: "10px" }}>
            <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
              Donatore di sangue
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              Advsg Fidas Gorizia
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              set 2013 - presente · 11 anni 5 mesi
            </p>
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              Salute
            </p>
          </div>
        </div>
      </div>

      {/*settima card*/}
      <div
        style={{
          width: "100%",
          border: "1px solid #d3d3d3",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "white",
          marginTop: "10px",
        }}
      >
        <p className="m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          Competenze
        </p>

        <div style={{ marginTop: "10px" }}>
          <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
            JavaScript
          </p>
          <div
            className="d-flex"
            style={{ marginTop: "5px", alignItems: "center" }}
          >
            <img
              src="/js.png"
              alt="Icona JavaScript"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",
                borderRadius: "50px",
              }}
            />
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              Competenze confermate da Maksim Sinik, che ha una grande
              competenza in questo ambito
            </p>
          </div>
          <div
            className="d-flex"
            style={{ marginTop: "5px", alignItems: "center" }}
          >
            <img
              src="/c.jpg"
              alt="Icona collegamento"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",
                borderRadius: "50px",
              }}
            />
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              Confermata da 3 colleghi presso Nuclecode S.R.L
            </p>
          </div>
          <div
            className="d-flex"
            style={{ marginTop: "5px", alignItems: "center" }}
          >
            <Icon.PeopleFill
              style={{ fontSize: "20px", color: "gray", marginRight: "10px" }}
            />
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              21 conferme
            </p>
          </div>
        </div>

        <hr style={{ border: "1px solid #e5e5e5", margin: "10px 0" }} />

        <div style={{ marginTop: "15px" }}>
          <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
            React.js
          </p>

          <div
            className="d-flex"
            style={{ marginTop: "5px", alignItems: "center" }}
          >
            <Icon.PeopleFill
              style={{ fontSize: "20px", color: "gray", marginRight: "10px" }}
            />
            <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
              11 conferme
            </p>
          </div>
        </div>

        <hr style={{ border: "1px solid #e5e5e5", margin: "10px 0" }} />

        <p
          className="m-0"
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#181818",
            textAlign: "center",
            padding: "10px 0",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Mostra tutte le competenze (17) →
        </p>
      </div>

      {/*settima card*/}
      <div
        style={{
          width: "100%",
          border: "1px solid #d3d3d3",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "white",
          marginTop: "10px",
        }}
      >
        <p className="m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          Lingue
        </p>

        <div style={{ marginTop: "15px" }}>
          <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
            Inglese
          </p>
          <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
            Conoscenza professionale
          </p>
        </div>

        <hr style={{ border: "1px solid #e5e5e5", margin: "10px 0" }} />

        <div>
          <p className="m-0" style={{ fontWeight: "bold", fontSize: "14px" }}>
            Italiano
          </p>
          <p className="m-0" style={{ fontSize: "12px", color: "gray" }}>
            Conoscenza madrelingua o bilingue
          </p>
        </div>
      </div>

      {/*undicesima card*/}
      <div
        style={{
          width: "100%",
          border: "1px solid #d3d3d3",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "white",
          marginTop: "10px",
        }}
      >
        <p className="m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
          Interessi
        </p>

        <div className="button-container">
          <button
            className={`custom-button ${
              selectedSection === "Aziende" ? "active" : ""
            }`}
            onClick={() => setSelectedSection("Aziende")}
          >
            Aziende
          </button>
          <button
            className={`custom-button ${
              selectedSection === "Gruppi" ? "active" : ""
            }`}
            onClick={() => setSelectedSection("Gruppi")}
          >
            Gruppi
          </button>
          <button
            className={`custom-button ${
              selectedSection === "Scuole" ? "active" : ""
            }`}
            onClick={() => setSelectedSection("Scuole")}
          >
            Scuole o università
          </button>
        </div>

        <hr style={{ border: "1px solid #e5e5e5", margin: "10px 0" }} />

        {selectedSection === "Aziende" && (
          <div className="interests-content d-flex flex-row align-items-start gap-4">
            <div className="interest-card d-flex align-items-center w-50">
              <img
                src="/tesla.png"
                alt="Icona collegamento"
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <div className="d-flex flex-column">
                <p className="fw-bold mb-0">Tesla</p>
                <p className="text-secondary mb-2">12.177.275 follower</p>
                <button className="styled-button">+ Segui</button>
              </div>
            </div>

            <div className="interest-card d-flex align-items-center w-50">
              <img
                src="/spacex.jpg"
                alt="Icona collegamento"
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <div className="d-flex flex-column">
                <p className="fw-bold mb-0">SpaceX</p>
                <p className="text-secondary mb-2">3.343.651 follower</p>
                <button className="styled-button">+ Segui</button>
              </div>
            </div>
          </div>
        )}

        {selectedSection === "Gruppi" && (
          <div className="interests-content d-flex flex-column align-items-start gap-3">
            <div className="interest-card d-flex align-items-center justify-content-between w-100">
              <div className="d-flex align-items-center gap-3">
                <img
                  src="/js.png"
                  alt="Icona collegamento"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <div className="d-flex flex-column">
                  <p className="fw-bold mb-0">JavaScript Community</p>
                  <p className="text-secondary mb-2">800.000 membri</p>
                  <button className="styled-button">Iscriviti</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedSection === "Scuole" && (
          <div className="interests-content d-flex flex-row align-items-start gap-4">
            <div className="interest-card d-flex align-items-center w-50">
              <img
                src="/epicode.png"
                alt="Icona collegamento"
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <div className="d-flex flex-column">
                <p className="fw-bold mb-0">Epicode</p>
                <p className="text-secondary mb-2">50.000 studenti</p>
                <button className="styled-button">+ Segui</button>
              </div>
            </div>

            <div className="interest-card d-flex align-items-center w-50">
              <img
                src="/uni.jpeg"
                alt="Icona collegamento"
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <div className="d-flex flex-column">
                <p className="fw-bold mb-0">Università degli Studi</p>
                <p className="text-secondary mb-2">150.000 studenti</p>
                <button className="styled-button">+ Segui</button>
              </div>
            </div>
          </div>
        )}

        <hr style={{ border: "1px solid #e5e5e5", margin: "10px 0" }} />

        <p
          className="text-center fw-bold mt-3"
          style={{
            cursor: "pointer",
            fontSize: "14px",
            color: "#181818",
          }}
        >
          Mostra tutte le aziende →
        </p>
      </div>
      <hr style={{ border: "1px solid #e5e5e5", margin: "15px 0" }} />
    </>
  );
};

export default SecondCentralSection;
