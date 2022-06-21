import * as types from "./actionTypes";
import Axios from "axios";

const getSinglePostRequest = () => {
  return {
    type: types.GET_SINGLE_POST_REQUEST,
  };
};
const getSinglePostSuccess = (payload) => {
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
    `http://localhost:7448/social/post/singlePost/${payload.postId}`
  )
    .then((res) => {
      let status = false;
      res.data.post.likes.forEach((likers) => {
        if (likers.user === payload.id) {
          status = true;
          return;
        }
      });
      let payloads = {
        data: res.data.post,
        status: status,
      };
      dispatch(getSinglePostSuccess(payloads));
    })
    .catch(() => dispatch(getSinglePostFailure()));
};

//edit singlepost call
export const singlePostEdit = (payload) => (dispatch) => {
  dispatch(getSinglePostRequest());
  let data = JSON.stringify({
    editedData:payload.editedData,
  });

  let config = {
    method: "patch",
    url: `http://localhost:7448/social/post/singlePost/edit/${payload.postId}`,
    headers: {
      Authorization: "Bearer " + payload.token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return Axios(config)
    .then((res) =>{
        let payloads={
            id:payload.id,
            postId:payload.postId
        }
        dispatch(fetchSinglePost(payloads))
    })
    .catch((err) =>{dispatch(getSinglePostFailure())});
};

//like singlepost call
export const singlePostLike = (payload) => (dispatch) => {
    dispatch(getSinglePostRequest());
    let data = JSON.stringify({
      editedData:payload.editedData,
    });
  
    let config = {
      method: "patch",
      url: `http://localhost:7448/social/post/singlePost/like/${payload.postId}/${payload.id}`,
      headers: {
        Authorization: "Bearer " + payload.token,
        "Content-Type": "application/json",
      },
      data: data,
    };
  
    return Axios(config)
      .then((res) =>{
          let payloads={
              id:payload.id,
              postId:payload.postId
          }
          dispatch(fetchSinglePost(payloads))
      })
      .catch((err) =>{dispatch(getSinglePostFailure())});
  };

