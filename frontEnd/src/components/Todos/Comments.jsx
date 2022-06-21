import "./Todo.css";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteComment,
  makeNestedNewCommentOnReply,
} from "../../Redux/Comments/action";
import { Link, useParams, useNavigate } from "react-router-dom";

export const Comments = ({ comment }) => {
  const navigate = useNavigate();
  const reply = useRef(null);
  const nestedReplies = useRef(null);
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { userName } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.auth);
  const [nestedcomment, setNestedComment] = useState("");
  const [nestedNestComment, setNestedNestComment] = useState("");
  const [replyBox, setReplyBox] = useState(false);
  const [editBox, setEditBox] = useState(false);
  const [nestedShow, setNestedShow] = useState(false);
  const [nestedReply, setNestedReply] = useState(false);
  const [nestedEdit, setNestedEdit] = useState(false);
  const handleDeleteComment = (commentId) => {
    const confirmBox = window.confirm("Do you really want delete comment ?");
    if (!confirmBox) return;
    dispatch(
      deleteComment({
        token: token,
        id: commentId,
        postId: postId,
      })
    );
  };
  const url =
    "https://media1.giphy.com/media/Oj5w7lOaR5ieNpuBhn/giphy.gif?cid=ecf05e47tnn5gp3m9bsqxf6zdnubk6e51c2o50ao8vpryyhz&rid=giphy.gif&ct=g";
  return (
    <>
      <div className="container mainCommentBox">
        <div className=" userCommentorDetails">
          <div>
            {" "}
            <img
              className="img-fluid img-responsive rounded-circle mr-2"
              src={url}
              width="38"
              alt="profile"
            />
          </div>
          <div>
            <Link to={`/user/${comment.user.username}`}>
              {comment.user.name}
            </Link>
          </div>
          <div>2 hours ago</div>
        </div>
        {/* comment view */}
        <div className="commentContainer mt-1">{comment.comment}</div>
        {/* options buttons */}
        <div className="commentOptioner">
          <div className="realOptionsComment reply px-2 ">
            {userName === comment.user.username ? (
              <small>
                <i
                  onClick={() => {
                    handleDeleteComment(comment._id);
                  }}
                  className="fa fa-solid fa-trash px-2"
                ></i>
              </small>
            ) : (
              ""
            )}

            <small>
              <i
                onClick={() => {
                  if (!token) return navigate("/login");
                  setEditBox(false);
                  setReplyBox(!replyBox);
                  setTimeout(() => {
                    reply.current.focus();
                  }, 50);
                }}
                className="fa fa-solid fa-reply px-2"
              ></i>
            </small>
            {userName === comment.user.username ? (
              <small>
                <i
                  onClick={() => {
                    if (!token) return navigate("/login");
                    setReplyBox(false);
                    setEditBox(!editBox);
                    setTimeout(() => {
                      reply.current.focus();
                    }, 50);
                  }}
                  className="fa fa-solid fa-pen px-2 border-r-4 rounded-circle"
                ></i>
              </small>
            ) : (
              ""
            )}
            <small>
              <i className="fa fa-light fa-thumbs-up hover-on-like px-2"></i>
            </small>
          </div>
          <div className="badge align-items-center nestedDisplayChecker">
            <span className="text-primary">
              Load ({comment.nestedcomments.length}) Replies{" "}
              {nestedShow ? "ON" : "OFF"}
            </span>
            <span className="form-check form-switch">
              <input
                disabled={comment.nestedcomments.length === 0}
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                onClick={() => {
                  setNestedShow(!nestedShow);
                }}
                defaultChecked={nestedShow}
              />
            </span>
          </div>
        </div>
        {/* reply or edit boxes */}
        {!editBox && !replyBox ? (
          ""
        ) : (
          <div className="input-group ">
            <input
              ref={reply}
              value={nestedcomment}
              placeholder="reply"
              onChange={(e) => {
                setNestedComment(e.target.value);
              }}
              type="text"
              className="form-control"
            />
            <div className="input-group-append">
              {replyBox ? (
                <button
                  onClick={() => {
                    dispatch(
                      makeNestedNewCommentOnReply({
                        id: userName,
                        token: token,
                        commentId: comment._id,
                        comment: nestedcomment,
                      })
                    );
                    setNestedComment("")
                  }}
                  className="btn btn-outline-secondary"
                  type="button"
                >
                  Reply
                </button>
              ) : (
                <button className="btn btn-outline-secondary" type="button">
                  Edit
                </button>
              )}
            </div>
          </div>
        )}
        <br />
        {/*--------------------------- nested comment component------------------------------------------------------------------------------------------------------------------------------------------------- nested comment component----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------- nested comment component----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------- */}
        {nestedShow
          ? comment.nestedcomments.map((nestedcomments) => (
              <div
                key={nestedcomments.uniqueId}
                className="container mainCommentBoxNested"
              >
                <div className=" userCommentorDetails">
                  <div>
                    {" "}
                    <img
                      className="img-fluid img-responsive rounded-circle mr-2"
                      src={url}
                      width="38"
                      alt="profile"
                    />
                  </div>
                  <div>
                    <Link to={`/user/${nestedcomments.user}`}>
                      {nestedcomments.user}
                    </Link>
                  </div>
                  <div>2 hours ago</div>
                </div>
                {/* comment view */}
                <div className="commentContainer mt-1">
                  {nestedcomments.comment}
                </div>
                {/* options buttons */}
                <div className="commentOptioner">
                  <div className="realOptionsComment reply px-2 ">
                    {userName === nestedcomments.user ? (
                      <small>
                        <i
                          onClick={() => {
                            handleDeleteComment(comment._id);
                          }}
                          className="fa fa-solid fa-trash px-2"
                        ></i>
                      </small>
                    ) : (
                      ""
                    )}

                    <small>
                      <i
                        onClick={() => {
                          if (!token) return navigate("/login");
                          setNestedEdit(false);
                          setNestedReply(!nestedReply);
                          setTimeout(() => {
                            nestedReplies.current.focus();
                          }, 50);
                        }}
                        className="fa fa-solid fa-reply px-2"
                      ></i>
                    </small>
                    {userName === nestedcomments.user ? (
                      <small>
                        <i
                          onClick={() => {
                            if (!token) return navigate("/login");
                            setNestedReply(false);
                            setNestedEdit(!nestedEdit);
                            setTimeout(() => {
                              nestedReplies.current.focus();
                            }, 50);
                          }}
                          className="fa fa-solid fa-pen px-2 border-r-4 rounded-circle"
                        ></i>
                      </small>
                    ) : (
                      ""
                    )}
                    <small>
                      <i className="fa fa-light fa-thumbs-up hover-on-like px-2"></i>
                    </small>
                  </div>
                </div>
                {/* reply or edit boxes */}
                {!nestedReply && !nestedEdit ? (
                  ""
                ) : (
                  <div className="input-group ">
                    <input
                      ref={nestedReplies}
                      value={nestedNestComment}
                      placeholder="reply"
                      onChange={(e) => {
                        setNestedNestComment(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                    />
                    <div className="input-group-append">
                      {nestedReply ? (
                        <button
                          onClick={() => {
                            dispatch(
                              makeNestedNewCommentOnReply({
                                id: userName,
                                token: token,
                                commentId: comment._id,
                                comment: nestedNestComment,
                              })
                            );
                            setNestedNestComment("")
                          }}
                          className="btn btn-outline-secondary"
                          type="button"
                        >
                          Reply
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          : ""}
      </div>
    </>
  );
};
