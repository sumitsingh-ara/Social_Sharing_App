import * as types from "./actionTypes";

const initState = {
  postloading: true,
  posterror: false,
  postData: [],
  likeStatus: false,
};

export const postReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.GET_SINGLE_POST_REQUEST:
      return {
        ...state,
        postloading: true,
        posterror: false,
      };
    case types.GET_SINGLE_POST_SUCCESS:
      return {
        postloading: false,
        posterror: false,
        likeStatus: payload.status,
        postData: payload.data,
      };
    case types.GET_SINGLE_POST_FAILURE:
      return {
        ...state,
        postloading: false,
        posterror: false,
      };
    default:
      return state;
  }
};
