import {useLocation,Navigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {useEffect} from "react";
import {googleLoginSuccess} from "../../Redux/Auth/action"
export const GoogleRedirect = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const token =location.search.split("?")[1];
    const {isAuth}= useSelector((store) => store.auth)
    useEffect(() => {
        if(token && !isAuth){
           // console.log("token andar use effect se")
            dispatch(googleLoginSuccess(token));
        }
    }, [dispatch,token,isAuth]);
    if(isAuth){
        return <Navigate to="/"></Navigate>;
    }
return(
    <>
    <h1>Redirecting to Home Page, Please wait.....</h1>
    </>
)
}