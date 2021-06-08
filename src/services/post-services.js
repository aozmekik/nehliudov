import { URL, apiCall } from './headers';

async function listPosts({ before, after }) {
    let url = `${URL}/posts`;
    if (before)
        url += `?before=${before}`;
    else if (after)
        url += `?after=${after}`;

    return await apiCall(url, 'GET');
}

async function createPost(post) {
    return await apiCall(`${URL}/posts`, 'POST', post);
}

async function listPostsOfUser({ userid, before, after }) {
    let url = `${URL}/posts/${userid}`;
    if (before)
        url += `?before=${before}`;
    else if (after)
        url += `?after=${after}`;
    console.log(url);
    return await apiCall(url, 'GET');
}

module.exports = {
    listPosts,
    createPost,
    listPostsOfUser
};