const initialState = {
  userId: '',
  username: '',
  email: '',
  token: '',
  role: '',
  isLogin: false,
  isError: false,
  isLoading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'FETCH_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogin: true,
        token: action.payload.data.token,
        userId: action.payload.data.user.userId,
        username: action.payload.data.user.username,
        email: action.payload.data.user.email,
        role: action.payload.data.user.role,
      };
    case 'FETCH_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'CREATE_USER_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'CREATE_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case 'CREATE_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogin: false,
        token: '',
        userId: '',
        username: '',
        email: '',
      };
    default:
      return state;
  }
};

export default auth;
