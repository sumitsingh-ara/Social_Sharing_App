import {Link,Navigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {logout} from "../../Redux/Auth/action";
export const Navbar = () => {
  const {isAuth}= useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const nav =[
    {id:4,title:isAuth?"Logout":"Login",to:"/login",method:function(){
        if(isAuth){
            dispatch(logout())
        }
        if(!isAuth) <Navigate to={"/login"}/>
    }},
]
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand">Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/todosList" className="nav-link active" aria-current="page">Feeds</Link>
        </li>
        <li className="nav-item">
          <Link to="/todosInput" className="nav-link active">Create a new post</Link>
        </li>
        <li className="nav-item dropdown">
          <Link to="" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link to="" className="dropdown-item">Action</Link></li>
            <li><Link to="" className="dropdown-item">Another action</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link to="" className="dropdown-item">Something else here</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="" className="nav-link disabled" tabIndex="-1" aria-disabled="true">Disabled</Link>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    )
}