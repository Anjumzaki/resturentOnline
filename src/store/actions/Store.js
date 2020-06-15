
export const GET_STORE_DATA = "GET_STORE_DATA";
export const GET_STORE_DATA_LOADING = "GET_STORE_DATA_LOADING";
export const GET_STORE_DATA_ERROR = "GET_STORE_DATA_ERROR";

export const storeAsync = (store) => {
  return (dispatch, getState) => {
   
    dispatch(storeLoading(true))

   
      dispatch(storeFunction(store));
      dispatch(storeLoading(false))
    
  };
};



export const storeFunction = (payload) => { 
  return {
    type: GET_STORE_DATA,
    payload
  };
};

export const storeLoading = (payload) => {
  return {
    type: GET_STORE_DATA_LOADING,
    payload
  };
};

export const storeError = (payload) => {
  return {
    type: GET_STORE_DATA_ERROR,
    payload
  };
}; 


