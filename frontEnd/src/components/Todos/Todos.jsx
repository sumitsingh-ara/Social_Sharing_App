import {Link,useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
export const Todos =() => {
    const location = useLocation();
    console.log(location.search.split("?")[1]);
    const {name} = useSelector((store) => store.users);
    return(
        <>
        <h1 className="h4 mt-0">Hello {name} to Share Karo </h1>
        <Link className="btn btn-primary m-2" to="/todosInput">Make a new Todo</Link>
        <Link className="btn btn-primary m-2" to="/todosList">View Todos</Link>
        </>
    )
}