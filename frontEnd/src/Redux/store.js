import {
  legacy_createStore as createStore,
  compose,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { todosReducer } from "./Todo/reducer";
import {authReducer} from "./Auth/reducer";
import {usersReducer} from './User/reducer'
const rootReducer = combineReducers({
    todos:todosReducer,
    auth:authReducer,
    users:usersReducer
})

export const store = createStore(
    rootReducer,
  compose(
    applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
//,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
