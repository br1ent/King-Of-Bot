<template>
    <ContentField>
        <div class="max-w-7xl mx-auto px-5">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 my-10">
                <!-- 游戏介绍 -->
                <div class="intro-section">
                    <h1 class="mb-2">
                        <span class="title-text">King Of Bot</span>
                    </h1>
                    <p class="intro-subtitle">智能对战贪吃蛇</p>
                    <div class="intro-content">
                        <p>
                            基于微服务架构的多人实时对战平台，支持玩家使用编写的Bot代码进行竞技。
                            游戏采用回合制玩法，双方玩家在15×16的地图中操控贪吃蛇进行对战。
                        </p>
                        <p>
                            <strong>游戏介绍：</strong>
                        </p>
                        <ul>
                            <li>实时多人匹配</li>
                            <li>天梯排名系统</li>
                            <li>自定义Bot出战</li>
                        </ul>
                        <p>
                            <strong>游戏规则：</strong> WASD控制移动，双方输入后同时移动，撞墙、撞蛇身或者5s后任意一方没有输入即失败。
                        </p>
                    </div>
                </div>

                <!-- 项目演示 -->
                <div class="demo-section">
                    <h2 class="section-title">项目演示</h2>
                    <div class="flex flex-col gap-10">
                        <div class="card bg-base-200/50 shadow-xl p-10 text-center transition-transform duration-300 hover:-translate-y-1">
                            <h3 class="text-2xl font-semibold mb-6">对战演示</h3>
                            <img src="../../assets/gif/对战演示.gif" alt="对战演示" class="demo-image">
                            <p class="text-base-content/60 text-lg font-medium mt-5">实时多人对战界面展示</p>
                        </div>
                        <div class="card bg-base-200/50 shadow-xl p-10 text-center transition-transform duration-300 hover:-translate-y-1">
                            <h3 class="text-2xl font-semibold mb-6">录像演示</h3>
                            <img src="../../assets/gif/录像演示.gif" alt="录像演示" class="demo-image">
                            <p class="text-base-content/60 text-lg font-medium mt-5">游戏录像回放功能</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContentField>
</template>

<script setup>
import ContentField from '@/components/ContentField.vue'
</script>

<style scoped>
.title-text {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, oklch(50% 0.25 175), oklch(55% 0.20 250));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
}

.intro-subtitle {
    font-size: 1.8rem;
    color: oklch(40% 0.03 260);
    margin-bottom: 30px;
    font-weight: 500;
}

.intro-content {
    font-size: 1.2rem;
    line-height: 1.8;
    color: oklch(35% 0.04 260);
}

.intro-content p {
    margin-bottom: 25px;
}

.intro-content ul {
    margin: 25px 0;
    padding-left: 25px;
}

.intro-content li {
    margin-bottom: 12px;
    font-size: 1.1rem;
    line-height: 1.6;
}

.section-title {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 40px;
    text-align: left;
}

.demo-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 2px solid oklch(85% 0.03 260);
    display: block;
    margin: 0 auto;
}

@media (max-width: 992px) {
    .intro-section {
        text-align: center;
    }
    .intro-content {
        text-align: left;
    }
    .section-title {
        text-align: center;
    }
}

@media (max-width: 768px) {
    .title-text {
        font-size: 2.8rem;
    }
    .intro-subtitle {
        font-size: 1.5rem;
    }
    .section-title {
        font-size: 2.2rem;
    }
    .demo-image {
        max-width: 100%;
    }
}

@media (max-width: 480px) {
    .title-text {
        font-size: 2.2rem;
    }
    .intro-subtitle {
        font-size: 1.2rem;
    }
    .section-title {
        font-size: 1.8rem;
    }
    .intro-content {
        font-size: 1.1rem;
    }
}
</style>