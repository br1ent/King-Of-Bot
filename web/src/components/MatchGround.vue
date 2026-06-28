<template>
    <div class="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
        <div class="card bg-base-100/90 backdrop-blur shadow-xl w-full max-w-4xl">
            <div class="card-body p-6 sm:p-10">
                <!-- VS 对战布局 -->
                <div class="flex items-center justify-between gap-4 sm:gap-8 mb-8">
                    <!-- 我方 -->
                    <div class="flex-1 text-center">
                        <div class="avatar mb-3">
                            <div class="w-20 h-20 sm:w-28 sm:h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img :src="$store.state.user.photo" alt="用户头像" />
                            </div>
                        </div>
                        <div class="font-bold text-lg sm:text-xl">{{ $store.state.user.username }}</div>
                        <div class="badge badge-primary badge-sm mt-1">{{ $store.state.user.rating }}</div>
                    </div>

                    <!-- VS 标识 -->
                    <div class="flex flex-col items-center gap-2 shrink-0">
                        <span class="text-4xl sm:text-5xl font-black text-primary/30">VS</span>
                        <div class="w-px h-16 sm:h-24 bg-gradient-to-b from-transparent via-base-300 to-transparent hidden sm:block"></div>
                    </div>

                    <!-- 对手 -->
                    <div class="flex-1 text-center">
                        <div class="avatar placeholder mb-3">
                            <div class="w-20 h-20 sm:w-28 sm:h-28 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2 bg-neutral text-neutral-content">
                                <img v-if="$store.state.pk.opponent_photo" :src="$store.state.pk.opponent_photo" alt="对手头像" />
                                <span v-else class="text-3xl">?</span>
                            </div>
                        </div>
                        <div class="font-bold text-lg sm:text-xl">
                            {{ $store.state.pk.opponent_username || '等待匹配' }}
                        </div>
                        <div class="badge badge-ghost badge-sm mt-1">
                            {{ $store.state.pk.opponent_rating || '---' }}
                        </div>
                    </div>
                </div>

                <!-- 分隔线 -->
                <div class="divider text-base-content/30 text-xs">选择出战方式</div>

                <!-- Bot 选择 + 匹配按钮 -->
                <div class="flex flex-col items-center gap-5">
                    <select class="select select-bordered w-full max-w-xs" v-model="select_bot">
                        <option selected value="-1">亲自出马</option>
                        <option v-for="bot in bots" :key="bot.id" :value="bot.id">{{ bot.title }}</option>
                    </select>

                    <button
                        type="button"
                        class="btn btn-wide"
                        :class="btn_match === '开始匹配' ? 'btn-primary' : 'btn-error'"
                        @click="startMatch"
                    >
                        <svg v-if="btn_match === '开始匹配'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        {{ btn_match }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import apiClient from '@/utils/http'

const store = useStore();
let btn_match = ref("开始匹配");

let select_bot = ref("-1");

const startMatch = () => {
    if (btn_match.value === "开始匹配") {
        btn_match.value = "取消匹配";
        store.state.pk.socket.send(JSON.stringify({
            event: "start_matching",
            bot_id: select_bot.value
        }));
    } else {
        btn_match.value = "开始匹配";
        store.state.pk.socket.send(JSON.stringify({
            event: "stop_matching"
        }));
    }
};

let bots = ref([]);
const getList = () => {
    apiClient.get('/user/bot/getlist').then(resp => {
        bots.value = resp.data;
    });
}
getList();
</script>
