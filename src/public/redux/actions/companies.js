import axios from 'axios';

export const fetchCompanies = api => ({
  type: 'FETCH_COMPANIES',
  payload: axios.get(api),
});

export const updateCompany = (api, data, token, email, userid) => ({
  type: 'UPDATE_COMPANY',
  payload: axios.put(api, data, {
    headers: {Authorization: `Bearer ${token}`, email: email, userid: userid},
  }),
});

export const uploadPhoto = (api, formData, config) => ({
  type: 'UPDATE_COMPANY',
  payload: axios.put(api, formData, config),
});

export const createCompany = (api, data, token, email, userid) => ({
  type: 'CREATE_COMPANY',
  payload: axios.post(api, data, {
    headers: {Authorization: `Bearer ${token}`, email: email, userid: userid},
  }),
});

export const deleteCompany = (api, token, email, userid) => ({
  type: 'DELETE_COMPANY',
  payload: axios.delete(api, {
    headers: {Authorization: `Bearer ${token}`, email: email, userid: userid},
  }),
});
