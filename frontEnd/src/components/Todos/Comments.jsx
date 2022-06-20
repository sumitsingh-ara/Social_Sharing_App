import "./Todo.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteComment,
  makeNestedNewCommentOnReply,
} from "../../Redux/Comments/action";
import { Link, useParams } from "react-router-dom";
import { NestedComments } from "./NestedComments";
export const Comments = ({ comment }) => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { userName } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.auth);
  const [nestedcomment, setNestedComment] = useState("");
  const [replyBox, setReplyBox] = useState(false);
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
              src="https://i.imgur.com/qdiP4DB.jpg"
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
        <div className="commentContainer mt-1">
          daajakllsljlsdljdjddldaajadljdjddldaajakllsljlsdljdjddldaaja
        </div>
        {/* options buttons */}
        <div className="commentOptioner">
          <div className="realOptionsComment reply px-2 ">
            {userName === comment.user.username ? (
              <small
                onClick={() => {
                  handleDeleteComment(comment._id);
                }}
              >
                <i class="fa fa-solid fa-trash px-2"></i>
              </small>
            ) : (
              ""
            )}

            <small
              onClick={() => {
                dispatch(
                  makeNestedNewCommentOnReply({
                    id: userName,
                    token: token,
                    commentId: comment._id,
                    comment: nestedcomment,
                  })
                );
              }}
            >
              Reply
            </small>
            <span className="dots"></span>
            {userName === comment.user.username ? <small>Edit</small> : ""}
          </div>

          <div className="badge align-items-center nestedDisplayChecker">
            <span className="text-primary">
              Load Replies {true ? "ON" : "OFF"}
            </span>
            <span className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                onClick={() => {}}
                defaultChecked={true}
              />
            </span>
          </div>
        </div>
        {/* reply or edit boxes */};
        <div class="input-group ">
          <input
            value={nestedcomment}
            placeholder="reply"
            onChange={(e) => {
              setNestedComment(e.target.value);
            }}
            type="text"
            class="form-control"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">
              Button
            </button>
          </div>
        </div>
      </div>
      {/* Separate */}
      {/* <div className="container mt-1">
        <div className="row  d-flex justify-content-center">
          <div className="col-md-8">
            <div className="card p-3 border">
              <div className="d-flex justify-content-between  borders">
                <div className="  user d-flex flex-row align-items-center mobileViewCommentNamer">
                  <div className="userNameAndTime">
                    <p className="font-weight-bold text-primary userNameComment">
                      <Link to={`/user/${comment.user.username}`}>
                        {comment.user.username}
                      </Link>
                    </p>{" "}
                    <p>
                      <small className="text-center">2 days ago</small>
                    </p>
                  </div>
                  <p>
                    <small className="font-weight-bold">
                      {comment.comment}
                    </small>
                  </p>
                </div>
              </div>

              <div className="action d-flex justify-content-between mt-2 align-items-center">
                <div className="reply px-4">
                  {userName === comment.user.username ? (
                    <small
                      onClick={() => {
                        handleDeleteComment(comment._id);
                      }}
                    >
                      Delete
                    </small>
                  ) : (
                    ""
                  )}
                  <span className="dots"></span>
                  <small
                    onClick={() => {
                      dispatch(
                        makeNestedNewCommentOnReply({
                          id: userName,
                          token: token,
                          commentId: comment._id,
                          comment: nestedcomment,
                        })
                      );
                    }}
                  >
                    Reply
                  </small>
                  <span className="dots"></span>
                  {userName === comment.user.username ? (
                    <small>Edit</small>
                  ) : (
                    ""
                  )}
                </div>
                <div className="icons align-items-center">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-light fa-thumbs-up text-secondary hover-on-like"></i>
                </div>
              </div>
              <NestedComments />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
