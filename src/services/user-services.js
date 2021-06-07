import { getHeaders, URL } from './headers';

import store from '../reducers/store';
const USER = store.getState().userReducer.user;

async function getUsers(name) {
    const url = `${URL}/users/${name}`;
    const data = getHeaders();
    data.method = 'GET';

    const res = await fetch(url, data)
        .catch((e) => console.error(e));
    return res;
}

async function privilegeUser(userid, json) {
    const url = `${URL}/users/privilege/${userid}`;
    const data = getHeaders();
    data.method = 'POST';
    data.body = JSON.stringify(json);

    const res = await fetch(url, data)
        .catch((e) => console.error(e));
    return res;
}


function selfIsManager() {
    return USER.role === 2;
}

function selfIsMember() {
    return USER.role === 1;
}

function selfUserID() {
    return USER._id;
}

export {
    getUsers,
    privilegeUser,
    selfIsManager,
    selfIsMember,
    selfUserID
};