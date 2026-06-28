<template>
  <div>
    <template v-if="shouldShowSideBar">
      <SideBar />
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';

const store = useStore();
const route = useRoute();

// 对战中隐藏侧边栏，全屏沉浸
const shouldShowSideBar = computed(() => {
    if (store.state.pk.status === 'playing') return false;
    return true;
});

// 启动时恢复登录状态
onMounted(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
        store.commit("updateToken", token);
        store.dispatch("getinfo", {
            error() {
                localStorage.removeItem("jwt_token");
                store.commit("logout");
            }
        });
    } else {
        store.commit("updatePullingInfo", false);
    }
});

</script>

<style>
body {
  background-image: url("@/assets/images/background.png");
  background-size: cover;
}
</style>
