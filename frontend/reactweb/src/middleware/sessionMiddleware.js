const sessionMiddleware = (storeAPI) => (next) => (action) => {
    // const state = storeAPI.getState();
    // console.log("action.type : ", action.type);
  
    if (action.type === 'auth/logout') {
      console.log("Auth logged out.");
    }

    if (action.type === 'product/fetchAll/fulfilled') {
      // console.log("[product/fetchAll] total product : ", action.payload.length);
    }

    if (action.type === 'auth/fetchToken/fulfilled') {
      if(action.payload.access_token) {
        console.log("[auth/fetchToken] success to get a new token!");
      }
    }

  return next(action);
};

export default sessionMiddleware;
