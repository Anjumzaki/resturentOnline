export const GET_USER_DATA = "GET_USER_DATA";
export const GET_USER_DATA_LOADING = "GET_USER_DATA_LOADING";
export const GET_USER_DATA_ERROR = "GET_USER_DATA_ERROR";

export const userAsync = (userData) => {
  return (dispatch, getState) => {
    dispatch(userLoading(true));
    dispatch(user(userData));
    dispatch(userLoading(false));
  };
};

export const user = (payload) => {
  return {
    type: GET_USER_DATA,
    payload,
  };
};

export const userLoading = (payload) => {
  return {
    type: GET_USER_DATA_LOADING,
    payload,
  };
};

export const userError = (payload) => {
  return {
    type: GET_USER_DATA_ERROR,
    payload,
  };
};
