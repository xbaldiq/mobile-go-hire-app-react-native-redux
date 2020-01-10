const initialState = {
    registerState: {},
    isPending: false,
    isRejected: false,
    isFulfilled: false,
  };
  
  const registerAccount = (prevState = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_ACCOUNT_PENDING':
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'REGISTER_ACCOUNT_REJECTED':
        return {
          ...prevState,
          isPending: false,
          isRejected: true,
        };
      case 'REGISTER_ACCOUNT_FULFILLED':
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          registerState: action.payload.data.data,
        };
      default:
        return prevState;
    }
  };
  
  export default registerAccount;
  