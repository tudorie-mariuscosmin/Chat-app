/*
export function someAction (context) {
}
*/
import axios from 'axios';
export function login({ commit }, data) {
    //console.log(data)
    commit('SetLoginData', data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

}

export function logout({ commit }) {
    commit('ResetState');
    axios.defaults.headers.common['Authorization'] = '';
}