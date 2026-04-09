<template>
    <ContentField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form>
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class="mb-3">
                        <label for="confirmed_password" class="form-label">确认密码</label>
                        <input type="password" class="form-control" id="confirmed_password" placeholder="请确认密码">
                    </div>
                    <div class="errMsg"></div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">注册</button>
                </form>
            </div>
        </div>
    </ContentField>
</template>

<script setup>
import ContentField from '@/components/ContentField.vue';



</script>

<style scoped>

div.errMsg {
    color: red;
    text-align: center;
    margin-bottom: 10px;
}
</style>