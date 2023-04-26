import axios from 'axios';
import { getToken, removeToken } from '../utils/localstorageItem';
import jwtDecode from 'jwt-decode';
export const BACKEND_BASE_URL= process.env.REACT_APP_BACKEND_BASE_URL;
export const HOME_URL='/home';
export const GET_ALL_PROJECTS_URL='/all-projects';
export const GET_PROJECT_URL='/project/';
export const GENERATE_TOKEN_URL='/generate-token';
export const CREATE_ADMIN_URL='/register-admin';
export const CURRENT_USER_URL='/current-user';
export const ADMIN_URL='/admin';
export const CREATE_MANAGER_URL=`${ADMIN_URL}/register-manager`;
export const CREATE_EMPLOYEE_URL=`${ADMIN_URL}/register-employee`;
export const MANAGER_URL='/manager';
export const GET_ALL_MANAGER_URL= `${MANAGER_URL}/all-managers`;
export const GET_MANAGER_URL=`${MANAGER_URL}/`
export const CREATE_PROJECT_URL=`${MANAGER_URL}/add-project`;
export const UPDATE_PROJECT_URL=`${MANAGER_URL}/update-project`;
export const DELETE_PROJECT_URL=`${MANAGER_URL}/delete-project/`;
export const GET_MANAGER_PROJECTS_URL=`${MANAGER_URL}/manager-projects/`;
export const EMPLOYEE_URL='/employee';
export const GET_ALL_EMPLOYEE_URL= `${EMPLOYEE_URL}/all-employees`;
export const GET_EMPLOYEE_URL=`${EMPLOYEE_URL}/`
export const APPLY_PROJECT_URL=`${EMPLOYEE_URL}/apply/`;

const TOKEN_HEADER = 'Authorization';
// export const JWT_TOKEN = 'jwtToken';

export const config = {
    headers: {
        'content-type': 'multipart/form-data; boundary=<calculated when request is sent>'
    }
}

export default axios.create({
    baseURL: BACKEND_BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BACKEND_BASE_URL
});

// axiosPrivate.defaults.headers.common[TOKEN_HEADER] = `Bearer ${jwtToken}`;
axiosPrivate.interceptors.request.use(config => {
    const jwtToken = getToken();
    
    const verify = verifyToken(jwtToken);
    if(verify) {
        config.headers[TOKEN_HEADER] = `Bearer ${jwtToken}`;
    }
    else {
        removeToken();
    }
    
    return config;
});

export const verifyToken = jwtToken => {
    if(jwtToken === undefined || jwtToken === null) {
        return false;
    }
    const expires_at = new Date(jwtDecode(jwtToken).exp * 1000);
    return (new Date(expires_at) > new Date()) ? true : false;
}