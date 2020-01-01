import axios from 'axios';

export const fetchUser = (api, data) => ({
  type: 'FETCH_USER',
  payload: axios.post(api, data),
});

export const createUser = (api, data) => ({
  type: 'CREATE_USER',
  payload: axios.post(api, data),
});

export const logout = (api, data) => ({
  type: 'LOGOUT_USER',
});
