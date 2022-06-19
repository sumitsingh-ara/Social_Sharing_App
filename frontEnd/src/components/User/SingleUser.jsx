import {useParams} from "react-router-dom";

export const SingleUser = () => {
const {id} = useParams();

    return(
        <>
        heelo {id}
        </>
    )
}