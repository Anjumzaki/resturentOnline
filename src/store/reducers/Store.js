import {
    GET_STORE_DATA,
    GET_STORE_DATA_LOADING,
    GET_STORE_DATA_ERROR,
  } from "../actions";
  
  const storeData = {
    storeData: "",
    storeLoading: false,
    storeError: "",
  };
  
  export default (state = storeData, action) => {
    switch (action.type) { 
      case GET_STORE_DATA:
        return {
          ...state,
          storeData: action.payload
        }; 
      case GET_STORE_DATA_LOADING:
        return {
          ...state,
          storeLoading: action.payload
        };
      case GET_STORE_DATA_ERROR:
        return {
          ...state,
          storeError: action.payload
        };
      default:
        return state;
    }
  };
  