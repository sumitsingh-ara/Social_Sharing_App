import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePost } from "../../Redux/Todo/action";
import { dateManager } from "../../utils/dateManager";
import axios from "axios";
export const Search = ({ passerSearchParams }) => {
  const navigate = useNavigate();
  const { search } = useParams();
  const { page, setPage, limit, setSearchParams, setSearch } =
    passerSearchParams;
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { userName, admin } = useSelector((store) => store.users);
  const { token } = useSelector((store) => store.auth);
  useEffect(() => {
    setError(false);
    setLoading(true);
    let params = {
      page: 1,
      limit: limit,
      search: search,
    };
    setSearchParams(params, { replace: true });
    const getSearchResults = () => {
      axios
        .get("http://localhost:7448/social/post/allPosts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            ...params,
          },
        })
        .then((res) => {
          setData(res.data.posts);
          setTotalPosts(res.data.postTotalCount);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };
    getSearchResults();
  }, [dispatch, limit, page, search, setSearchParams, setSearch, token]);

  return (
    <>
      <h1>
        {data ? "Your Search results are here" : "Sorry,no matchings found"}
      </h1>
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
        <h1>No posts available for your specified topic</h1>
      ) : (
        <div className="container-fluid text-center m-auto" id="todoList">
          {data.map((item) => (
            <div key={item._id} className="card text-center mb-4">
              <div className="card-header text-center text-uppercase">
                {item.categories}
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p
                  className="card-text text-truncate"
                  style={{ maxHeight: "5vh" }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <Link
                  to={`/todoSingle/${item._id}`}
                  className="btn btn-primary m-1"
                >
                  More Options
                </Link>
                {userName === item.user.username || admin ? (
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

                      navigate(-1);
                    }}
                  >
                    Delete Post
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="card-footer text-muted">
                Created on {dateManager(item.createdAt)} by{" "}
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
          disabled={page === Math.ceil(totalPosts / limit) || totalPosts === 0}
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
