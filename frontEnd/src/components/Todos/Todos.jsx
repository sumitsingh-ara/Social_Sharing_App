import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
export const Todos =() => {

    const {name} = useSelector((store) => store.users);
   

    // if(isAuth){
    //     return <Navigate replace to="/" />
    // }
    return(
        <>
        <h1 className="h4 mt-0">Hello {name} to Share Karo </h1>
        <Link className="btn btn-primary m-2" to="/todosInput">Make a new Todo</Link>
        <Link className="btn btn-primary m-2" to="/todosList">View Todos</Link>
        </>
    )
}