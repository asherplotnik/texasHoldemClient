import axios from 'axios';
import { logoutAuthAction } from '../redux/AuthState';
import store from '../redux/Store';

const jwtAxios = axios.create();

// Request interceptor - מה אנו רוצים לבצע בכל שליחת בקשה לשרת
jwtAxios.interceptors.request.use(request => {
    request.headers = {
        "token": store.getState().AuthState.auth.token
    };

    return request;
});

jwtAxios.interceptors.response.use(
    successRes => {
       return successRes;
    }, 
    error => {
      if (error?.response?.data.status===401){
        store.dispatch(logoutAuthAction());
      }
      return Promise.reject(error);
    }
  );


export default jwtAxios;
