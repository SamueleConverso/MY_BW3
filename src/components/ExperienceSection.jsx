import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-bootstrap-icons";
import { getExpForPut } from "../redux/action";

const ExperienceSection = () => {
  const experience = useSelector((state) => {
    return state.experience;
  });
  const dispatch = useDispatch();

  return (
    <>
      <div className="p-3">
        <h5>Esperienza</h5>
        {experience.map((e) => {
          let startDate = new Date(e.startDate);
          let endDate = new Date(e.endDate);

          return (
            <div
              className="d-flex border-bottom border-1 mt-3 pb-2 justify-content-between"
              key={e._id}
            >
              <div className=" d-flex">
                <img
                  src={e.image ? e.image : "https://placecats.com/60/60"}
                  style={{
                    width: "60px",
                    height: "60px",
                  }}
                />
                <div className="ms-2">
                  <h6 className="m-0">{e.role}</h6>
                  <p className="m-0">{e.company}</p>
                  <p className="m-0 fw-lighter">
                    Da <span>{startDate.toLocaleDateString()}</span>
                    {e.endDate && (
                      <span> A {endDate.toLocaleDateString()}</span>
                    )}
                  </p>
                  <p className="m-0 fw-lighter">{e.area}</p>
                  <p className="m-0">{e.description}</p>
                </div>
              </div>
              <div style={{ width: "fit-content" }}>
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(getExpForPut(e._id));
                  }}
                >
                  <Icon.Pencil />
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    dispatch({
                      type: "SHOW_EXPERIENCE_DEL",
                      payload: { show: true, id: e._id },
                    });
                  }}
                >
                  <Icon.XLg />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExperienceSection;
