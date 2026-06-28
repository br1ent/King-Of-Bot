import apiClient from '@/utils/http'

export default {
    state: {
        id: "",
        username: "",
        photo: "",
        rating: "",
        token: "",
        is_login: false,
        pulling_info: true,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.rating = user.rating;
            state.is_login = user.is_login;
        },

        updateToken(state, token) {
            state.token = token;
        },

        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.rating = "";
            state.token = "";
            state.is_login = false;
        },
        updatePullingInfo(state, pulling_info) {
            state.pulling_info = pulling_info;
        }
    },
    actions: {
        login(context, data) {
            apiClient.post('/user/account/token', {
                username: data.username,
                password: data.password
            }).then(resp => {
                if (resp.data.error_message === "success") {
                    localStorage.setItem("jwt_token", resp.data.token);
                    context.commit("updateToken", resp.data.token);
                    data.success(resp.data);
                } else {
                    data.error(resp.data);
                }
            }).catch(resp => {
                data.error(resp);
            })
        },

        getinfo(context, data) {
            apiClient.get('/user/account/getinfo').then(resp => {
                if (resp.data.error_message === "success") {
                    context.commit("updateUser", {
                        ...resp.data,
                        is_login: true,
                    });
                    data.success(resp.data);
                } else {
                    data.error(resp.data);
                }
            }).catch(resp => {
                data.error(resp);
            });
        },
        logout(context) {
            localStorage.removeItem("jwt_token");
            context.commit("logout");
        }
    },
    modules: {
    }
}