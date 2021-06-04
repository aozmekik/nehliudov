import { getHeaders, URL } from './headers';



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


export {
    getUsers,
    privilegeUser
};