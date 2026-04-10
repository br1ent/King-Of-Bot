<template>
    <div class="container-fluid d-flex align-items-center justify-content-center vh-100 content-field">
        <div class="card shadow-lg border-0 login-card">
            <div class="card-body p-4">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.login-card {
    width: 100%;
    max-width: 400px; /* 限制宽度，比 col-3 更稳定 */
    border-radius: 15px; /* 圆角看起来更现代 */
}
</style>