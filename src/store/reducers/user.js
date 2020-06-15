import {
    GET_USER_DATA,
    GET_USER_DATA_LOADING,
    GET_USER_DATA_ERROR,
  } from "../actions";
  
  const userData = {
    user: {},
    userLoading: false,
    userError: "",
  };
  
  export default (state = userData, action) => {
    switch (action.type) { 
      case GET_USER_DATA:
        return {
          ...state,
          user: action.payload
        };
      case GET_USER_DATA_LOADING:
        return {
          ...state,
          userLoading: action.payload
        };
      case GET_USER_DATA_ERROR:
        return {
          ...state,
          userError: action.payload
        };
      default:
        return state;
    }
  };
  