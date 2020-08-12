/*
export function someGetter (state) {
}
*/
export function getToken(state) {
    return state.token
}

export function getFullName(state) {
    return state.firstName + ' ' + state.lastName;
}

