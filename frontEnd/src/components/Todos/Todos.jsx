import {Link} from "react-router-dom";
export const Todos =() => {
    return(
        <>
        <h1>Todos Main Page</h1>
        <Link className="btn btn-primary m-2" to="/todosInput">Make a new Todo</Link>
        <Link className="btn btn-primary m-2" to="/todosList">View Todos</Link>
        </>
    )
}