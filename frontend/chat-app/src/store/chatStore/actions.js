/*
export function someAction (context) {
}
*/
import axios from 'axios';
export function login({ commit }, data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
    commit('SetLoginData', data);

}