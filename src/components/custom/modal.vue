<template>
    <transition name="fade">
        <div id="modal" class="modal-mask" v-if="show">
            <div class="modal-wrapper">
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden"
                >
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <slot name="body"></slot>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <slot name="footer">
                            <ot-button @click="$emit('close')" variant="ot-blue-outline">Fechar</ot-button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'otModal',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.modal-container {
    // width: var(--width);
    // height: var(--height);
    margin: 0px auto;
    background-color: #fff;
    /* font-family: Helvetica, Arial, sans-serif; */
    // overflow-y: var(--scrollable);
    // max-height: var(--height);
}
.modal-container::-webkit-scrollbar {
    width: 10px; /* width of the entire scrollbar */
}
.modal-container::-webkit-scrollbar-track {
    background: #fff; /* color of the tracking area */
}

.modal-container::-webkit-scrollbar-thumb {
    background-color: #dbdbdb; /* color of the scroll thumb */
    border-radius: 10px; /* roundness of the scroll thumb */
    border: 3px solid #fff; /* creates padding around scroll thumb */
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
