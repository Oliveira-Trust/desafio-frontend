<template>
    <ot-modal :show="show">
        <div class="container-box" slot="body">
            <div class="flex-wrap">
                <font-awesome-icon
                    @click="openModalDeleteUser(item.id)"
                    class="trash"
                    icon="trash"
                />
            </div>
            <div class="title flex-wrap">Excluir Carteira</div>
            <div class="sub-title">Tem certeza que deseja excluir essa Carteira?</div>
            <div class="sub-title">Esta ação não poderá ser desfeita.</div>
        </div>
        <div class="btn-container grid" slot="footer">
            <ot-button
                :loading="loading"
                class="mb-5"
                block
                @click="actionDelete('close')"
                variant="ot-red"
            >Excluir</ot-button>
            <ot-button
                :disabled="loading"
                block
                @click="$emit('close')"
                variant="ot-blue-outline"
            >Cancelar</ot-button>
        </div>
    </ot-modal>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'deleteUser',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        userId: {
            type: Number,
            default: 0
        }
    },
    data: () => ({
        loading: false,
    }),
    methods: {
        ...mapActions('users', ['deleteUser']),
        ...mapActions('notification', ['showNotification']),
        async actionDelete () {
            this.loading = !this.loading;
            try {
                await this.deleteUser(this.userId);
                this.showNotification({ type: 'success', message: 'Usuário deletado com sucesso' });
            } catch (e) {
                this.showNotification({ type: 'error', message: 'erro ao deletar o usuário' });
            } finally {
                this.loading = !this.loading;
                this.$emit('reload-table');
                this.$emit('close');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container-box {
    padding: 35px;
    width: 400px;
    @apply flex flex-col justify-center items-center;
}
.btn-container {
    width: 100%;
}
.trash {
    font-size: 68px;
    color: #f7002a;
    padding: 8px;
    border: 2px #f7002a solid;
    border-radius: 65%;
}
.title {
    font-size: 20px;
    font-weight: bold;
}
.sub-title {
    font-size: 16px;
    color: #707070;
}
</style>