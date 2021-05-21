const URL = 'http://192.168.0.11:8080/api';


import * as StorageServices from './storage-services';
// import { connect } from 'react-redux'

async function getToken() {
    return StorageServices.load('token');
}

async function saveToken(token) {
    return StorageServices.save('token', token);
}

async function makeAuthApiCall(urlPath, user) {
    const url = `${URL}/${urlPath}`;
    data.body = JSON.stringify(user);
    const res = await fetch(URL, data)
        .then(response => response.json())
        .catch((e) => console.error(e));
    return res;
}

function login(user) {
    makeAuthApiCall('login', user)
        .then((res) => saveToken(res.token))
}

function register(user) {
    return makeAuthApiCall('register', user)
        .then((res) => saveToken(res.token));
}

function logout() {
    StorageServices.remove('token');
}

async function isLoggedIn() {
    const token = await getToken();
    console.log(token);
    if (token) {
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        return payload.expl > (Date.now() / 1000);
    } else {
        return false;
    }
}

async function getCurrentUser() {
    if (isLoggedIn()) {
        const token = getToken();
        const { expl, ...user } = JSON.parse(atob(token.split('.')[1]));
        return user;
    }
    return null;
}

module.exports = {
    login,
    register,
    logout,
    isLoggedIn,
    getCurrentUser
};