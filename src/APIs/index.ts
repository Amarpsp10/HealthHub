import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
});

export default Api;
