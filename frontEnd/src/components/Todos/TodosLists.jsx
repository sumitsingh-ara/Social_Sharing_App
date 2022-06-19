import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchTodos } from "../../Redux/Todo/action";
import "./Todo.css";
export const TodosLists = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  const { loading, error, data } = useSelector((store) => store.todos);
  const {userName} = useSelector((store) => store.users);
  return (
    <>
      <h1>Welcome to todo lists</h1>
      {loading ? (
        <>
          <div className="spinner-grow text-primary" role="status"></div>
          <div className="spinner-grow text-secondary" role="status"></div>
          <div className="spinner-grow text-success" role="status"></div>
          <div className="spinner-grow text-danger" role="status"></div>
          <div className="spinner-grow text-warning" role="status"></div>
          <div className="spinner-grow text-info" role="status"></div>
          <div className="spinner-grow text-dark" role="status"></div>
        </>
      ) : error ? (
        <h1>Error...</h1>
      ) : (
        <div className="container-fluid text-center m-auto" id="todoList">
          {data.map((item) => (
              <div key={item._id} className="card text-center mb-4">
                <div className="card-header text-center text-uppercase">{item.categories}</div>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text  text-truncate">
                    {item.description}
                  </p>
                  <Link
                    to={`/todoSingle/${item._id}`}
                    className="btn btn-primary m-1"
                  >
                    More Options
                  </Link>
                  {userName===item.user.username?<button
                    to={`/todoSingle/${item._id}`}
                    className="btn btn-danger m-1"
                  >
                   Delete Post
                  </button>:""}
                </div>
                <div className="card-footer text-muted">Created on {item.createdAt.split("T")[0].split("-").sort().join("-")} by <Link to={`/user/${item.user.username}`}>{item.user.name.split(" ")[0]}</Link></div>
              </div>
            
          ))}
        </div>
      )}
    </>
  );
};
