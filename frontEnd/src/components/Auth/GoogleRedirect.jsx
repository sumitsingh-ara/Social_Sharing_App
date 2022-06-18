
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export const GoogleRedirect = () => {
    const token = useParams();
    console.log(token);
return(
    <>
    <h1>Redirecting to Home Page, Please wait.....</h1>
    </>
)
}