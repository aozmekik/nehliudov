const URL = 'http://192.168.0.11:8080/api/families/';

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

async function createFamily(fam) {
    data.body = JSON.stringify(fam);
    const res = await fetch(URL, data)
        .then(response => response.json())
        .catch((e) => console.error(e));
    return res;
}


export { createFamily };