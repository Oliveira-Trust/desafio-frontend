<template>
    <div class="card card-body data-table">
        <h5>
            Resultado
            <button @click.prevent="exportCSV" class="btn btn-default">
                Exportar CSV
            </button>
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
                        icon="el-icon-search"
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
import { mapGetters } from 'vuex'

export default {
    components: {
        Pagination,
    },
    data() {
        return {
            pagination: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [5, 10, 20, 30],
                total: 0,
            },
            searchQuery: '',
            propsToSearch: ['nome', 'email', 'sobrenome'],
            tableColumns: [
                { prop: 'index', label: '#', minWidth: 90, sortable: false },
                { prop: 'nome', label: 'Nome', minWidth: 200, sortable: true },
                { prop: 'sobrenome', label: 'Sobrenome', minWidth: 200, sortable: true },
                { prop: 'email', label: 'E-mail', minWidth: 200, sortable: true },
                { prop: 'bitcoin', label: 'Bitcoin', minWidth: 130, sortable: true },
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
        action(action, row) {
            console.log(action, row)
        },
        tableSort({ prop, order }) {
            // this.globalSort(this.tableData, prop, order)
            this.pagination.currentPage = 1
        },
        exportCSV() {
            console.log('export csv')
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