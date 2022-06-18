import {Link,useLocation,Navigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {useEffect} from "react";
import {googleLoginSuccess} from "../../Redux/Auth/action"
export const Todos =() => {
    const dispatch = useDispatch();
    const location = useLocation();
    const token =location.search.split("?")[1];
    const {name} = useSelector((store) => store.users);

    useEffect(() => {
        if(token){
            console.log("token")
            dispatch(googleLoginSuccess(token));
        }
    }, [dispatch,token])
    
    return(
        <>
        <h1 className="h4 mt-0">Hello {name} to Share Karo </h1>
        <Link className="btn btn-primary m-2" to="/todosInput">Make a new Todo</Link>
        <Link className="btn btn-primary m-2" to="/todosList">View Todos</Link>
        </>
    )
}