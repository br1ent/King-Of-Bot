<template>
    <div class="container mx-auto px-4 mt-5">
        <div class="flex flex-wrap gap-5">
            <!-- Left: Avatar card -->
            <div class="w-full lg:w-1/4">
                <div class="card bg-base-200/50 shadow-xl">
                    <div class="card-body items-center p-6">
                        <img :src="$store.state.user.photo" alt="头像" class="w-full rounded-lg">
                        <h5 class="font-bold text-lg mt-3">{{ $store.state.user.username }}</h5>
                    </div>
                </div>
            </div>

            <!-- Right: Bot list -->
            <div class="w-full lg:w-3/4">
                <div class="card bg-base-200/50 shadow-xl">
                    <div class="card-body p-0">
                        <div class="flex items-center justify-between p-4 border-b border-base-300">
                            <span class="text-xl font-bold">我的 Bot</span>
                            <button type="button" class="btn btn-primary btn-sm" @click="openCreateModal">＋ 创建 Bot</button>
                        </div>
                        <div class="overflow-x-auto p-4">
                            <table class="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>名称</th>
                                        <th>创建时间</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="bot in bots" :key="bot.id">
                                        <td>{{ bot.title }}</td>
                                        <td>{{ bot.createtime }}</td>
                                        <td>
                                            <button type="button" class="btn btn-ghost btn-sm mr-2" @click="openUpdateModal(bot)">
                                                修改
                                            </button>
                                            <button type="button" class="btn btn-error btn-sm" @click="remove_bot(bot)">删除</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 创建 Bot 模态框 -->
    <ModalDialog ref="createModal" id="create-bot-modal" title="创建 Bot">
        <div class="mb-3">
            <label for="add-bot-title" class="label-text text-sm font-bold">名称</label>
            <input type="text" class="input input-bordered w-full" id="add-bot-title" placeholder="请输入名称" v-model="botadd.title">
        </div>
        <div class="mb-3">
            <label for="add-bot-description" class="label-text text-sm font-bold">简介</label>
            <input type="text" class="input input-bordered w-full" id="add-bot-description" placeholder="请输入简介" v-model="botadd.description">
        </div>
        <div class="mb-3">
            <label for="add-bot-content" class="label-text text-sm font-bold">Bot 代码</label>
            <span class="text-sm text-base-content/50">（目前只支持 Java 代码）</span>
            <VAceEditor
                v-model:value="botadd.content"
                @init="editorInit"
                lang="java"
                theme="textmate"
                style="height: 300px"
                :options="{
                    fontSize: 20,
                    fontFamily: 'Consolas, Monaco, monospace',
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }"
            />
        </div>
        <template #footer>
            <div class="text-error text-sm">{{ botadd.errMsg }}</div>
            <button type="button" class="btn btn-primary" @click="add_bot">保存</button>
            <button type="button" class="btn" @click="createModal?.hide()">取消</button>
        </template>
    </ModalDialog>

    <!-- 修改 Bot 模态框 -->
    <ModalDialog ref="updateModal" id="update-bot-modal" title="修改 Bot">
        <template v-if="currentEditingBot">
            <div class="mb-3">
                <label class="label-text text-sm font-bold">名称</label>
                <input type="text" class="input input-bordered w-full" placeholder="请输入名称" v-model="currentEditingBot.title">
            </div>
            <div class="mb-3">
                <label class="label-text text-sm font-bold">简介</label>
                <input type="text" class="input input-bordered w-full" placeholder="请输入简介" v-model="currentEditingBot.description">
            </div>
            <div class="mb-3">
                <label class="label-text text-sm font-bold">Bot 代码</label>
                <span class="text-sm text-base-content/50">（目前只支持 Java 代码）</span>
                <VAceEditor
                    v-model:value="currentEditingBot.content"
                    @init="editorInit"
                    lang="java"
                    theme="textmate"
                    style="height: 300px"
                    :options="{
                        fontSize: 20,
                        fontFamily: 'Consolas, Monaco, monospace',
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                    }"
                />
            </div>
        </template>
        <template #footer>
            <div class="text-error text-sm">{{ currentEditingBot?.errMsg }}</div>
            <button type="button" class="btn btn-primary" @click="saveUpdate">保存</button>
            <button type="button" class="btn" @click="updateModal?.hide()">取消</button>
        </template>
    </ModalDialog>
</template>

<script setup>
import { useStore } from 'vuex';
import { reactive, ref } from 'vue';
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/ext-language_tools';
import ace from 'ace-builds';
import ModalDialog from '@/components/ModalDialog.vue'
import apiClient from '@/utils/http'

ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/"
)

ace.require("ace/ext/language_tools");

const store = useStore();
let bots = ref([]);

const botadd = reactive({
    title: "",
    description: "",
    content: "",
    errMsg: ""
});

const createModal = ref(null)
const updateModal = ref(null)
const currentEditingBot = ref(null)

const getList = () => {
    apiClient.get('/user/bot/getlist').then(resp => {
        bots.value = resp.data;
    });
}
getList();

const openCreateModal = () => {
    botadd.title = "";
    botadd.description = "";
    botadd.content = "";
    botadd.errMsg = "";
    createModal.value?.show();
}

const openUpdateModal = (bot) => {
    currentEditingBot.value = reactive({
        id: bot.id,
        title: bot.title,
        description: bot.description,
        content: bot.content,
        errMsg: ''
    });
    updateModal.value?.show();
}

const add_bot = () => {
    botadd.errMsg = "";

    apiClient.post('/user/bot/add', {
        title: botadd.title,
        description: botadd.description,
        content: botadd.content
    }).then(resp => {
        if (resp.data.error_message === "success") {
            createModal.value?.hide();
            getList();
        } else {
            botadd.errMsg = resp.data.error_message;
        }
    }).catch(() => {
        botadd.errMsg = "服务器异常，添加失败！";
    });
}

const remove_bot = (bot) => {
    apiClient.post('/user/bot/remove', {
        bot_id: bot.id
    }).then(resp => {
        if (resp.data.error_message === "success") {
            getList();
        }
    }).catch(() => {
        botadd.errMsg = "服务器异常，删除失败！";
    });
}

const saveUpdate = () => {
    if (!currentEditingBot.value) return;
    currentEditingBot.value.errMsg = "";

    apiClient.post('/user/bot/update', {
        bot_id: currentEditingBot.value.id,
        title: currentEditingBot.value.title,
        description: currentEditingBot.value.description,
        content: currentEditingBot.value.content
    }).then(resp => {
        if (resp.data.error_message === "success") {
            updateModal.value?.hide();
            getList();
        } else {
            currentEditingBot.value.errMsg = resp.data.error_message;
        }
    }).catch(() => {
        currentEditingBot.value.errMsg = "服务器异常，修改失败！";
    });
}

</script>

<style scoped>
:deep(.ace_editor) {
    border: 1px solid oklch(85% 0.03 260);
    border-radius: 0.5rem;
}
</style>
