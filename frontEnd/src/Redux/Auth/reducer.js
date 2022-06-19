import * as types from "./actionTypes";

const initState = {
  isAuth: JSON.parse(localStorage.getItem("isAuth")) === true ? true : false,
  // isAuth:true,
  token: JSON.parse(localStorage.getItem("token")) || null,
  loading: false,
  error: false,
  message: null,
  available: null,
};

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.GOOGLE_LOGIN_SUCCESS:
      return{
        ...state,
        token:payload,
        isAuth: true,
        loading: false,
        error: false,
      }
    case types.RESET_PASSWORD_LOADING:
      return{
        ...state,
        loading:true,
        error: false,
        message: null,
      }
      case types.RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading:false,
          error: false,
          message: null,
        }
      case types.RESET_PASSWORD_FAILURE:
        return {
          ...state,
          loading:false,
          error: true,
          message: "Link Expired"
        }
    case types.RESET_AVAIALABLE_USERNAME:
      return {
        loading: false,
        error: false,
        available: "less chars",
      };

    case types.USERNAME_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        available: null,
      };
    case types.USERNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        available: payload,
      };
    case types.USERNAME_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        available: null,
      };
    case types.LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        isAuth: true,
        token: payload.token,
        loading: false,
        error: false,
        message: "Redirecting to home page",
      };
    case types.LOGIN_FAILURE:
      return {
        isAuth: false,
        loading: false,
        error: true,
        token: null,
        message: "Wrong Credentials",
      };
    case types.LOGOUT:
      return {
        isAuth: false,
        loading: false,
        token: null,
        error: false,
        message: null,
      };
    case types.REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: "Account creation in progress",
      };
    case types.REGISTER_SUCCESS:
      return {
        isAuth: true,
        token: payload.token,
        loading: false,
        error: false,
        message: payload.message,
      };
    case types.REGISTER_FAILURE:
      return {
        isAuth: false,
        token: null,
        loading: false,
        error: false,
        message: payload,
      };
    default:
      return state;
  }
};
