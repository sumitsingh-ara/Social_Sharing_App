import { Routes, Route } from "react-router-dom";
import { Todos } from "../Todos/Todos";
import { TodoSingle } from "../Todos/TodoSingle";
import { TodosInput } from "../Todos/TodosInput";
import { TodosLists } from "../Todos/TodosLists";
import { Signup } from "../Auth/Signup";
import { Login } from "../Auth/Login";
import { ResetPassword } from "../Auth/ResetPassword";
import { GoogleRedirect } from "../Auth/GoogleRedirect";
import { SingleUser } from "../User/SingleUser";
import { PrivateComponents } from "./PrivateComponents";
import {UserProfile} from "../User/UserProfile"
export const AllRoutes = ({passerSearchParams}) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Todos />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/resetPassword/:id/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/todosInput" element={<TodosInput />}></Route>
        <Route path="/allPosts" element={<TodosLists passerSearchParams={passerSearchParams}/>}></Route>
        <Route path="/todoSingle/:postId" element={<TodoSingle />}></Route>
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
