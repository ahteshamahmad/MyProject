const jwtToken = "jwtToken";

export const setToken = token => {
    localStorage.setItem(jwtToken, token);
    return true;
}

export const getToken = () => {
    return localStorage.getItem(jwtToken)
}

export const removeToken = () => {
    localStorage.removeItem(jwtToken);
}