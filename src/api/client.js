import { create } from 'apisauce';
import { baseURL } from './baseURL'

const client = create( {
  baseURL,
  timeout: 120000
} );

export default client;
