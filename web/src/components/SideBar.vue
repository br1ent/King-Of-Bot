<template>
  <div class="drawer lg:drawer-open">
    <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />

    <!-- 主内容区 -->
    <div class="drawer-content flex flex-col min-h-screen">
      <!-- 移动端顶部栏 -->
      <div class="sticky top-0 z-40 flex items-center gap-2 bg-base-100/90 backdrop-blur p-3 lg:hidden shadow-sm">
        <label for="sidebar-drawer" class="btn btn-ghost btn-sm drawer-button">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </label>
        <span class="font-bold text-lg">King Of Bot</span>
      </div>

      <router-view />
    </div>

    <!-- 侧边栏：桌面端始终可见，带折叠切换 -->
    <div class="drawer-side z-50">
      <label for="sidebar-drawer" aria-label="关闭侧边栏" class="drawer-overlay"></label>
      <aside
        :class="[
          'bg-base-100 border-r border-base-300/40 min-h-screen flex flex-col transition-all duration-300 ease-in-out',
          collapsed ? 'w-16' : 'w-64'
        ]"
      >
        <!-- Logo 区 -->
        <div class="flex items-center gap-3 px-4 py-5 border-b border-base-300/30" :class="collapsed ? 'justify-center' : ''">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
            <span class="text-primary-content font-black text-sm">K</span>
          </div>
          <div v-show="!collapsed" class="overflow-hidden whitespace-nowrap">
            <div class="font-bold text-base leading-tight">King Of Bot</div>
            <div class="text-xs text-base-content/50">贪吃蛇对战平台</div>
          </div>
        </div>

        <!-- 导航菜单 -->
        <ul class="menu gap-0.5 px-2 py-4 flex-1" :class="collapsed ? '' : 'menu-lg px-3'">
          <li>
            <router-link :to="{name: 'home'}" class="rounded-lg" :class="collapsed ? 'justify-center px-0' : ''">
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/>
              </svg>
              <span v-show="!collapsed">首页</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'pk'}" class="rounded-lg" :class="collapsed ? 'justify-center px-0' : ''">
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span v-show="!collapsed">对战</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'record'}" class="rounded-lg" :class="collapsed ? 'justify-center px-0' : ''">
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <span v-show="!collapsed">对局列表</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'ranklist'}" class="rounded-lg" :class="collapsed ? 'justify-center px-0' : ''">
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span v-show="!collapsed">排行榜</span>
            </router-link>
          </li>
        </ul>

        <!-- 折叠按钮 -->
        <div class="px-2 pb-2 hidden lg:block">
          <button
            class="btn btn-ghost btn-sm w-full"
            :class="collapsed ? '' : 'justify-start'"
            @click="collapsed = !collapsed"
            :title="collapsed ? '展开侧边栏' : '收起侧边栏'"
          >
            <svg v-if="collapsed" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
            </svg>
            <svg v-else class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
            </svg>
            <span v-show="!collapsed" class="ml-1">收起</span>
          </button>
        </div>

        <!-- GitHub 链接 -->
        <div class="px-2 pb-1 hidden lg:block" :class="collapsed ? 'text-center' : ''">
          <a href="https://github.com/br1ent/King-Of-Bot" target="_blank" rel="noopener noreferrer"
             class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-base-content/50 hover:bg-base-200 hover:text-base-content transition-colors"
             :class="collapsed ? 'justify-center px-0' : ''"
             :title="collapsed ? 'GitHub' : ''"
          >
            <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span v-show="!collapsed">GitHub</span>
          </a>
        </div>

        <!-- 底部：用户信息 / 登录 -->
        <div class="border-t border-base-300/30 px-2 py-3">
          <template v-if="$store.state.user.is_login">
            <div class="dropdown dropdown-top w-full">
              <label tabindex="0"
                class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-base-200 transition-colors"
                :class="collapsed ? 'justify-center' : ''"
              >
                <div class="avatar placeholder shrink-0">
                  <div class="w-8 h-8 rounded-full bg-neutral text-neutral-content">
                    <img v-if="$store.state.user.photo" :src="$store.state.user.photo" alt="头像" class="w-8 h-8 rounded-full">
                    <span v-else class="text-xs">{{ $store.state.user.username?.charAt(0) }}</span>
                  </div>
                </div>
                <template v-if="!collapsed">
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-semibold truncate">{{ $store.state.user.username }}</div>
                    <div class="text-xs text-base-content/50">{{ $store.state.user.rating || '未排名' }}</div>
                  </div>
                  <svg class="w-4 h-4 text-base-content/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                  </svg>
                </template>
              </label>
              <ul tabindex="0" class="dropdown-content z-50 menu p-2 shadow bg-base-200 rounded-box w-52 mb-2">
                <li>
                  <router-link :to="{name: 'user_bot'}">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    我的 Bot
                  </router-link>
                </li>
                <li>
                  <a href="#" @click.prevent="logout" class="text-error">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    退出登录
                  </a>
                </li>
              </ul>
            </div>
          </template>
          <template v-else-if="!$store.state.user.pulling_info">
            <div :class="collapsed ? 'flex flex-col gap-1' : 'flex flex-col gap-2'">
              <router-link :to="{name: 'login'}" class="btn btn-primary btn-sm w-full">登录</router-link>
              <router-link v-show="!collapsed" :to="{name: 'register'}" class="btn btn-ghost btn-sm w-full">注册</router-link>
            </div>
          </template>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute()
let route_name = computed(() => route.name)

const router = useRouter();
const store = useStore();

const collapsed = ref(false);

const logout = () => {
    store.dispatch("logout");
    router.push({name: "login"})
}
</script>
