import { useState } from "react";
import { nanoid } from "nanoid";
import { postTodos } from "../../Redux/Todo/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Todo.css";
export const TodosInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((store) => store.todos);
  const [formData, setFormData] = useState({
    title: "",
    dated: new Date(),
    id: nanoid(4),
    description: "",
    relatedTo: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postTodos(formData));
    setFormData({
      title: "",
      status: false,
      priority: "",
      dated: new Date(),
      id: nanoid(4),
      description: "",
      subTopic: "",
    });
    setTimeout(() => {
      navigate("/todosList");
    }, 1000);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      <h1>Share your Knowledge</h1>
      {loading ? (
        <h1>Posting Data</h1>
      ) : error ? (
        <h1>Something went wrong</h1>
      ) : (
        <div className="container todoFormContainer">
          <form onSubmit={handleSubmit} className="row m-4 ">
            <input
              onChange={handleChange}
              id="title"
              type="text"
              value={formData.title}
              placeholder="Enter title here"
              required
              className="form-control col-sm mb-3"
            />
            <select
              value={formData.relatedTo}
              onChange={handleChange}
              id="relatedTo"
              className="custom-select form-control  col-sm mb-3"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="motivational">Motivational</option>
              <option value="cs">Computer Science</option>
              <option value="html">Jokes</option>
              <option value="html">HR Talks</option>
            </select>
            <select
              value={formData.subTopic}
              onChange={handleChange}
              id="subTopic"
              className="custom-select form-control  col-sm mb-3"
              required
              style={{
                display: formData.relatedTo === "cs" ? "block" : "none",
              }}
            >
              <option value="" disabled>
                Select Sub Category
              </option>
              <option value="html">Html</option>
              <option value="css">CSS</option>
              <option value="js">JavaScript</option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
            </select>

            <textarea
              required
              onChange={handleChange}
              id="description"
              value={formData.description}
              className="form-control mb-4"
              rows="8"
              cols={10}
              maxLength="2000"
              placeholder="Enter description here max 2000 characters...."
            ></textarea>
            <input type="submit" className="btn btn-success" value="Post data" />
          </form>
        </div>
      )}

      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn btn-danger"
      >
        Go back
      </button>
    </>
  );
};
