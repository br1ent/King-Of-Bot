<template>
    <ContentField>
        <div class="min-h-[70vh] flex items-center justify-center px-4 py-10">
            <div class="text-center max-w-lg w-full py-12">
                <div class="text-[120px] font-bold text-error leading-none mb-5">404</div>
                <div class="text-3xl font-semibold mb-4">页面未找到</div>
                <div class="text-lg text-base-content/50 mb-8 leading-relaxed">
                    抱歉，您访问的页面不存在或已被移除
                </div>
                <div class="flex flex-wrap justify-center gap-4 mb-8">
                    <button @click="goHome" class="btn btn-primary">
                        返回首页
                    </button>
                    <button @click="goBack" class="btn btn-ghost">
                        返回上一页
                    </button>
                </div>
                <div class="bg-base-200/50 p-5 rounded-box text-left">
                    <p class="font-semibold mb-2">小贴士：</p>
                    <ul class="text-base-content/70 pl-5 space-y-1">
                        <li>检查 URL 地址是否正确</li>
                        <li>页面可能已被移动到其他位置</li>
                        <li>或者您没有访问权限</li>
                    </ul>
                </div>
            </div>
        </div>
    </ContentField>
</template>

<script setup>
import ContentField from '../../components/ContentField.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/');
};

const goBack = () => {
    router.back();
};
</script>
