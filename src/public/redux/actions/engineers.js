import axios from 'axios';

export const fetchEngineers = api => ({
  type: 'FETCH_ENGINEERS',
  payload: axios.get(api),
});

export const updateEngineer = (api, data, token, email, userid) => ({
  type: 'UPDATE_ENGINEERS',
  payload: axios.put(api, data, {
    headers: {Authorization: `Bearer ${token}`, email: email, userid: userid},
  }),
});

export const uploadPhoto = (api, formData, config) => ({
  type: 'UPDATE_ENGINEERS',
  payload: axios.put(api, formData, config),
});

export const deleteEngineer = (api, token, email, userid) => ({
  type: 'DELETE_ENGINEERS',
  payload: axios.delete(api, {
    headers: {Authorization: `Bearer ${token}`, email: email, userid: userid},
  }),
});

export const createEngineer = (api, data, token, email, userid) => ({
  type: 'CREATE_ENGINEERS',
  payload: axios.post(api, data, {
    headers: {Authorization: `Bearer ${token}`, email: email, userid: userid},
  }),
});

export const searchEngineers = search => ({
  type: 'SEARCH_ENGINEERS',
  payload: search,
});
