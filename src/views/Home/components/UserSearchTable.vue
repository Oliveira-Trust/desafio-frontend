<template>
    <div class="card card-body data-table">
        <h5>
            Resultado

            <el-button
                @click.prevent="exportCSV"
                class="float-right"
                type="info"
                >Exportar CSV</el-button
            >
        </h5>

        <div class="row mb-3">
            <div class="col-12 col-sm-8">
                <div class="row mb-2">
                    <div class="col-6 col-md-3">
                        <el-select
                            class="select-primary"
                            v-model="pagination.perPage"
                            placeholder="Por página"
                        >
                            <el-option
                                class="select-primary"
                                v-for="item in pagination.perPageOptions"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </div>

                    <div class="col-6 col-md-4">
                        <span class="text-default"
                            >Número de resultados por página</span
                        >
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-4">
                <el-input
                    placeholder="Filtrar dados..."
                    suffix-icon="el-icon-search"
                    v-model="searchQuery"
                    clearable
                >
                </el-input>
            </div>
        </div>

        <el-table stripe @sort-change="tableSort" :data="queriedData" border>
            <el-table-column
                :sort-method="(a, b) => 0"
                :sortable="'custom'"
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
            ></el-table-column>

            <!-- fixed="right" -->
            <el-table-column
                :min-width="130"
                class-name="td-actions"
                label="Ações"
                fixed="right"
            >
                <template slot-scope="props">
                    <el-button
                        @click.prevent="action('edit', props.row)"
                        type="info"
                        icon="el-icon-edit"
                        circle
                    ></el-button>
                    <el-button
                        @click.prevent="action('delete', props.row)"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="row mt-2 home-pagination">
            <div class="col-12 col-md-3">
                <p class="category">
                    Mostrando {{ from + 1 }} até {{ to }} de {{ total }}
                </p>
            </div>
            <div class="col-md-9">
                <pagination
                    type="primary"
                    class="float-right"
                    v-model="pagination.currentPage"
                    :per-page="pagination.perPage"
                    :total="pagination.total"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapActions, mapGetters } from 'vuex'
import http from '@/http'
import messages from '@/utils/messages'
import XLSX from 'xlsx'

export default {
    components: {
        Pagination,
    },
    data() {
        return {
            loading: false,
            pagination: {
                perPage: 5,
                currentPage: 1,
                perPageOptions: [5, 10, 20, 30],
                total: 0,
            },
            searchQuery: '',
            propsToSearch: ['nome', 'email', 'sobrenome'],
            tableColumns: [
                { prop: 'index', label: '#', minWidth: 90, sortable: false },
                { prop: 'nome', label: 'Nome', minWidth: 200, sortable: true },
                {
                    prop: 'sobrenome',
                    label: 'Sobrenome',
                    minWidth: 200,
                    sortable: true,
                },
                {
                    prop: 'email',
                    label: 'E-mail',
                    minWidth: 200,
                    sortable: true,
                },
                {
                    prop: 'bitcoin',
                    label: 'Bitcoin',
                    minWidth: 130,
                    sortable: true,
                },
            ],
            tableData: [],
        }
    },
    computed: {
        ...mapGetters({
            userCollection: 'users/userCollection',
        }),
        pagedData() {
            return this.tableData.slice(this.from, this.to)
        },
        queriedData() {
            if (!this.searchQuery) {
                this.pagination.total = this.tableData.length
                return this.pagedData
            }
            let result = this.tableData.filter((row) => {
                let isIncluded = false
                for (let key of this.propsToSearch) {
                    let rowValue = row[key].toString()
                    if (
                        rowValue.includes &&
                        rowValue.includes(this.searchQuery)
                    ) {
                        isIncluded = true
                    }
                }
                return isIncluded
            })
            this.pagination.total = result.length
            return result.slice(this.from, this.to)
        },
        to() {
            let highBound = this.from + this.pagination.perPage
            if (this.total < highBound) {
                highBound = this.total
            }
            return highBound
        },
        from() {
            return this.pagination.perPage * (this.pagination.currentPage - 1)
        },
        total() {
            this.pagination.total = this.tableData.length
            return this.tableData.length
        },
    },
    methods: {
        ...mapActions({
            setUser: 'users/setUser',
            setShowUserCreateForm: 'components/setShowUserCreateForm',
        }),
        action(action, row) {
            if (action === 'delete') {
                this.deleteData(row)
            }
            if (action === 'edit') {
                this.editData(row)
            }
        },
        editData(row) {
            this.setUser(row), this.setShowUserCreateForm(true)
        },
        async deleteData(row) {
            this.loading = true
            const { id } = row
            const { deleteUser } = http.users

            try {
                const req = await deleteUser(id)
                this.$emit('delete')
                this.$message({
                    message: messages.delete,
                    type: 'success',
                })
            } catch (error) {
                console.error(error)
            }

            this.loading = false
        },
        tableSort({ prop, order }) {
            this.globalSort(this.tableData, prop, order)
            this.pagination.currentPage = 1
        },
        exportCSV() {
            const { tableData: data } = this

            if (Array.isArray(data) && data.length > 0) {
                let headers = ['Nome', 'Sobrenome', 'E-mail']
                let table = []
                table.push(headers)
                data.map((item) =>
                    table.push([item.nome, item.sobrenome, item.email])
                )
                const ws = XLSX.utils.aoa_to_sheet(table)
                const wb = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(wb, ws, 'usuarios')
                XLSX.writeFile(wb, 'usuarios.csv')
            } else {
                this.$message({
                    message: 'Nenhum dado encontrado',
                    type: 'warning',
                })
            }
        },
        upCollection() {
            const { userCollection: collection } = this

            if (
                collection !== null &&
                collection !== '-' &&
                collection !== undefined
            ) {
                this.tableData = collection
            }
        },
    },
    mounted() {
        this.upCollection()
    },
}
</script>

<style>
</style>