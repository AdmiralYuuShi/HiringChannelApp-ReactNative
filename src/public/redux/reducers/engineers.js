const initialState = {
  engineers: [],
  detailPage: {},
  isLoading: false,
  isError: false,
  search: '',
};

const engineers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ENGINEERS_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'FETCH_ENGINEERS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        detailPage: action.payload.data,
        engineers: [...action.payload.data.data],
      };
    case 'FETCH_ENGINEERS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'UPDATE_ENGINEERS_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'UPDATE_ENGINEERS_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
      };
    case 'UPDATE_ENGINEERS_REJECTED':
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case 'CREATE_ENGINEERS_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'CREATE_ENGINEERS_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
      };
    case 'CREATE_ENGINEERS_REJECTED':
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case 'DELETE_ENGINEERS_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'DELETE_ENGINEERS_FULFILLED':
      return {
        ...state,
        isError: false,
        isLoading: false,
      };
    case 'DELETE_ENGINEERS_REJECTED':
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default engineers;
