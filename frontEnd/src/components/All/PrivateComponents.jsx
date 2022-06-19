import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
export const PrivateComponents = ({children}) => {
    const {isAuth} = useSelector((store) => store.auth);

    if(!isAuth) return <Navigate to={"/login"} replace={false}/>

    return children;
}