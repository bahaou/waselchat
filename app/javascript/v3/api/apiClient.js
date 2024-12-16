import axios from 'axios';

const { apiHost = '' } = window.waselchatConfig || {};
const wootAPI = axios.create({ baseURL: `${apiHost}/` });

export default wootAPI;
