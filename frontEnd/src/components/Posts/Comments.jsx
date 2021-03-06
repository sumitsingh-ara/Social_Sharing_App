import "./Todo.css";
import { useState, useRef } from "react";
import {dateManager} from '../../utils/dateManager'
import { useSelector, useDispatch } from "react-redux";
import {
  deleteComment,
  makeNestedNewCommentOnReply,
  editComment
} from "../../Redux/Comments/action";
import {NestedCommentView} from "./NestedCommentView";
import { Link, useParams, useNavigate } from "react-router-dom";
import {NestedComments} from "./NestedComments";
const Filter = require('bad-words');
export const Comments = ({ comment }) => {
  const [nestedShow, setNestedShow] = useState(false);
  const filter = new Filter({ regex: /\*|\.|$/gi });
  const navigate = useNavigate();
  const reply = useRef(null);
 
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { userName,admin,id } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.auth);
  const [nestedcomment, setNestedComment] = useState("");
  
  const [replyBox, setReplyBox] = useState(false);
  const [editBox, setEditBox] = useState(false);
 
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
    "https://c.tenor.com/ueth-WpGsukAAAAd/mee6-wii-chicken.gif";
  return (
    <>
      <div className="container mainCommentBox">
        <div className=" userCommentorDetails">
          <div>
            {" "}
            <img
              className="img-fluid img-responsive rounded-circle mr-2"
              src={comment.user.profilePic.image?comment.user.profilePic.image:url}
              width="40"
              alt="profile"
            />
          </div>
          <div className="commentSizeEnhancer">
          Commented by&nbsp;
            <Link to={`/user/${comment.user.username}`}>
            {userName === comment.user.username?"you":comment.user.username}
            </Link>
          </div>
          <div className="commentSizeEnhancer">{dateManager(comment.createdAt)}</div>
        </div>
        {/* comment view */}
        <div className="commentContainer mt-1 text-center">{comment.comment}</div>
        {/* options buttons */}
        <div className="commentOptioner">
          {/* here options for comment */}
          <div className="realOptionsComment reply px-2 ">
            {userName === comment.user.username || admin? (
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
          {/* see replies or not from here */}
          <div>
         <NestedCommentView comment={comment} nestedShow={nestedShow} setNestedShow={setNestedShow}/>
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
                    const x = filter.clean(nestedcomment);
                    setNestedComment(x);
                    if(x.includes("*")) return alert("OOPS, bad-words are no more supported here!");
                    dispatch(
                      makeNestedNewCommentOnReply({
                        id: userName,
                        token: token,
                        commentId: comment._id,
                        comment: nestedcomment,
                        postId: postId,
                        realuser:id
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
                <button onClick={()=>{
                  const x = filter.clean(nestedcomment);
                  setNestedComment(x);
                  if(x.includes("*")) return alert("OOPS, bad-words are no more supported here!");
                  if(!nestedcomment.trim()) return;
                  dispatch(editComment({
                    token:token,
                    commentId:comment._id,
                    comment:nestedcomment,
                    postId: postId
                  }))
                  setNestedComment("")
                }} className="btn btn-outline-secondary" type="button">
                  Edit
                </button>
              )}
            </div>
          </div>
        )}
        <br />
        {/*--------------------------- nested comment component------------------------------------------------------------------------------------------------------------------------------------------------- nested comment component----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------- nested comment component----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------- */}
        {nestedShow
          ? comment.nestedcomments.map((replies) => (
             <NestedComments comment={comment} {...handleDeleteComment} key={replies.uniqueId} replies={replies} />
            ))
          : ""}
      </div>
    </>
  );
};
