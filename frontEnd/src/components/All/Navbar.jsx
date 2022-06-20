import { Link,useNavigate } from "react-router-dom";
import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { serverLogout } from "../../Redux/Auth/action";
import {fetchUserDetails} from "../../Redux/User/action";
export const Navbar = () => {
  const { isAuth,token } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const {name} = useSelector((store) => store.users)
  const dispatch = useDispatch();
  useEffect(() => {
      if(isAuth) {
          dispatch(fetchUserDetails(token))
      }
  },[dispatch,isAuth,token]);
  return (
    <>
      {!isAuth ? (
         <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient" style={{justifyContent:"space-evenly",position:"fixed",top:0,left:0,right:0,zIndex:100}}>
          <Link className="navbar-brand btn btn-warning" to="/">Home</Link>
          <Link  className="navbar-brand  btn btn-success" to="/signup">Signup</Link>
         </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-light  bg-primary"  style={{position:"fixed",top:0,left:0,right:0,zIndex:100}}>
          <div className="container-fluid">
            <Link to="/" className="navbar-brand btn btn-light">
              Home
            </Link>
            <button
              className="navbar-toggler bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                  <Link
                    to="/todosList"
                    className="nav-link active text-light"
                    aria-current="page"
                  >
                    Feeds
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/todosInput" className="nav-link active text-light">
                    Create a new post
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to=""
                    className="nav-link dropdown-toggle text-light"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                   
                  >
                    {isAuth?name?name.split(" ")[0]:"":"My Profile"}
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="" className="dropdown-item " aria-disabled="true">
                      My followers
                    </Link>
                    <li>
                      <Link to="" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <button onClick={()=>{
                      navigate('/login',{replace:true})
                      dispatch(serverLogout())
                    }}className="dropdown-item">
                      {isAuth ? "Logout" : "Login"}
                    </button>
                  </ul>
                </li>
              </ul>
              <div className="d-flex" style={{display: "none"}}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
