import store from '../reducers/store';

const getHeaders = (withToken = true) => {

    const header = {
        method: null,
        credentials: 'same-origin',
        mode: 'same-origin',
        body: null,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    };

    if (withToken) {
        const token = store.getState().userReducer.user.token;
        header.headers = {
            ...header.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    return header;
};

const URL = 'http://192.168.0.11:8080/api';
// const URL = 'https://sonyadev.herokuapp.com/api';

async function apiCall(url, method, json) {
    const data = getHeaders();
    data.method = method;
    data.body = JSON.stringify(json);
    
    const res = await fetch(url, data)
        .catch((e) => console.error(e));
    return res;
}

export {
    getHeaders,
    URL,
    apiCall
};