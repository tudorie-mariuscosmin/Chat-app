/*
export function someMutation (state) {
}
*/

export function SetLoginData(state, data) {

    state.firstName = data.firstName
    state.lastName = data.lastName
    state.admin = data.admin
    state.token = data.token
}

export function ResetState(state) {
    state.firstName = '';
    state.lastName = '';
    state.admin = '';
    state.token = '';
}
