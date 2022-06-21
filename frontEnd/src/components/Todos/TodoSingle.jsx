import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Comments } from "./Comments";
import { useSelector, useDispatch } from "react-redux";
import { getAllComments, makeNewComment } from "../../Redux/Comments/action";
import "./Todo.css";
export const TodoSingle = () => {
  const dispatch = useDispatch();
  const { isAuth, token } = useSelector((store) => store.auth);
  const { id } = useSelector((store) => store.users);
  const { loading, data, count } = useSelector((store) => store.comments);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [loadings, setLoading] = useState(true);
  const [postData, setPostData] = useState();
  const [commentDisplay, setCommentDisplay] = useState(true);
  const [nestedShow, setNestedShow] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [comment, setComment] = useState("");
  const [editPostDescription, setEditPostDescription] = useState("");
  const handlePostEdit = (e) => {
    setEditPostDescription(e.target.value);
  };
  useEffect(() => {
    setLoading(true);
    const getPost = async () => {
      try {
        let data = await fetch(
          `http://localhost:7448/social/post/singlePost/${postId}`
        );
        data = await data.json();
        // console.log(data);
        setPostData(data.post);
        setEditPostDescription(data.post.description);
        setLoading(false);
        dispatch(getAllComments(postId));
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [postId, dispatch]);
  //function to post the new comments;
  const postComment = () => {
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
  const postEditChanges = async () => {
    setLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${token}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        editedData: editPostDescription,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

     let data = await fetch(
        `http://localhost:7448/social/post/singlePost/edit/${postId}`,
        requestOptions
      )
       data = await data.json();
       setPostData(data);
       setLoading(false)
    } catch (err) {}
  };
  return (
    <>
      {loadings ? (
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
          {postData.user === id ? (
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
            <p className="m-1 h5 text-success">{postData.title}</p>
            {editPost ? (
              <textarea
                value={editPostDescription}
                onChange={handlePostEdit}
                className="form-control mb-4"
                rows="8"
                cols={10}
                maxLength="10000"
                placeholder="Enter description here max 10000 characters...."
              ></textarea>
            ) : (
              <p> {postData.description}</p>
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
