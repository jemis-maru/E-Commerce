import Cookies from 'js-cookie';
import { login } from '../../api/auth';

const state = {
    user: {},
    token: '',
    email: "admin@gmail.com",
    role: "",
}

const mutations = {
    SET_EMAIL(state, email) {
        state.email = email;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_USER(state, user) {
        state.user = user;
    },
    SET_ROLE(state, role) {
        state.role = role;
    },
    RESET_STATE(state) {
        state.user = {};
        state.token = '';
        state.email = "";
        state.role = "";
    }
}

const actions = {

    setLoginState({ commit }, credentials) {

        return new Promise((resolve, reject) => {

            login(credentials).then((response) => {
                const data = response.data.data;
               
                Cookies.set('token', data.verifyToken, { expires: 1 });
                commit("SET_TOKEN", data.verifyToken);
                commit("SET_EMAIL", data.user.email)
                commit("SET_USER", data.user);
                commit("SET_ROLE", data.user.role);

            })
                .then((data) => {
                    resolve(data);
                })
                .catch((data, error) => {
                    reject(error);
                });
        })
    },
    
    logout({commit}){
        return new Promise((resolve,reject) => {
            Cookies.remove('token');
            commit("RESET_STATE");
            resolve();

        })
    }

}

const getters = {
    token(state) {
        return state.token
    },
    email(state) {
        return state.email
    },
    role(state) {
        return state.role
    },
    user(state){
        return state.user;
    },
    isLoggedIn(state){
        if(!!state.token){
            return true
        }
        else{
            return false
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}