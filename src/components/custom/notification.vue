<template>
    <transition name="fade">
        <div @click="closeNotification" v-if="show" class="notification-container">
            <div :class="'notification-content ' + type">
                <p>{{ message }}</p>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'otNotification',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'normal' // error, success, normal 
        }
    },
    methods: {
        ...mapActions('notification', ['closeNotification'])
    },
    watch: {
        async show () {
            await setTimeout(() => {
                this.closeNotification();
            }, 5000);

        }
    }
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.notification-container {
    cursor: pointer;
    position: fixed;
    width: 100%;
    bottom: 2rem;
    z-index: 1000;
}

.notification-content {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    max-width: 80%;
    border-radius: 5px;
    padding: 2rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
    opacity: 0;
    transform: translateY(1rem);
    animation: slideUp 0.5s forwards;
}

.notification-content.normal {
    background: white;
    color: #000;
}
.notification-content.error {
    background: red;
    color: #fff;
}
.notification-content.success {
    background: green;
    color: #fff;
}

@keyframes slideUp {
    to {
        transform: initial;
        opacity: initial;
    }
}

.notification-pref label {
    margin-right: 1rem;
}

@media (max-width: 768px) {
    .notification-content {
        grid-template-columns: 1fr;
    }
}
</style>