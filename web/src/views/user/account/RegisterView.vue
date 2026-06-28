<template>
    <LoginRegisterField>
        <h3 class="text-center mb-4 font-bold text-primary text-xl">注 册</h3>

        <div v-if="successMsg" class="alert alert-success shadow-sm mb-3 text-center">
            {{ successMsg }}
        </div>
        <div v-if="errMsg" class="alert alert-error shadow-sm mb-3 text-center">
            {{ errMsg }}
        </div>

        <form @submit.prevent="register">
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
            <div class="mb-3">
                <label for="password" class="label-text text-sm font-bold">密码</label>
                <input
                    type="password"
                    class="input input-bordered input-lg w-full"
                    id="password"
                    placeholder="请输入密码"
                    v-model="password"
                >
            </div>
            <div class="mb-4">
                <label for="confirmedPassword" class="label-text text-sm font-bold">确认密码</label>
                <input
                    type="password"
                    class="input input-bordered input-lg w-full"
                    id="confirmedPassword"
                    placeholder="请再次输入密码"
                    v-model="confirmedPassword"
                >
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-full font-bold">
                注 册
            </button>
        </form>

        <div class="text-center mt-4">
            <small class="text-base-content/50">已有账号？
                <router-link :to="{name: 'login'}" class="link link-primary font-bold">立即登录</router-link>
            </small>
        </div>
    </LoginRegisterField>
</template>

<script setup>
import LoginRegisterField from '@/components/LoginRegisterField.vue';
import apiClient from '@/utils/http'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref("");
const password = ref("");
const confirmedPassword = ref("");
const errMsg = ref("");
const router = useRouter();
const successMsg = ref("");

const register = () => {
    errMsg.value = "";
    successMsg.value = "";
    apiClient.post('/user/account/register', {
        username: username.value,
        password: password.value,
        confirmedPassword: confirmedPassword.value
    }).then(resp => {
        if (resp.data.error_message === "success") {
            successMsg.value = "注册成功！正在跳转..."
            setTimeout(() => {
                router.push({name: "login"});
            }, 1000);
        } else {
            errMsg.value = resp.data.error_message;
        }
    }).catch(() => {
        errMsg.value = "连接失败，请稍后重试"
    })
}
</script>
