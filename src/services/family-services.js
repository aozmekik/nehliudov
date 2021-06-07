import { getHeaders, URL } from './headers';



async function createFamily(fam) {
    const url = URL + '/families/create/';
    const data = getHeaders();
    data.method = 'POST';
    data.body = JSON.stringify(fam);

    const res = await fetch(url, data)
        .catch((e) => console.error(e));
    return res;
}

async function listFamilies(query) {
    const url = URL + '/families/';
    const data = getHeaders();
    data.method = 'POST';
    data.body = JSON.stringify(query);

    const res = await fetch(url, data)
        .catch((e) => console.error(e));
    return res;
}

async function updateFamily(fam) {
    const url = `${URL}/families/${fam._id}`
    const data = getHeaders();
    data.method = 'PUT';
    data.body = JSON.stringify(fam);

    const res = await fetch(url, data)
        .catch((e) => console.error(e));
    return res;
}

async function deleteFamily(fam) {
    const url = `${URL}/families/${fam._id}`
    const data = getHeaders();
    data.method = 'DELETE';

    const res = await fetch(url, data)
        .catch((e) => console.error(e));
    return res;
}

export {
    createFamily,
    listFamilies,
    updateFamily,
    deleteFamily
};