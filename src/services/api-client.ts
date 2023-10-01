import axios, { AxiosError, CanceledError } from 'axios';

export default axios.create({
  baseURL: 'https://json-server-ear8.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { AxiosError, CanceledError };
