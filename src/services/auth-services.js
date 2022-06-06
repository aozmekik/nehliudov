import { URL, getHeaders } from './headers';
import { Buffer } from "buffer";


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
    const data = getHeaders(false);
    data.method = 'POST';
    data.body = JSON.stringify(user);

    const res = await fetch(url, data)
        .catch((e) => console.error(e));
    return res;
}

async function login(user) {
    const res = await makeAuthApiCall('login', user);
    const json = await res.json();
    if (res.status === 200)
        saveToken(json.token);
    return { res, json };

}

async function register(user) {
    return await makeAuthApiCall('register', user);
}

async function logout() {
    StorageServices.remove('token');
}

function atob(token) {
    return Buffer.from(token, 'base64').toString('utf8');
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

async function restoreUser(token) {
    const url = `${URL}/restore/${token}`;
    const data = getHeaders(false);
    data.method = 'GET';

    try {
        const res = await fetch(url, data);
        const json = await res.json();
        return json;
    } catch (e) {
        console.error(e);
    }
}

async function getCurrentUser() {
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
        const token = await getToken();
        // // TODO. if there is no connection, do this.
        // const { exp, ...user } = JSON.parse(atob(token.split('.')[1]));
        // else do this.
        const user = await restoreUser(token);
        return { ...user, token: token };
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