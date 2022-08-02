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
import {ContactAdmin} from "../Admin/ContactAdmin";
import {Search} from "../All/Search";
import {FriendsPending} from "../User/FriendsPending";
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
        <Route path="/allPosts" element={<PrivateComponents><TodosLists passerSearchParams={passerSearchParams}/></PrivateComponents>}></Route>
        <Route path="/todoSingle/:postId" element={<PrivateComponents><PostSingle /></PrivateComponents>}></Route>
        <Route path="/googleRedirect" element={<GoogleRedirect />}></Route>
        <Route
          path="/user/:ids"
          element={
            <PrivateComponents>
              <SingleUser />
            </PrivateComponents>
          }
        ></Route>
        <Route path="/friends" element={<FriendsPending/>}></Route>
      </Routes>
    </>
  );
};
