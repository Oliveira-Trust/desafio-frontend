<template>
    <ot-modal :show="show">
        <div class="container-box" slot="body">
            <div class="flex-wrap">
                <font-awesome-icon
                    @click="openModalDeleteUser(item.id)"
                    class="trash"
                    icon="table"
                />
            </div>
            <div class="title flex-wrap">Exportar CSV</div>
        </div>
        <div class="btn-container grid" slot="footer">
            <ot-button
                class="mb-5"
                :disabled="loading"
                block
                @click="actionExport('all')"
            >Todos os Usuários</ot-button>
            <ot-button
                :disabled="loading"
                block
                @click="actionExport('table')"
                class="mb-5"
            >Usuários da Tabela atual</ot-button>
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
        ...mapActions('users', ['exportUserCsv']),
        ...mapActions('notification', ['showNotification']),
        async actionExport (type) {
            this.loading = !this.loading;
            try {
                await this.exportUserCsv(type);
                this.showNotification({ type: 'success', message: 'Planilha exportada com sucesso' });
            } catch (e) {
                this.showNotification({ type: 'error', message: 'erro ao exportar o csv' });
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
    color: green;
    padding: 8px;
    border: 2px green solid;
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