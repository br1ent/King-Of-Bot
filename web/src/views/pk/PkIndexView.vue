<template>
    <PlayGround>

    </PlayGround>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import PlayGround from '../../components/PlayGround.vue';
import { useStore } from 'vuex';

const store = useStore();
let socket = null;
const socketUrl = `ws://127.0.0.1:3000/websocket/${store.state.user.token}`;
onMounted(() => {
    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
        console.log("WebSocket连接已打开");
    };

    socket.onclose = () => {
        console.log("WebSocket连接已关闭");
    };

    socket.onmessage = msg => {
        const data = JSON.parse(msg.data);
        console.log("收到消息:", data);
    }
});

onUnmounted(() => {
    if (socket) {
        socket.close();
    }
});

</script>

<style scoped>
</style>