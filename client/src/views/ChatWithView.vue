<template>
    <div>
        <h1>Chat with</h1>
        <div>
            <input type="text" placeholder="Chat with..." v-model="chatWith" />
        </div>
        <div>
            <button @click="startChat">Start chat</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { joinRoomWith } from '@/utils/ws';
import { ref } from 'vue';

const chatWith = ref('');

const startChat = () => {
    joinRoomWith(chatWith.value);
};
</script>

<style></style>
