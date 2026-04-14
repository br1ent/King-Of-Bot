<template>
    <div class="playground">
        <!-- 蓝蛇玩家(A)的标识在左下角 -->
        <div v-if="!isRecord && isPlayerA" class="snake-indicator snake-indicator-left">
            <div class="snake-color" :style="{ backgroundColor: '#4876EC' }"></div>
            <span class="snake-text">我的蛇</span>
        </div>
        <div v-if="!isRecord && isPlayerA" class="snake-indicator snake-indicator-right">
            <span class="snake-text">对手</span>
            <div class="snake-color" :style="{ backgroundColor: '#F94848' }"></div>
        </div>

        <!-- 红蛇玩家(B)的标识在右上角 -->
        <div v-if="!isRecord && !isPlayerA" class="snake-indicator snake-indicator-left">
            <div class="snake-color" :style="{ backgroundColor: '#4876EC' }"></div>
            <span class="snake-text">对手</span>
        </div>
        <div v-if="!isRecord && !isPlayerA" class="snake-indicator snake-indicator-right">
            <span class="snake-text">我的蛇</span>
            <div class="snake-color" :style="{ backgroundColor: '#F94848' }"></div>
        </div>
        <GameMap></GameMap>
    </div>
</template>

<script setup>
import GameMap from './GameMap.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const isRecord = computed(() => store.state.record.is_record);

// 判断当前用户是否是玩家A（蓝蛇）
const isPlayerA = computed(() => {
    const aId = store.state.pk.a_id;
    const myId = parseInt(store.state.user.id);
    return aId === myId;
});
</script>

<style scoped>
div.playground {
    width: 60vw;
    height: 70vh;
    margin: 40px auto;
    position: relative;
}

.snake-indicator {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 12px;
    border-radius: 8px;
    z-index: 10;
}

.snake-indicator-left {
    left: 10px;
    bottom: 10px;
}

.snake-indicator-right {
    right: 10px;
    top: 10px;
}

.snake-color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
}

.snake-text {
    color: white;
    font-size: 14px;
    font-weight: bold;
}
</style>