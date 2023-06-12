<template>
    <div>
        <h1>Login</h1>
        <div>Qui êtes-vous ?</div>
        <div>
            <input type="text" placeholder="Votre nom" v-model="myName" />
        </div>
        <div>
            <button @click="login">Login</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { init } from '@/utils/ws';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const myName = ref('');

const router = useRouter();

const login = () => {
    console.log('Je suis la fonction login', myName.value);
    localStorage.setItem('myName', myName.value);
    init();

    router.push('/chat-with');
};
</script>

<style></style>
