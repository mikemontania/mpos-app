import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
// test
export const baseURL = 'https://mposdev.mobile.com.py/mpos/rest';
// local
//export const baseURL = 'http://localhost:8080/rest';
// produccion
//export const baseURL = 'https://pos.cavallaro.com.py/mpos/rest';
// mobile
// export const baseURL ="https://mpos.mobile.com.py/mpos/rest";

const apiAxios = axios.create({ baseURL });

apiAxios.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    }
);



export default apiAxios;
