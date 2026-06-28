<template>
    <ContentField>
        <table class="table table-zebra" style="text-align: center;">
            <thead>
                <tr>
                    <th>玩家 A</th>
                    <th>玩家 B</th>
                    <th>对战结果</th>
                    <th>对战时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records" :key="record.record.id">
                    <td>
                        <img :src="record.a_photo" alt="玩家A头像" class="w-10 h-10 rounded-full inline-block">
                        &nbsp;
                        <span>{{ record.a_username }}</span>
                    </td>
                    <td>
                        <img :src="record.b_photo" alt="玩家B头像" class="w-10 h-10 rounded-full inline-block">
                        &nbsp;
                        <span>{{ record.b_username }}</span>
                    </td>
                    <td>{{ record.result }}</td>
                    <td>{{ record.record.createtime }}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm" @click="open_record_content(record.record.id)">查看录像</button>
                    </td>
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
import router from '@/router/index.js'

const store = useStore();
let current_page = 1;
let records = ref([]);
let total_records = 0;

let pages = ref([]);

const click_page = page => {
    if (page === -2) {
        page = current_page - 1;
    } else if (page === -1) {
        page = current_page + 1;
    }
    let max_pages = parseInt(Math.ceil(total_records / 10));

    if (page >= 1 && page <= max_pages) {
        pull_page(page);
    }
    update_pages();
}

const update_pages = () => {
    let max_pages = parseInt(Math.ceil(total_records / 10));

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
    apiClient.get('/record/getlist', { params: { page } }).then(resp => {
        records.value = resp.data.records;
        total_records = resp.data.records_count;
        update_pages();
    }).catch(err => {
        console.log(err);
    });
}
pull_page(current_page);

const stringTo2D = map =>  {
    let g = [];
    for (let i = 0, k = 0; i < 15; i ++ ) {
        let line = [];
        for (let j = 0; j < 16; j ++ , k ++ ) {
            if (map[k] === "0") line.push(0);
            else line.push(1);
        }
        g.push(line);
    }
    return g;
}

const open_record_content = recordId => {
    for (const record of records.value) {
        if (record.record.id === recordId) {
            store.commit("updateIsRecord", true);
            store.commit("updateGame", {
                map: stringTo2D(record.record.map),
                a_id: record.record.aid,
                a_sx: record.record.asx,
                a_sy: record.record.asy,
                b_id: record.record.bid,
                b_sx: record.record.bsx,
                b_sy: record.record.bsy
            });
            store.commit("updateSteps", {
                a_steps: record.record.asteps,
                b_steps: record.record.bsteps
            });
            store.commit("updateRecordLoser", record.record.loser);
            router.push({
                name: "record_content",
                params: {
                    recordId
                }
            });
            break;
        }
    }
}
</script>
