import { decode as atob } from 'base-64'
const URL = 'http://192.168.0.11:8080/api';


import * as StorageServices from './storage-services';
// import { connect } from 'react-redux'

const data = {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    body: null,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
};

async function getToken() {
    return StorageServices.load('token');
}

async function saveToken(token) {
    return StorageServices.save('token', token);
}

async function makeAuthApiCall(urlPath, user) {
    const url = `${URL}/${urlPath}`;
    data.body = JSON.stringify(user);
    const res = await fetch(url, data)
        .catch((e) => console.error(e));
    return res;
}

async function login(user) {
    const res = await makeAuthApiCall('login', user);
    const json = await res.json();
    if (json.errorCode == null)
        saveToken(json.token);
    return {res, json};

}

async function register(user) {
    return await makeAuthApiCall('register', user);
}

async function logout() {
    StorageServices.remove('token');
}

async function isLoggedIn() {
    const token = await getToken();
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > (Date.now() / 1000);
    } else {
        return false;
    }
}

async function getCurrentUser() {
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
        const token = await getToken();
        const { exp, ...user } = JSON.parse(atob(token.split('.')[1]));
        return { user, token };
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