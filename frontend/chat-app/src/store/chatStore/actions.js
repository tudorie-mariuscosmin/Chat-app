/*
export function someAction (context) {
}
*/
import axios from 'axios';
export async function login({ commit }, data) {
    //console.log(data)
    await commit('SetLoginData', data);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

}