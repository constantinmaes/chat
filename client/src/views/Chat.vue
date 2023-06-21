<template>
    <div>Chat</div>
    <div style="display: flex; gap: 64px">
        <div>
            <div
                v-for="room in state.participateIn"
                style="cursor: pointer"
                @click="selectRoom(room)"
            >
                {{ room }}
            </div>
        </div>
        <div
            style="
                display: flex;
                flex-direction: column;
                height: 75vh;
                justify-content: space-between;
            "
        >
            <div>
                <div v-for="message in state.currentRoomMessages">
                    {{ message }}
                </div>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Votre message"
                    v-model="currentMessage"
                />
                <button @click="sendMessage()">Envoyer</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { sendToRoom, state } from '@/utils/ws';
import { ref } from 'vue';

const currentMessage = ref('');
const currentRoom = ref('');

const selectRoom = (name: string) => {
    console.log('You have selected room', name);
    currentRoom.value = name;
};

const sendMessage = () => {
    sendToRoom(currentRoom.value, currentMessage.value);
};
</script>
