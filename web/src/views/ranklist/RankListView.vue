<template>
    <ContentField>
        <table class="table table-zebra" style="text-align: center;">
            <thead>
                <tr>
                    <th>玩家</th>
                    <th>天梯分</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>
                        <img :src="user.photo" alt="玩家头像" class="w-10 h-10 rounded-full inline-block">
                        &nbsp;
                        <span>{{ user.username }}</span>
                    </td>
                    <td>{{ user.rating }}</td>
                </tr>
            </tbody>
        </table>
        <nav>
            <div class="join float-right mt-4">
                <button class="join-item btn btn-sm" @click="click_page(-2)">上一页</button>
                <button
                    v-for="page in pages" :key="page.number"
                    :class="['join-item btn btn-sm', page.is_active ? 'btn-active' : '']"
                    @click="click_page(page.number)"
                >
                    {{ page.number }}
                </button>
                <button class="join-item btn btn-sm" @click="click_page(-1)">下一页</button>
            </div>
        </nav>
    </ContentField>
</template>

<script setup>
import ContentField from '../../components/ContentField.vue';
import { useStore } from 'vuex';
import apiClient from '@/utils/http'
import { ref } from 'vue';

const store = useStore();
let current_page = 1;
let users = ref([]);
let total_users = 0;

let pages = ref([]);

const click_page = page => {
    if (page === -2) {
        page = current_page - 1;
    } else if (page === -1) {
        page = current_page + 1;
    }
    let max_pages = parseInt(Math.ceil(total_users / 10));

    if (page >= 1 && page <= max_pages) {
        pull_page(page);
    }
    update_pages();
}

const update_pages = () => {
    let max_pages = parseInt(Math.ceil(total_users / 10));

    let new_pages = [];
    for (let i = current_page - 2; i <= current_page + 2; i ++ ) {
        if (i >= 1 && i <= max_pages) {
            new_pages.push({
                number: i,
                is_active: i === current_page ? "active" : ""
            });
        }
    }

    pages.value = new_pages;
}

const pull_page = page => {
    current_page = page;
    apiClient.get('/ranklist/getlist', { params: { page } }).then(resp => {
        users.value = resp.data.users;
        total_users = resp.data.users_count;
        update_pages();
    }).catch(err => {
        console.log(err);
    });
}
pull_page(current_page);


</script>
