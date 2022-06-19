import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Comments} from "./Comments";
import "./Todo.css";
export const TodoSingle = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState();

  useEffect(() => {
    setLoading(true);
    const getPost = async () => {
      try {
        let data = await fetch(
          `http://localhost:7448/social/post/singlePost/${id}`
        );
        data = await data.json();
        console.log(data);
        setPostData(data.post);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [id]);
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
            <p>
              {" "}
             {postData.description}
            </p>
          </div>
          <div class="container mt-1 mb-1">
          <div class="d-flex justify-content-center row">
            <div class="d-flex flex-column col-md-8">
              <div class="coment-bottom bg-white p-2 px-4">
                <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                  <img
                    class="img-fluid img-responsive rounded-circle mr-2"
                    src="https://i.imgur.com/qdiP4DB.jpg"
                    width="38"
                    alt="profile"
                  />
                  <input
                    type="text"
                    class="form-control mr-3"
                    placeholder="Add comment"
                    // value={""}
                    onChange={(e)=>{
                       // setComment(e.target.value)
                    }}
                  />
                  <button  class="btn btn-primary" type="button">
                    Comment
                  </button>
                </div>
               
              </div>
            </div>
          </div>
        </div>
          <Comments/>
        </div>
      )}
    </>
  );
};
