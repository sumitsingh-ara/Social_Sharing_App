import { useState } from "react";
import { postTodos } from "../../Redux/Todo/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Navigate} from "react-router-dom";
import "./Todo.css";
const Filter = require('bad-words');
export const PostsInput = () => {
  const filter = new Filter({ regex: /\*|\.|$/gi });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error,isAuth } = useSelector((store) => store.auth);
  const {id}= useSelector((store) => store.users)
  const [formData, setFormData] = useState({
    title:"",
   description:"",
   categories:"",
   subCategory:""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // filter.addWords('sala',"Bastard","Son of a Bitch");
    const x =filter.clean(formData.description)
    const y =filter.clean(formData.title)
    setFormData({
      ...formData,
      title:y,
      description: x
    })
    if(x.includes("*")||y.includes("*")) return alert("OOPS, bad-words are no more supported here!");
    e.preventDefault();
    if(formData.categories !== "Computer Science"){
      setFormData({
        ...formData,
        subCategory:""
      })
    }
    if(formData.description.trim().length <=2) return alert("Please write some more about the post")
    dispatch(postTodos({...formData,user:id}));
    setFormData({
      title:"",
      description:"",
      categories:"",
      subCategory:""
    });
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };
  const handleChange = (e) => {
    
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  
  };

  if(!isAuth) {
    return <Navigate to="/login"></Navigate>;
  }
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
              value={formData.categories}
              onChange={handleChange}
              id="categories"
              className="custom-select form-control  col-sm mb-3"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Jobs">Jobs</option>
              <option value="Motivational">Motivational</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Jokes">Jokes</option>
            </select>
            <select
              value={formData.subCategory}
              onChange={handleChange}
              id="subCategory"
              className="custom-select form-control  col-sm mb-3"
              style={{
                display: formData.categories === "Computer Science" ? "block" : "none",
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
              maxLength="10000"
              placeholder="Enter description here max 10000 characters...."
            ></textarea>
            <input type="submit" className="btn btn-success" value="Post Data" />
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
