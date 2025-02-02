/* eslint-disable react/prop-types */
import { Card, Image, Button, Form } from "react-bootstrap";
import { HandThumbsUp, ChatDots } from "react-bootstrap-icons";
//import send from "../assets/send.svg";
import * as Icon from "react-bootstrap-icons";
import { myID } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/action";
import { modifyPost } from "../redux/action";
import { useState } from "react";
//import { setPostPic } from "../redux/action";
import { Link } from "react-router-dom";
import SingleComment from "./SingleComment";

function SinglePost(props) {
  const [showModify, setShowModify] = useState(false);
  const [modifiedPost, setModifiedPost] = useState("");
  //const [postIdWithPicToChange, setPostIdWithPicToChange] = useState("");
  const [changingPic, setChangingPic] = useState(null);
  //const [okToModify, setOkToModify] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isPicRemoved, setIsPicRemoved] = useState(false);
  const [picAgain, setPicAgain] = useState(false);

  const dispatch = useDispatch();

  const comments = useSelector((state) => {
    return state.comments;
  });

  const handleDelete = function (postId) {
    dispatch(deletePost(postId));
  };

  const handleModify = function (postId, text) {
    if (!isPicRemoved) {
      if (changingPic) {
        const noImage = false;
        dispatch(modifyPost(postId, text, noImage, changingPic));
      } else {
        dispatch(modifyPost(postId, text));
      }
      //setOkToModify(true);
    } else {
      const noImage = true;
      dispatch(modifyPost(postId, text, noImage));
      setIsPicRemoved(false);
    }
  };

  const handleChangePostPic = function (e) {
    e.preventDefault();
    const changedPostPic = new FormData();
    changedPostPic.append("post", e.target.files[0]);
    setChangingPic(changedPostPic);
  };

  // useEffect(() => {
  //   if (okToModify && changingPic && postIdWithPicToChange) {
  //     dispatch(setPostPic(changingPic, postIdWithPicToChange));
  //     //setChangingPic(null);
  //     //setPostIdWithPicToChange("");
  //     setOkToModify(false);
  //   }
  // }, [okToModify]);

  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <Link to={`/user/${props.post.user._id}`}>
            <Image
              src={props.post.user.image}
              roundedCircle
              className="me-2"
              width="48"
              height="48"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <div>
            <h6 className="mb-0">
              <Link
                to={`/user/${props.post.user._id}`}
                className="text-decoration-none text-dark fw-bold"
              >
                {`${props.post.user.name} ${props.post.user.surname}`}
              </Link>
            </h6>
            <small className="text-muted">
              992.394 follower <br /> Post sponsorizzato
            </small>
          </div>
        </div>
        <Card.Title>{props.post.user.title}</Card.Title>
        {!showModify && <Card.Text>{props.post.text}</Card.Text>}

        {showModify && (
          <Form
            className="my-2"
            onSubmit={(e) => {
              e.preventDefault();
              setShowModify(false);
              handleModify(props.post._id, modifiedPost);
            }}
          >
            <Form.Group className="d-flex">
              {/* <img
                className="me-2"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                alt=""
                style={{ width: "10%", borderRadius: "50%" }}
              /> */}
              <Form.Control
                value={modifiedPost}
                onChange={(e) => {
                  setModifiedPost(e.target.value);
                }}
                type="text"
                placeholder="Modifica il post..."
                style={{ borderRadius: "25px", fontWeight: "600" }}
              />
            </Form.Group>
          </Form>
        )}
        {props.post.image && !isPicRemoved && !picAgain ? (
          <img src={props.post.image} style={{ maxWidth: "100%" }} />
        ) : (
          <></>
        )}
        {showModify && (
          <>
            <input
              className="ms-2"
              type="file"
              accept="image/*"
              onChange={(e) => {
                //setPostIdWithPicToChange(props.post._id);
                setIsPicRemoved(false);
                handleChangePostPic(e);
              }}
            />
            {props.post.image && (
              <p
                className={
                  isPicRemoved
                    ? "btn btn-warning text-white"
                    : "btn btn-danger text-white"
                }
                onClick={() => {
                  //setPostIdWithPicToChange(props.post._id);
                  setIsPicRemoved(true);
                  setPicAgain(true);
                }}
              >
                {!isPicRemoved ? "✖️ Rimuovi immagine" : "Immagine rimossa"}
              </p>
            )}
          </>
        )}
        <div className="d-flex justify-content-between">
          {!showModify ? (
            <>
              <Button
                id="btnPost"
                variant="light"
                className={`commentButton ${liked ? "active" : ""}`}
                onClick={() => setLiked(!liked)}
              >
                <HandThumbsUp /> Consiglia
              </Button>
              <Button
                id="btnPost"
                variant="light"
                className="commentButton"
                onClick={() => {
                  setShowComments(!showComments);
                }}
              >
                <ChatDots /> Commenti
                {comments.filter((comment) => {
                  return comment.elementId === props.post._id;
                }).length !== 0 ? (
                  <>
                    {" ("}
                    {
                      comments.filter((comment) => {
                        return comment.elementId === props.post._id;
                      }).length
                    }
                    {")"}
                  </>
                ) : (
                  ""
                )}
              </Button>
            </>
          ) : (
            <Button
              id="btnPost"
              onClick={() => {
                if (modifiedPost) {
                  setShowModify(false);
                  handleModify(props.post._id, modifiedPost);
                  setPicAgain(false);
                } else {
                  alert("Scrivi qualcosa.");
                }
              }}
              variant="light"
              className="commentButton text-success"
            >
              <Icon.Check style={{ fontSize: "28px" }} /> Aggiorna post
            </Button>
          )}

          {myID === props.post.user._id ? (
            <Button
              id="btnPost"
              onClick={() => {
                setModifiedPost(props.post.text);
                setShowModify(!showModify);
                setPicAgain(false);
                setShowComments(false);
                if (props.post.image) {
                  setIsPicRemoved(false);
                }
              }}
              variant="light"
              className="commentButton text-warning fw-bold"
            >
              <Icon.Pencil className="text-warning" />
              {showModify ? "Annulla..." : "Modifica"}
            </Button>
          ) : (
            <Button variant="light" className="commentButton" id="btnPost">
              <Icon.ArrowRepeat /> Diffondi post
            </Button>
          )}
          {myID === props.post.user._id ? (
            <Button
              id="btnPost"
              onClick={() => {
                handleDelete(props.post._id);
              }}
              variant="light"
              className="commentButton text-danger fw-bold"
            >
              {/* <img
              src={send}
              alt="Premium Icon"
              width="15"
              height="15"
              className="me-2"
            /> */}
              <Icon.X className="text-danger" style={{ fontSize: "28px" }} />
              Elimina
            </Button>
          ) : (
            <Button variant="light" className="commentButton" id="btnPost">
              {/* <img
              src={send}
              alt="Premium Icon"
              width="15"
              height="15"
              className="me-2"
            /> */}
              <Icon.Share className="me-1" />
              Condividi
            </Button>
          )}
        </div>
        {showComments && <SingleComment postId={props.post._id} />}
      </Card.Body>
    </Card>
  );
}

export default SinglePost;
