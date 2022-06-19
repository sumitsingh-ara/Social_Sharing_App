import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

        </div>
      )}
    </>
  );
};
