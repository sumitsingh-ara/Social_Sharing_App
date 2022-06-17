import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchUserDetails} from "../../Redux/User/action"
export const Todos =() => {
    const dispatch = useDispatch();
    const {isAuth,token} = useSelector((store) => store.auth);

    useEffect(() => {
        if(isAuth) {
            dispatch(fetchUserDetails(token))
        }
    },[dispatch,isAuth,token]);
    return(
        <>
        <h1>Todos Main Page</h1>
        <Link className="btn btn-primary m-2" to="/todosInput">Make a new Todo</Link>
        <Link className="btn btn-primary m-2" to="/todosList">View Todos</Link>
        <button onClick={() =>{
            dispatch(fetchUserDetails(token))
        }}>
            sdjdsjmfsd
        </button>
        </>
    )
}