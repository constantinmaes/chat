<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <div>
        <div class="">
            <div>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/login">Login</RouterLink>
            </div>
        </div>
    </div>

    <RouterView />
</template>
