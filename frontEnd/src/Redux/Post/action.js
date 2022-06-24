import * as types from "./actionTypes";
import Axios from "axios";

const getSinglePostRequest = () => {
  return {
    type: types.GET_SINGLE_POST_REQUEST,
  };
};

const getSinglePostSuccess = (payload) => {
  // console.log(payload,"Yhn check krle bhai");

  return {
    type: types.GET_SINGLE_POST_SUCCESS,
    payload: payload,
  };
};
const getSinglePostFailure = () => {
  return {
    type: types.GET_SINGLE_POST_FAILURE,
  };
};
//fetch call to get data of single post;

export const fetchSinglePost = (payload) => (dispatch) => {
  dispatch(getSinglePostRequest());
  return Axios.get(
    `https://socialsharekaro.herokuapp.com/social/post/singlePost/${payload.postId}`
  )
    .then((res) => {
      let payloads = {
        data: res.data.post,
        status: false,
        id: payload.id,
      };

      dispatch(getSinglePostSuccess(payloads));
    })
    .catch(() => dispatch(getSinglePostFailure()));
};
//edit singlepost call
export const singlePostEdit = (payload) => (dispatch) => {
  dispatch(getSinglePostRequest());
  let data = JSON.stringify({
    editedData: payload.editedData,
  });

  let config = {
    method: "patch",
    url: `https://socialsharekaro.herokuapp.com/social/post/singlePost/edit/${payload.postId}`,
    headers: {
      Authorization: "Bearer " + payload.token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return Axios(config)
    .then((res) => {
      let payloads = {
        id: payload.id,
        postId: payload.postId,
      };
      dispatch(fetchSinglePost(payloads));
    })
    .catch((err) => {
      dispatch(getSinglePostFailure());
    });
};

//like singlepost call
//post likes acts as a middleware , first we will check post is already liked by user  or not then dispatch the main call to set data;
const setPostLikes = (payload) => {
  return {
    type: types.SINGLE_POST_LIKER,
    payload: payload,
  };
};
export const checkPostLikeOrNot = (payload) => (dispatch) => {
  let config = {
    method: "get",
    url: `https://socialsharekaro.herokuapp.com/social/post/singlePost/likedOrNot/${payload.postId}`,
    headers: {
      Authorization: "Bearer " + payload.token,
      "Content-Type": "application/json",
    },
  };

  return Axios(config)
    .then((res) => {
      if (res.data.status) dispatch(setPostLikes(true));
      else dispatch(setPostLikes(false));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const singlePostLike = (payload) => (dispatch) => {

  let config = {
    method: "patch",
    url: `https://socialsharekaro.herokuapp.com/social/post/singlePost/like/${payload.postId}/${payload.id}`,
    headers: {
      Authorization: "Bearer " + payload.token,
      "Content-Type": "application/json",
    },
  };

  return Axios(config)
    .then((res) => {
      let payloads = {
        postId: payload.postId,
        token: payload.token,
      };
      dispatch(checkPostLikeOrNot(payloads));
    })
    .catch((err) => {
      dispatch(getSinglePostFailure());
    });
};
//dislike the liked post
export const singlePostDislike = (payload) => (dispatch) => {

  let config = {
    method: "patch",
    url: `https://socialsharekaro.herokuapp.com/social/post/singlePost/dislike/${payload.postId}/${payload.id}`,
    headers: {
      Authorization: "Bearer " + payload.token,
      "Content-Type": "application/json",
    },
  };

  return Axios(config)
    .then((res) => {
      let payloads = {
        postId: payload.postId,
        token: payload.token,
      };
      dispatch(checkPostLikeOrNot(payloads));
    })
    .catch((err) => {
      dispatch(getSinglePostFailure());
    });
};
//view count api call
export const viewCounter = (payload) => (dispatch) => {
  let config = {
    method: "patch",
    url: `https://socialsharekaro.herokuapp.com/social/post/singlePost/viewedTimes/${payload}`,
  };

  return Axios(config);
};
