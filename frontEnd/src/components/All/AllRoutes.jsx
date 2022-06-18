import {Routes,Route} from "react-router-dom";
import {Todos} from '../Todos/Todos';
import { TodoSingle } from "../Todos/TodoSingle";
import {TodosInput} from "../Todos/TodosInput";
import {TodosLists} from "../Todos/TodosLists";
import {Signup} from "../Auth/Signup";
import {Login} from "../Auth/Login";
import {ResetPassword} from "../Auth/ResetPassword";
export const AllRoutes = () =>{
    return(
        <>
        <Routes>
            <Route path='/' element={<Todos/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/resetPassword/:id/:token" element={<ResetPassword/>}></Route>
            <Route path='/todosInput' element={<TodosInput/>}></Route>
            <Route path='/todosList' element={<TodosLists/>}></Route>
            <Route path='/todoSingle/:id' element={<TodoSingle/>}></Route>

        </Routes>
        </>
    )
}