import {Link} from "react-router-dom";
export const Navbar = () => {
  const nav =[
    {id:1,title:"Home",to:"/"},
    {id:2,title:"Feeds",to:"/todosList"},
    {id:3,title:"Create New Post",to:"/todosInput"},
    // {id:4,title:isAuth?"Logout":"Login",to:"/login",method:function(){
    //     // if(isAuth){
    //     //     setIsAuth(false);
    //     //     setToken(null);
    //     // }
    //     // if(!isAuth) <Navigate to={"/login"}/>
    // }},
]
    return(
      <div className="container-fluid border p-4">
        {nav.map((e)=>(
        <Link className="btn btn-primary" onClick={e.method?e.method:""} style={{margin:"10px"}} key={e.id} to={e.to}>{e.title}</Link>
    ))}
      </div>
    )
}