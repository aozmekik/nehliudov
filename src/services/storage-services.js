import * as SecureStore from 'expo-secure-store';


async function save(key, value) {
    try {
        await SecureStore.setItemAsync(key, value);
    }
    catch (e) {
        console.error(e);
    }
}

async function load(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

async function remove(key) {
    try {
        await SecureStore.deleteItemAsync(key);
    }
    catch (e) {
        console.error(e);
    }
}


export { save, load, remove };