import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Comments } from "./Comments";
import { useSelector, useDispatch } from "react-redux";
import {fetchSinglePost,singlePostEdit,singlePostLike,viewCounter,checkPostLikeOrNot,singlePostDislike} from "../../Redux/Post/action";
import { getAllComments, makeNewComment } from "../../Redux/Comments/action";
import "./Todo.css";
const Filter = require('bad-words');

export const PostSingle = () => {
  const filter = new Filter({ regex: /\*|\.|$/gi });
  const editRef = useRef(null);
  const dispatch = useDispatch();
  const { isAuth, token } = useSelector((store) => store.auth);
  const { id,userName } = useSelector((store) => store.users);
  const { loading, data, count } = useSelector((store) => store.comments);
  const {postloading,postData,likeStatus} = useSelector((store) => store.posts)
  const navigate = useNavigate();
  const { postId } = useParams();
  const [commentDisplay, setCommentDisplay] = useState(true);
  const [nestedShow, setNestedShow] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [comment, setComment] = useState("");
  const [editPostDescription, setEditPostDescription] = useState(null);
 
  useEffect(() => {
   dispatch(fetchSinglePost({
    postId: postId,
    id:id
   }))
   dispatch(getAllComments(postId));
   dispatch(checkPostLikeOrNot({
    postId: postId,
    token: token
   }))
   // eslint-disable-next-line
  }, []);

  //this useEffect will take place when a user will see the post atleast for 40 seconds;
  useEffect(() => {
   let timerId = setTimeout(() =>{
    dispatch(viewCounter(postId))
   },1000)
   //cleanup function so , if someone wants to just visist instead of reading the entire post,views will not be counted;
   return()=>{
    if(timerId)clearTimeout(timerId)
   }
    // eslint-disable-next-line
  }, []);
  //below useEfefct to handle the change for textarea to persist the pre existing description and then edit continues
  useEffect(() => {
    setEditPostDescription(postData.description);
     // eslint-disable-next-line
  },[postData.description,])
  const handlePostEdit = (e) => {
    setEditPostDescription(e.target.value);
  };
  //function to post the new comments;
  const postComment = () => {
    const x = filter.clean(comment);
    setComment(x);
    if(x.includes("*")) return alert("OOPS, bad-words are no more supported here!");
    if (!isAuth) {
      navigate("/login");
      return;
    }
    if (comment.trim() === "") return;

    let payload = {
      token,
      id,
      postId,
      comment,
    };
    dispatch(makeNewComment(payload));
    setComment("");
  };
  const postEditChanges = () => {
    const x = filter.clean(editPostDescription)
    setEditPostDescription(x);
    if(x.includes("*")) return alert("OOPS, bad-words are no more supported here!");
   let payload = {
    token: token,
    id:id,
    editedData:editPostDescription,
    postId:postId,
   }
   dispatch(singlePostEdit(payload));
    setEditPost(false);
  };

  const likePost = ()=> {
    let payload = {
      token: token,
      id:id,
      postId:postId,
     }
     dispatch(singlePostLike(payload));
  }
  const dislikePost = ()=> {
    let payload = {
      token: token,
      id:id,
      postId:postId,
     }
    dispatch(singlePostDislike(payload));
  }
  return (
    <>
      {postloading ? (
        <div className="spinner-grow mt-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="container mt-5">
          <span className="floatRight">
            <i
              className="fa fa-eye text-warning text-small mt-2"
              aria-hidden="true"
            ></i>
            {postData.views >= 1000
              ? `${(postData.views / 1000).toFixed(2)}K`
              : postData.views}
          </span>
          {isAuth ?likeStatus? <i onClick={dislikePost}
                className="fa fa-light fa-heart floatRight mx-1 text-success p-1"
                style={{ fontSize: "30px" }}
              ></i>:
              <i onClick={likePost}
                className="fa fa-thin fa-heart floatRight mx-1  p-1"
                style={{ fontSize: "30px" }}
              ></i>:""
           }
          {postData.user.username === userName ? (
            <span className="floatRight">
              {editPost ? (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    //  for editing the description of the post write logic here;
                    if (editPostDescription.trim().length <= 100)
                      return alert("Please write some more about the post");
                    postEditChanges();
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditPost(true);
                    setTimeout(() => {
                      editRef.current.focus();
                    }, 50);
                  }}
                >
                  Edit
                </button>
              )}
            </span>
          ) : (
            ""
          )}
          <h4
            className="text-success"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <span>Tech Gyaan on {postData.categories}</span>{" "}
          </h4>
          {/* -------------------------------------------Post Description here----------------------------------------- */}
          <div className="p-2 m-1 m-m-4 descriptionView">
            <p className="m-1 h5 text-success text-center">{postData.title}</p>
            {editPost ? (
              <textarea
                ref={editRef}
                value={editPostDescription}
                onChange={handlePostEdit}
                className="form-control mb-4"
                rows="8"
                cols={10}
                maxLength="10000"
                placeholder="Enter description here max 10000 characters...."
              ></textarea>
            ) : (
              <p dangerouslySetInnerHTML={{__html:postData.description}}/>
            )}
          </div>

          <div className="container mt-1 mb-1">
            <div className="d-flex justify-content-center row">
              <div className="d-flex flex-column col-md-8">
                <div className="coment-bottom bg-white p-2 px-4">
                  <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                    <img
                      className="img-fluid img-responsive rounded-circle mr-2"
                      src="https://i.imgur.com/qdiP4DB.jpg"
                      width="38"
                      alt="profile"
                    />
                    <input
                      type="text"
                      className="form-control mr-3"
                      placeholder="Add comment "
                      value={comment}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          postComment();
                        }
                      }}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                    <button
                      onClick={postComment}
                      className="btn btn-primary"
                      type="button"
                    >
                      Comment
                    </button>
                  </div>
                  {count > 0 ? (
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                      <h5>Comments({!loading ? count : "Fetching"})</h5>

                      <div className="buttons">
                        <span className="badge bg-white d-flex flex-row align-items-center">
                          <span className="text-primary">
                            Load Comments {commentDisplay ? "ON" : "OFF"}
                          </span>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                              onClick={() => {
                                setCommentDisplay(!commentDisplay);
                              }}
                              defaultChecked={commentDisplay}
                            />
                          </div>
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="spinner-grow mt-5" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : commentDisplay ? (
            data.map((comment) => (
              <Comments
                nestedShow={nestedShow}
                setNestedShow={setNestedShow}
                key={comment._id}
                comment={comment}
              />
            ))
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};
