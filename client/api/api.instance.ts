import axios from 'axios';
import { getContentType } from './api.helper';

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    ...getContentType(),
  },
});
