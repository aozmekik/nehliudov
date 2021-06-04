import { getHeaders, URL } from './headers';


async function createFamily(fam) {
    const url = URL + '/families/';
    const data = getHeaders();
    data.method = 'POST';
    data.body = JSON.stringify(fam);

    const res = await fetch(url, data)
        .then(response => response.json())
        .catch((e) => console.error(e));
    return res;
}


export { createFamily };