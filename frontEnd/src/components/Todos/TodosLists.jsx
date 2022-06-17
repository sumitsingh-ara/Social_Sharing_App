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
              <div className="card text-center mb-4">
                <div className="card-header text-center text-uppercase">{item.title}</div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <Link
                    to={`/todoSingle/${item.id}`}
                    className="btn btn-primary"
                  >
                    More Options
                  </Link>
                </div>
                <div className="card-footer text-muted">2 days ago</div>
              </div>
            
          ))}
        </div>
      )}
    </>
  );
};
