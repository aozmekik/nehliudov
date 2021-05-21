export const RESTORE_USER = 'RESTORE_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export function login(user) {
    return {
        type: LOGIN,
        user
    };
}

export function restoreUser(user) {
    return {
        type: RESTORE_USER,
        user
    }
}

export function logout()
{
    return {
        type: LOGOUT,
    }
}