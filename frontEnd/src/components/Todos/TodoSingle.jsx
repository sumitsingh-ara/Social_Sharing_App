import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Comments } from "./Comments";
import {useSelector} from "react-redux";
import "./Todo.css";
export const TodoSingle = () => {
    const {isAuth} = useSelector((store) => store.auth);
    const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [commentLoader, setCommentLoader] = useState(false);
  const [postData, setPostData] = useState();
  const [allComments, setAllComments] = useState({
    count: 0,
    data: [],
  });
  const [comment, setComment] = useState("");
  useEffect(() => {
    setLoading(true);
    const getPost = async () => {
      try {
        let data = await fetch(
          `http://localhost:7448/social/post/singlePost/${id}`
        );
        data = await data.json();
        setPostData(data.post);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [id]);

  //another use efeect to load the comments
  useEffect(() => {
    setCommentLoader(true);
    const getComments = async () => {
      try {
        let data = await fetch(
          `http://localhost:7448/social/comment/allcomments/${id}`
        );
        data = await data.json();
        setAllComments({
          count: data.count,
          data: data.comments,
        });
       
        setCommentLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    if(!loading)getComments();
  }, [comment,loading, id]);

  //function to post the new comments;
  const postComment = async () => {
    if(!isAuth){
       navigate('/login')
        return;
    }
    if (comment.trim() === "") return;
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {loading ? (
        <div className="spinner-grow mt-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="container mt-5">
          <h4 className="text-success">Tech Gyaan on {postData.categories}</h4>
          <div className="border p-2 m-1 m-m-4 descriptionView">
            <p className="m-1 h5 text-success">{postData.title}</p>
            <p> {postData.description}</p>
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
                      placeholder="Add comment"
                      value={comment}
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
                  <div className="headings d-flex justify-content-between align-items-center mb-3">
                    <h5>Comments({!commentLoader?allComments.count:"Fetching"})</h5>

                    <div className="buttons">
                      <span className="badge bg-white d-flex flex-row align-items-center">
                        <span className="text-primary">Comments "ON"</span>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                          />
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {commentLoader ? (
            <div className="spinner-grow mt-5" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            allComments.data.map((comment) => (
              <Comments key={comment._id} comment={comment} />
            ))
          )}
        </div>
      )}
    </>
  );
};
