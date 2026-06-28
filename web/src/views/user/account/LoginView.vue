<template>
    <LoginRegisterField v-if="!$store.state.user.pulling_info">
        <h3 class="text-center mb-4 font-bold text-primary text-xl">登 录</h3>

        <div v-if="successMsg" class="alert alert-success shadow-sm mb-3">
            {{ successMsg }}
        </div>
        <div v-if="errMsg" class="alert alert-error shadow-sm mb-3">
            {{ errMsg }}
        </div>

        <form @submit.prevent="login">
            <div class="mb-3">
                <label for="username" class="label-text text-sm font-bold">用户名</label>
                <input
                    type="text"
                    class="input input-bordered input-lg w-full"
                    id="username"
                    placeholder="请输入用户名"
                    v-model="username"
                >
            </div>
            <div class="mb-4">
                <label for="password" class="label-text text-sm font-bold">密码</label>
                <input
                    type="password"
                    class="input input-bordered input-lg w-full"
                    id="password"
                    placeholder="请输入密码"
                    v-model="password"
                >
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-full">
                登 录
            </button>
        </form>

        <div class="text-center mt-4">
            <small class="text-base-content/50">没有账号？
                <router-link :to="{name: 'register'}" class="link link-primary">立即注册</router-link>
            </small>
        </div>
    </LoginRegisterField>
</template>

<script setup>
import LoginRegisterField from '@/components/LoginRegisterField.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const username = ref("");
const password = ref("");
const errMsg = ref("");
const successMsg = ref("");
const router = useRouter();

const jwt_token = localStorage.getItem("jwt_token");
if (jwt_token) {
    store.commit("updateToken", jwt_token);
    store.dispatch("getinfo", {
        success() {
            router.push({name: 'home'});
            store.commit("updatePullingInfo", false);
        },
        error() {
            store.commit("updatePullingInfo", false);
        }
    })
} else {
    store.commit("updatePullingInfo", false);
}

const login = () => {
    errMsg.value = "",
    store.dispatch("login", {
        username: username.value,
        password: password.value,
        success() {
            store.dispatch("getinfo", {
                success() {
                    successMsg.value = "登录成功！"
                    setTimeout(() => {
                        router.push({name: 'home'});
                    }, 1000);
                }
            })
        },
        error() {
            errMsg.value = "用户名或密码错误！"
        }
    });
};
</script>
