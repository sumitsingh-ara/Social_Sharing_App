import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchTodos, deletePost } from "../../Redux/Todo/action";
import {dateManager} from "../../utils/dateManager"
import "./Todo.css";
export const TodosLists = ({passerSearchParams}) => {
  const {page,setPage,sortBy,setSearchParams,filterBy,limit} =passerSearchParams
   const dispatch = useDispatch();
  const { loading, error, data, totalPosts } = useSelector(
    (store) => store.allPosts
  );
  const {id,userName,admin } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.auth);
  useEffect(() => {
    let params = {
      page:page,
      sortBy: sortBy,
      filterBy:filterBy,
      limit:limit,
    }
    
    setSearchParams(params, { replace: true });
    dispatch(fetchTodos({params,token}));
  }, [dispatch,limit,filterBy,page,setSearchParams,sortBy,id,token]);
  return (
    <>
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
            <div key={item._id} className="card text-center mt-2 mb-4">
              <div className="card-header text-center text-uppercase">
                {item.categories}
              </div>
              <div className="card-body ">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-truncate"style={{maxHeight:"4vh"}} dangerouslySetInnerHTML={{__html:item.description}} />
                <Link
                  to={`/todoSingle/${item._id}`}
                  className="btn btn-primary m-1"
                >
                  More Options
                </Link>
                {userName === item.user.username ||admin ? (
                  <button
                    to={`/todoSingle/${item._id}`}
                    className="btn btn-danger m-1"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Delete post confirmation"
                      );
                      if (!confirmBox) return;
                      dispatch(
                        deletePost({
                          id: item._id,
                          token: token,
                        })
                      );
                    }}
                  >
                    Delete Post
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="card-footer text-muted">
                Created at{" "}
                {dateManager(item.createdAt)} by{" "}
                <Link to={`/user/${item.user.username}`}>
                  {item.user.username === userName ? "You" : item.user.username}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="prevAndNext">
        <button
          disabled={page === 1}
          className="btn btn-primary mx-2"
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Prev Page
        </button>
        <button
          disabled={(page === Math.ceil(totalPosts /limit)) || totalPosts===0}
          className="btn btn-primary mx-2"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next Page
        </button>
      </div>
    </>
  );
};
