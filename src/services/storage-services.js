import * as SecureStore from 'expo-secure-store';


async function save(key, value) {
    let result = await SecureStore.setItemAsync(key, value);
    if (!result)
        alert('Could not save the key.');
}

async function load(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

async function remove(key) {
    let result = await SecureStore.delete(key);
    if (!result)
        alert('No values stored under that key.');
}


export { save, load, remove };