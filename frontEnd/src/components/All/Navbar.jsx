import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { serverLogout } from "../../Redux/Auth/action";
import { fetchUserDetails } from "../../Redux/User/action";
export const Navbar = ({ passerSearchParams }) => {
  const [flag,setFlag] = useState(true)
  const { setSortBy, setFilterBy, setLimit, search, setSearch } =
    passerSearchParams;
  const { isAuth, token } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { name, userName } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(fetchUserDetails(token));
    }
  }, [isAuth, token, dispatch]);
  const reset = () => {
    setSortBy("");
    setFilterBy("");
    setLimit(6);
    navigate("/allPosts");
  };

  const searchCall = () => {
    if (search.trim() <= 3)
      return alert("Please give some more hint atleast 3 chars");
    navigate(`search/${search}`);
    setSearch("");
  };
  const closeNavbar = () => {
    setFlag(!flag)
  }
  return (
    <>
      {!isAuth ? (
        <nav
          className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient"
          style={{
            justifyContent: "space-evenly",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        >
          <Link className="navbar-brand btn btn-warning" to="/">
            Home
          </Link>
          <Link className="navbar-brand  btn btn-success" to="/signup">
            Signup
          </Link>
        </nav>
      ) : (
        <nav
          className="navbar navbar-expand-lg navbar-light  bg-primary px-2"
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
        >
            <Link onClick={()=>{
              setFlag(true);
            }} to="/" className="navbar-brand btn btn-light">
              Home
            </Link>
            <button
              className="navbar-toggler bg-light"
              type="button"
              onClick={closeNavbar}
              data-bs-target="#navbarSupportedContent"
              aria-controls=""
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`navbar-collapse ${flag?"collapse":""}`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                <li className="nav-item" onClick={closeNavbar}>
                  <Link
                    to="/allPosts"
                    className="nav-link active text-light"
                    aria-current="page"
                    
                  >
                    Feeds
                  </Link>
                </li>
                <li className="nav-item" onClick={closeNavbar}>
                  <Link to="/todosInput" className="nav-link active text-light">
                    Create a new post
                  </Link>
                </li>
                <li className="nav-item dropdown" >
                  <Link
                    to=""
                    className="nav-link dropdown-toggle text-light"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    
                  >
                    {isAuth ? (name ? name.split(" ")[0] : "") : "My Profile"}
                  </Link>
                  <ul onClick={closeNavbar}
                    className="dropdown-menu text-center text-light"
                    style={{background:"#9999ff"}}
                    aria-labelledby="navbarDropdown"
                  >
                    {/* kkdkdkd----------------------------dddddddddddddddd */}
                    <li >
                      <Link to="/contactAdmin" style={{color:"white"}}  className="dropdown-item ">
                        Contact Admin
                      </Link>
                    </li>
                    <li>
                      <Link to={`/user/${userName}`} style={{color:"white"}}  className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <button
                      onClick={() => {
                        reset();
                        navigate("/login", { replace: true });
                        dispatch(serverLogout());
                      }}
                      className="dropdown-item text-light"
                    >
                      {isAuth ? "Logout" : "Login"}
                    </button>
                  </ul>
                </li>
              </ul>
              {/* Created the middle things for extra things like sort filter etc */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle text-light m-0"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Sort By
                  </p>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <p 
                      role="button"
                      onClick={() => {
                        setSortBy("mostRecents");
                        closeNavbar()
                      }}
                      className="dropdown-item m-0 "
                      aria-disabled="true"
                    >
                      Recent Posts
                    </p>
                    <li>
                      <p
                        role="button"
                        onClick={() => {
                          setSortBy("mostViewedPosts");
                          closeNavbar()
                        }}
                        className="dropdown-item m-0"
                      >
                        Most Viewed Posts
                      </p>
                    </li>
                    <li></li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setSortBy("mostLikedPosts");
                        closeNavbar()
                      }}
                    >
                      Most liked posts
                    </button>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle text-light m-0"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Filter By
                  </p>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <p
                        role="button"
                        onClick={() => {
                          setFilterBy("jobs");
                          closeNavbar()
                        }}
                        className="dropdown-item m-0"
                      >
                        Jobs
                      </p>
                    </li>
                    <li>
                      <p
                        role="button"
                        onClick={() => {
                          setFilterBy("techInfo");
                          closeNavbar()
                        }}
                        className="dropdown-item m-0 "
                        aria-disabled="true"
                      >
                        Tech Info
                      </p>
                    </li>
                    <li>
                      <p
                        role="button"
                        onClick={() => {
                          setFilterBy("jokes");
                          closeNavbar()
                        }}
                        className="dropdown-item m-0"
                      >
                        Jokes
                      </p>
                    </li>

                    <li></li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setFilterBy("motivational");
                        closeNavbar()
                      }}
                    >
                      Motivational
                    </button>
                  </ul>
                </li>
                <li className="nav-item text-center border m-auto">
                  <button
                    className="nav-link btn-outline-danger border-0 px-4"
                    onClick={() => {
                      reset();
                      closeNavbar()
                    }}
                  >
                    Reset
                  </button>
                </li>
              </ul>
              <div className="d-flex" style={{ display: "none" }}>
                <input
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="form-control me-2"
                  type="search"
                  value={search}
                  placeholder="Search"
                  aria-label="Search"
                />
                <button onClick={()=>{
                  searchCall()
                  closeNavbar()
                  }} className="btn btn-success">
                  Search
                </button>
              </div>
            </div>
         
        </nav>
      )}
    </>
  );
};
