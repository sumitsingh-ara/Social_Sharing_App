import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
export const Posts =() => {
    const {name,admin} = useSelector((store) => store.users);
    return(
        <>
        <h1 className="h4 mt-0">{admin?"Namaskar Malik,sb moh maya hai":`Hello ${name} to Sharekaro.com`}</h1>
        <Link className="btn btn-primary m-2" to="/todosInput">Create a new post</Link>
        <Link className="btn btn-primary m-2" to="/allPosts">View All Posts</Link>
        </>
    )
}