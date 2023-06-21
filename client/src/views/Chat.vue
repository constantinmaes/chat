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
                width: 75%;
            "
        >
            <div style="">
                <div
                    v-for="message in state.currentRoomMessages"
                    style="display: flex"
                    :style="{
                        justifyContent:
                            myName === message.from ? 'end' : 'start',
                    }"
                >
                    <div style="width: 40%">
                        <div style="color: grey">
                            {{ message.from }}
                        </div>
                        <div
                            :style="{
                                backgroundColor:
                                    myName === message.from ? 'blue' : 'red',
                            }"
                            style="
                                color: #fff;
                                padding: 8px;
                                border-radius: 5px;
                                margin-bottom: 8px;
                            "
                        >
                            {{ message.content }}
                        </div>
                        <div
                            style="
                                color: gray;
                                font-size: 0.75em;
                                text-align: right;
                            "
                        >
                            {{ message.timestamp }}
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 100%">
                <input
                    type="text"
                    placeholder="Votre message"
                    v-model="currentMessage"
                    style="width: 75%"
                />
                <button @click="sendMessage()" style="width: 25%">
                    Envoyer
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { sendToRoom, state } from '@/utils/ws';
import { ref } from 'vue';

const currentMessage = ref('');
const currentRoom = ref('');
const myName = localStorage.getItem('myName');

const selectRoom = (name: string) => {
    console.log('You have selected room', name);
    currentRoom.value = name;
};

const sendMessage = () => {
    sendToRoom(currentRoom.value, currentMessage.value);
};
</script>
