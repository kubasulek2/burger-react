import axios from 'axios';



const instance = axios.create({
	baseURL: 'https://react-burger-dd76d.firebaseio.com/'
});

export default instance;