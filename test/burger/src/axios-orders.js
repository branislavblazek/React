import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-6d0c1.firebaseio.com/'
});

export default instance;