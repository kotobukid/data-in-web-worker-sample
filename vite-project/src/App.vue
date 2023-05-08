<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {ref, inject, onMounted, computed} from "vue";

type Person = { id: number, name: string }

const people = ref<Person[]>([]);

const set_filter_word = (word: string) => {
    worker.postMessage({type: 'word', word});
};

const set_sex = (sex: string) => {
    worker.postMessage({
        type: 'sex',
        sex
    });
}

const _sex = ref<string>("");
const sex = computed({
    get: () => _sex.value,
    set: (value: string) => {
        _sex.value = value;
        set_sex(value);
    }
})

let worker = inject('worker');

worker.addEventListener('message', ({data}) => {
    switch (data.type) {
        case "filtered_item":
            console.log(data._items);
            people.value = data._items;
            break;
        default:
            console.log(data);
            break;
    }
});
onMounted(() => {
    set_filter_word('');
    set_sex('');
});
const _filter_word = ref<string>('');
const filter_word = computed({
    get: () => {
        return _filter_word.value;
    },
    set: (value: string) => {
        _filter_word.value = value;
        set_filter_word(value);
    }
});
</script>

<template>
<div>
    <input type="text" v-model="filter_word">
    <select name="sex" v-model="sex">
        <option value="">性別</option>
        <option value="male">男性</option>
        <option value="female">女性</option>
        <option value="other">それ以外</option>
    </select>
    <br>
    <span>people</span>
    <ul>
        <li v-for="p in people" :key="p.id">[{{ p.id }}] {{ p.name }}</li>
    </ul>
</div>
<!--<HelloWorld msg="Vite + Vue"/>-->
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
