import axios from 'axios';

const api = axios.create({baseURL: 'https://my-json-server.typicode.com/xfelipetavares/podcastr-next-ts/'});

export default api;
