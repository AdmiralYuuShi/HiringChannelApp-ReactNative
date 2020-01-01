const initialState = {
  companies: [],
  isLoading: false,
  isError: false,
};

const companies = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COMPANIES_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'FETCH_COMPANIES_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        companies: [...action.payload.data.data],
      };
    case 'FETCH_COMPANIES_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'CREATE_COMPANIES_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'CREATE_COMPANIES_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case 'CREATE_COMPANIES_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'UPDATE_COMPANIES_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'UPDATE_COMPANIES_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case 'UPDATE_COMPANIES_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'DELETE_COMPANIES_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case 'DELETE_COMPANIES_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case 'DELETE_COMPANIES_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default companies;
