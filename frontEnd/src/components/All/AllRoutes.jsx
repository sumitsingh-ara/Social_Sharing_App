import { Routes, Route } from "react-router-dom";
import { Posts } from "../Posts/Posts";
import { PostSingle } from "../Posts/PostsSingle";
import { PostsInput } from "../Posts/PostsInput";
import { TodosLists } from "../Posts/AllPosts";
import { Signup } from "../Auth/Signup";
import { Login } from "../Auth/Login";
import { ResetPassword } from "../Auth/ResetPassword";
import { GoogleRedirect } from "../Auth/GoogleRedirect";
import { SingleUser } from "../User/SingleUser";
import { PrivateComponents } from "./PrivateComponents";
import {UserProfile} from "../User/UserProfile";
import {ContactAdmin} from "../Admin/ContactAdmin";
import {Search} from "../All/Search";
export const AllRoutes = ({passerSearchParams}) => {
  return (
    <>
      <Routes>
        <Route path="/search/:search" element={<Search passerSearchParams={passerSearchParams}/>}></Route>
        <Route path="/contactAdmin" element={<ContactAdmin/>}></Route>
        <Route path="/" element={<Posts />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/resetPassword/:id/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/todosInput" element={<PostsInput />}></Route>
        <Route path="/allPosts" element={<TodosLists passerSearchParams={passerSearchParams}/>}></Route>
        <Route path="/todoSingle/:postId" element={<PostSingle />}></Route>
        <Route path="/googleRedirect" element={<GoogleRedirect />}></Route>
        <Route
          path="/user/:id"
          element={
            <PrivateComponents>
              <SingleUser />
            </PrivateComponents>
          }
        ></Route>
         <Route
          path="/user/profile"
          element={
            <PrivateComponents>
              <UserProfile />
            </PrivateComponents>
          }
        ></Route>
      </Routes>
    </>
  );
};
