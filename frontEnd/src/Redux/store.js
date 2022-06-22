import {
  legacy_createStore as createStore,
  compose,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { allPostsReducer } from "./Todo/reducer";
import {authReducer} from "./Auth/reducer";
import {usersReducer} from './User/reducer';
import {commentReducer} from './Comments/reducer';
import {postReducer} from './Post/reducer';
const rootReducer = combineReducers({
  allPosts:allPostsReducer,
    auth:authReducer,
    users:usersReducer,
    comments:commentReducer,
    posts:postReducer,
})

export const store = createStore(
    rootReducer,
  compose(
    applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
//,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
