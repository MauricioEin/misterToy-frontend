<template>
    <div class="user-avatar-container text-center">
        <img v-if="avatarUrl" :src="avatarUrl" />
        <img v-else src="../assets/demoUser.png" alt="" />
    </div>
</template>

<script>
export default {
    name: 'user-avatar',
    props: {
        avatarUrl: {
            type: String,
        },
    },
}
</script>

<style>
.user-avatar-container img {
    object-fit: cover;
    border-radius: 50%;
    height: 130px;
    width: 130px;
}
</style>
