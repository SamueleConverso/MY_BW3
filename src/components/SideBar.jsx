import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const SideBar = () => {
  const [profiles, setProfiles] = useState([]);
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          "https://striveschool-api.herokuapp.com/api/profile",
          {
            headers: {
              Authorization:
                "Bearer " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk3NTA4OTE2ZjYzNTAwMTVmZWNiODQiLCJpYXQiOjE3Mzc5Njk4MDEsImV4cCI6MTczOTE3OTQwMX0.gV22i7NwH_DHYfKE81N9UEY1Up6WHrH2EPIoPu8OD9w",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const shuffledProfiles = [...data].sort(() => Math.random() - 0.5);

          // 5 profili random per 3 diverse sezioni
          setProfiles(shuffledProfiles.slice(0, 5));
          setSuggestedProfiles(shuffledProfiles.slice(5, 10));
          setPeopleYouMayKnow(shuffledProfiles.slice(10, 15));
        } else {
          throw new Error("Errore nel recupero dei profili");
        }
      } catch (error) {
        console.error("ERRORE FETCH:", error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <Container className="mt-3 my-3 ">
      <div className="d-flex flex-column align-items-center">
        <img
          src="/banner.png"
          style={{ width: "320px" }}
          alt="placeholder"
          className="rounded-3 border-1 border"
        />

        <div
          className="p-4 pb-1 mt-1 bg-white rounded-3 border border-1 d-flex flex-column align-items-center"
          style={{ minWidth: "320px", maxWidth: "320px" }}
        >
          <h4 className="fs-6 m-0 text-start w-100 fw-bold">
            Altri profili per te
          </h4>

          {profiles.map((profile) => (
            <div
              key={profile._id}
              className="d-flex align-items-center border-bottom border-1 py-3 w-100"
            >
              <Link
                to={`/user/${profile._id}`}
                className="text-decoration-none"
              >
                <img
                  src={profile.image || "https://placecats.com/700/700"}
                  alt="Profile pic"
                  className="rounded-circle"
                  width="50"
                  height="50"
                />
              </Link>

              <div className="ms-2">
                <h6 className="m-0">
                  <Link
                    to={`/user/${profile._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {profile.name} {profile.surname}
                  </Link>
                  <span className="fw-lighter"> · 3°+</span>
                </h6>
                <p className="mb-2">{profile.title}</p>

                <button
                  type="button"
                  className="btn d-flex align-items-center justify-content-center rounded-pill border border-1 px-3 py-1 fw-medium"
                  style={{ color: "#404040", borderColor: "#404040" }}
                >
                  <Icon.PersonFillAdd className="me-2" />
                  Collegati
                </button>
              </div>
            </div>
          ))}

          <h6 className="text-center mt-3">Mostra tutto</h6>
        </div>

        <div
          className="p-4 pb-1 mt-1 bg-white rounded-3 border border-1 d-flex flex-column align-items-center"
          style={{ minWidth: "320px", maxWidth: "320px" }}
        >
          <h4 className="fs-6 m-0 text-start w-100 fw-bold">
            Esplora i profili Premium
          </h4>
          {suggestedProfiles.map((profile) => (
            <div
              key={profile._id}
              className="d-flex align-items-center border-bottom border-1 py-3 w-100"
            >
              <Link
                to={`/user/${profile._id}`}
                className="text-decoration-none"
              >
                <img
                  src={profile.image || "https://placecats.com/700/700"}
                  alt="Profile pic"
                  className="rounded-circle"
                  width="50"
                  height="50"
                />
              </Link>
              <div className="ms-2">
                <h6 className="m-0">
                  <Link
                    to={`/user/${profile._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {profile.name} {profile.surname}
                  </Link>
                </h6>
                <p className="mb-2">{profile.title}</p>

                <button
                  type="button"
                  className="btn rounded-pill d-flex align-items-center justify-content-center border border-1 border-secondary text-secondary px-3 py-1 fw-medium"
                >
                  <Icon.Plus className="me-1" />
                  Segui
                </button>
              </div>
            </div>
          ))}

          <h6 className="text-center mt-3">Mostra tutto</h6>
        </div>

        <div
          className="p-4 pb-1 mt-1 bg-white rounded-3 border border-1 d-flex flex-column align-items-center"
          style={{ minWidth: "320px", maxWidth: "320px" }}
        >
          <h4 className="fs-6 m-0 text-start w-100 fw-bold">
            Persone che potresti conoscere
          </h4>
          {peopleYouMayKnow.map((profile) => (
            <div
              key={profile._id}
              className="d-flex align-items-center border-bottom border-1 py-3 w-100"
            >
              <Link
                to={`/user/${profile._id}`}
                className="text-decoration-none"
              >
                <img
                  src={profile.image || "https://placecats.com/700/700"}
                  alt="Profile pic"
                  className="rounded-circle"
                  width="50"
                  height="50"
                />
              </Link>
              <div className="ms-2">
                <h6 className="m-0">
                  <Link
                    to={`/user/${profile._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {profile.name} {profile.surname}
                  </Link>
                </h6>
                <p className="mb-2">{profile.title}</p>

                <button
                  type="button"
                  className="btn rounded-pill d-flex align-items-center justify-content-center border border-1 border-secondary text-secondary px-3 py-1 fw-medium"
                >
                  <Icon.PersonFillAdd className="me-2" />
                  Collegati
                </button>
              </div>
            </div>
          ))}

          <h6 className="text-center mt-3">Mostra tutto</h6>
        </div>

        <img
          src="/banner.png"
          style={{ width: "320px", marginTop: "10px" }}
          alt="placeholder"
          className="rounded-3 border-1 border"
        />
      </div>
    </Container>
  );
};

export default SideBar;
