/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postComment } from "../redux/action";
import * as Icon from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { deleteComment } from "../redux/action";
import { putComment } from "../redux/action";

function SingleComment(props) {
  const postId = props.postId;
  const dispatch = useDispatch();

  const [writtenComment, setWrittenComment] = useState("");
  const [rateStars, setRateStars] = useState(0);
  const [modifyCommentId, setModifyCommentId] = useState(null);
  const [modifyingComment, setModifyingComment] = useState("");
  const [modifyingRateStars, setModifyingRateStars] = useState(0);

  const handlePublishComment = function () {
    if (rateStars > 0) {
      setWrittenComment("");
      setRateStars(0);
      dispatch(postComment(writtenComment, rateStars, postId));
    } else {
      alert("Valuta il post.");
    }
  };

  const handleDeleteComment = function (commentId) {
    dispatch(deleteComment(commentId));
  };

  const handleModifyComment = function () {
    if (modifyingRateStars > 0) {
      setModifyCommentId(null);
      setModifyingComment("");
      setModifyingRateStars(0);
      dispatch(
        putComment(
          modifyingComment,
          modifyingRateStars,
          postId,
          modifyCommentId
        )
      );
    } else {
      alert("Valuta il post.");
    }
  };

  const comments = useSelector((state) => {
    return state.comments;
  });

  const authorComment = useSelector((state) => {
    return state.authorComment || "samu.converso@gmail.com";
  });
  const hasCommentsLoaded = useSelector((state) => {
    return state.hasCommentsLoaded;
  });

  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body
          style={{
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (writtenComment) {
                handlePublishComment();
              } else {
                alert("Scrivi qualcosa.");
              }
            }}
          >
            <Form.Group className="d-flex align-items-center">
              <img
                className="me-3"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                alt=""
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Form.Control
                value={writtenComment}
                onChange={(e) => {
                  setWrittenComment(e.target.value);
                }}
                type="text"
                placeholder="Commenta..."
                style={{
                  borderRadius: "20px",
                  fontWeight: "500",
                  padding: "10px 15px",
                  border: "1px solid #ddd",
                }}
              />
            </Form.Group>
            <Form.Select
              className="my-3"
              value={rateStars}
              onChange={(e) => {
                setRateStars(parseInt(e.target.value));
              }}
              style={{
                borderRadius: "20px",
                padding: "10px 15px",
                border: "1px solid #ddd",
                fontWeight: "500",
              }}
            >
              <option value="0">Valuta il post</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Select>
          </Form>
          <Button
            className="mb-3 w-100"
            onClick={(e) => {
              e.preventDefault();
              if (writtenComment) {
                handlePublishComment();
              } else {
                alert("Scrivi qualcosa.");
              }
            }}
            style={{
              borderRadius: "20px",
              padding: "10px 15px",
              backgroundColor: "#0a66c2",
              border: "none",
              fontWeight: "600",
            }}
          >
            Pubblica commento
          </Button>
          <hr className="mt-0" />
          <Card.Title
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            Commenti
          </Card.Title>
          {hasCommentsLoaded ? (
            <div>
              {comments
                .filter((comment) => {
                  return comment.elementId === postId;
                })
                .reverse()
                .slice(0, 25)
                .map((comment) => {
                  return (
                    <div
                      key={comment._id}
                      style={{
                        width: "100%",
                        backgroundColor: "#f9f9f9",
                        marginTop: "10px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "10px",
                        padding: "12px",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                            alt=""
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              marginRight: "10px",
                            }}
                          />
                          <Card.Text
                            className="fw-bold mb-0"
                            style={{ fontSize: "14px", color: "#333" }}
                          >
                            {comment.author}
                          </Card.Text>
                        </div>
                        {authorComment === comment.author && (
                          <div className="d-flex align-self-center gap-2">
                            {modifyCommentId === comment._id && (
                              <Icon.Check
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (modifyingComment) {
                                    handleModifyComment();
                                  } else {
                                    alert("Scrivi qualcosa.");
                                  }
                                }}
                                className="align-self-center text-success"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                              />
                            )}
                            <Icon.Pencil
                              onClick={(e) => {
                                e.preventDefault();
                                setModifyCommentId(
                                  modifyCommentId === comment._id
                                    ? null
                                    : comment._id
                                );
                                setModifyingComment(comment.comment);
                                if (comment.rate) {
                                  setModifyingRateStars(comment.rate);
                                }
                              }}
                              className="align-self-center text-warning"
                              style={{ cursor: "pointer", fontSize: "16px" }}
                            />
                            <Icon.Trash
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteComment(comment._id);
                              }}
                              className="align-self-center text-danger"
                              style={{ cursor: "pointer", fontSize: "16px" }}
                            />
                          </div>
                        )}
                      </div>

                      <hr className="m-0 my-2" />
                      {comment.rate &&
                        modifyCommentId !== comment._id &&
                        [...Array(comment.rate)].map((_, i) => (
                          <Icon.StarFill
                            key={i}
                            className="text-warning"
                            style={{ marginRight: "2px" }}
                          />
                        ))}
                      {modifyCommentId !== comment._id && (
                        <Card.Text
                          style={{
                            fontSize: "14px",
                            color: "#555",
                            marginTop: "8px",
                          }}
                        >
                          {comment.comment}
                        </Card.Text>
                      )}
                      {modifyCommentId === comment._id && comment.rate && (
                        <Form.Select
                          className="my-3"
                          value={modifyingRateStars}
                          onChange={(e) => {
                            setModifyingRateStars(parseInt(e.target.value));
                          }}
                          style={{
                            borderRadius: "20px",
                            padding: "10px 15px",
                            border: "1px solid #ddd",
                            fontWeight: "500",
                          }}
                        >
                          <option value="0">Valuta il post</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Form.Select>
                      )}
                      {modifyCommentId === comment._id && (
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (modifyingComment) {
                              handleModifyComment();
                            } else {
                              alert("Scrivi qualcosa.");
                            }
                          }}
                        >
                          <Form.Control
                            value={modifyingComment}
                            onChange={(e) => {
                              setModifyingComment(e.target.value);
                            }}
                            type="text"
                            placeholder="Commenta..."
                            style={{
                              borderRadius: "20px",
                              fontWeight: "500",
                              padding: "10px 15px",
                              border: "1px solid #ddd",
                            }}
                          />
                        </Form>
                      )}
                    </div>
                  );
                })}
            </div>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default SingleComment;
