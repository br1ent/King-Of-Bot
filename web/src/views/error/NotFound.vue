<template>
    <ContentField>
        <div class="not-found-container">
            <div class="error-content">
                <div class="error-code">404</div>
                <div class="error-title">页面未找到</div>
                <div class="error-message">
                    抱歉，您访问的页面不存在或已被移除
                </div>
                <div class="error-actions">
                    <button @click="goHome" class="btn btn-primary">
                        返回首页
                    </button>
                    <button @click="goBack" class="btn btn-secondary">
                        返回上一页
                    </button>
                </div>
                <div class="error-tips">
                    <p>💡 小贴士：</p>
                    <ul>
                        <li>检查URL地址是否正确</li>
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

<style scoped>
.not-found-container {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
}

.error-content {
    text-align: center;
    padding: 60px 40px;
    max-width: 500px;
    width: 100%;
}

.error-code {
    font-size: 120px;
    font-weight: bold;
    color: #ff6b6b;
    line-height: 1;
    margin-bottom: 20px;
}

.error-title {
    font-size: 32px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
}

.error-message {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
    line-height: 1.6;
}

.error-actions {
    margin-bottom: 30px;
}

.error-actions .btn {
    margin: 0 10px;
    padding: 12px 30px;
    font-size: 16px;
    border-radius: 25px;
    transition: all 0.3s ease;
}

.error-actions .btn-primary {
    background: #007bff;
    border: none;
}

.error-actions .btn-primary:hover {
    background: #0056b3;
    transform: translateY(-2px);
}

.error-actions .btn-secondary {
    background: #6c757d;
    border: none;
}

.error-actions .btn-secondary:hover {
    background: #5a6268;
    transform: translateY(-2px);
}

.error-tips {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    text-align: left;
}

.error-tips p {
    font-weight: 600;
    color: #495057;
    margin-bottom: 10px;
}

.error-tips ul {
    color: #6c757d;
    padding-left: 20px;
    margin: 0;
}

.error-tips li {
    margin-bottom: 5px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .error-code {
        font-size: 80px;
    }

    .error-title {
        font-size: 24px;
    }

    .error-message {
        font-size: 16px;
    }

    .error-actions .btn {
        display: block;
        width: 100%;
        margin: 10px 0;
    }
}
</style>