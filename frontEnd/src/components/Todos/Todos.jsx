import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
export const Todos =() => {
    const dispatch = useDispatch();
    const {isAuth} = useSelector((store) => store.auth);

    useEffect(() => {
        if(isAuth) {
            // dispatch(getUserDetails())
        }
    },[])
    return(
        <>
        <h1>Todos Main Page</h1>
        <Link className="btn btn-primary m-2" to="/todosInput">Make a new Todo</Link>
        <Link className="btn btn-primary m-2" to="/todosList">View Todos</Link>
        </>
    )
}