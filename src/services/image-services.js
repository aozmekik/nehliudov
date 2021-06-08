import { URL, getHeaders } from './headers';

async function getImage(imageid) {
    const url = `${URL}/images/${imageid}`;
    const data = getHeaders();
    data.method = 'GET';

    const res = await fetch(url, data)
        .catch((e) => console.error(e));
    return res;
}

module.exports = {
    getImage,
};