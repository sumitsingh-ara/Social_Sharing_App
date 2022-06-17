import {Routes,Route} from "react-router-dom";
import {Todos} from './Todos';
import { TodoSingle } from "./TodoSingle";
import {TodosInput} from "./TodosInput";
import {TodosLists} from "./TodosLists";
export const TodosRoutes = () =>{
    return(
        <>
        <Routes>
            <Route path='/' element={<Todos/>}></Route>
            <Route path='/todosInput' element={<TodosInput/>}></Route>
            <Route path='/todosList' element={<TodosLists/>}></Route>
            <Route path='/todoSingle/:id' element={<TodoSingle/>}></Route>
        </Routes>
        </>
    )
}