import { getHeaders, URL } from './headers';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';




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




async function downloadFamily(fam) {
    const uri = `${URL}/families/pdf/${fam._id}`;
    let fileUri = FileSystem.documentDirectory + `${fam.name}.pdf`;
    FileSystem.downloadAsync(uri, fileUri, { headers: getHeaders().headers })
        .then(({ uri }) => {
            console.log('File downloaded ', uri);
            saveFile(uri);
        })
        .catch(error => {
            console.error(error);
        })
}

const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
}

export {
    createFamily,
    listFamilies,
    updateFamily,
    deleteFamily,
    downloadFamily
};