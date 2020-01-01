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
