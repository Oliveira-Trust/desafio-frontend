<template>
    <div>
        <table class="fade">
            <thead>
                <tr class="tr-head">
                    <th
                        class="title"
                        :key="index"
                        v-for="(header, index) in headers"
                    >{{ header.label }}</th>
                </tr>
            </thead>

            <tbody>
                <template v-if="rows.length > 0 && !loading">
                    <tr
                        class="fade"
                        :key="index"
                        v-for="(row, index) in rows"
                        @click="$emit('selectedRow', row)"
                    >
                        <template v-for="(col, index) in columns">
                            <td class="table-value" :key="index">
                                <template v-if="row[col]">{{ row[col] }}</template>
                                <slot v-else v-bind:item="row" :name="col"></slot>
                            </td>
                        </template>
                    </tr>
                </template>
                <template v-if="rows.length == 0">
                    <tr>
                        <td :colspan="columns.length" class="no-register">
                            <slot name="no-register">Nenhum registro foi encontrado</slot>
                        </td>
                    </tr>
                </template>
                <template v-if="loading">
                    <transition name="fade">
                        <tr>
                            <td :colspan="columns.length" class="loading-bottom">
                                <HalfCircleSpinner
                                    :animation-duration="1000"
                                    :size="80"
                                    color="#007BFF"
                                    class="mx-auto"
                                />
                            </td>
                        </tr>
                    </transition>
                </template>
            </tbody>
        </table>
        <div class="division">
            <div class="line"></div>
        </div>
        <div class="flex justify-between">
            <div class="registers">
                {{ totalOfItems }}
                Registro
                <span v-if="totalOfItems > 1">s</span>
            </div>
            <div class="flex">
                <span
                    @click="$emit('select-page', index)"
                    :class="{ 'card-index': true, active: index == activePage }"
                    v-for="index in pages"
                    :key="index"
                >{{ index }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners';
export default {
    components: {
        HalfCircleSpinner
    },
    name: "otTable",
    props: {
        headers: {
            default: () => [],
            type: Array,
        },
        items: {
            default: () => [],
            type: Array,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        totalOfItems: {
            type: Number,
            default: 0,
        },
        pages: {
            type: Number,
            default: 0,
        },
        activePage: {
            type: Number,
            default: 1,
        }
    },
    computed: {
        rows () {
            return this.items;
        },
        columns () {
            return this.headers.map(({ value }) => {
                return value;
            });
        },
    },
};
</script>

<style scoped>
table {
    border-collapse: collapse;
    @apply w-full;
}
tr:nth-child(even) {
    background: #f6f7fb;
    border-left: 3px solid #f6f7fb;
}
tr:nth-child(odd) {
    background: #fff;
    border-left: 3px solid #fff;
}
tr:hover {
    background: #fafdff;
    border-left: 3px solid #68c0f3;
}
.tr-head {
    color: #000;
}

.tr-head:hover {
    background: #fff !important;
    border-left: 3px solid #fff;
}
.tr-head .title {
    font-size: 13px;
    font-weight: bold;
    text-align: left;
    @apply p-6;
}
.table-value {
    border-top: 1px solid #dbdbdb;
    font-size: 13px;
    color: #707070;
    font-weight: 600;
    @apply p-6;
}

.no-register {
    @apply text-center p-6;
    border-top: 1px solid #dbdbdb;
    font-size: 13px;
    font-weight: bold;
    color: #a5a5a5;
}

.loading-bottom {
    @apply pt-14 text-center;
}

/* Load more */

.load-more {
    @apply pt-14 text-center cursor-pointer;
    color: #5eaeed;
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
}

.division {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
    margin-top: 25px;
}
.division .line {
    border-bottom: #dbdbdb 1px solid;
    width: 100%;
}

.registers {
    font-size: 14px;
    color: #707070;
    display: inherit;
}

.card-index {
    padding-inline: 8px;
    margin-inline: 5px;
    border: 1px #dbdbdb solid;
    border-radius: 4px;
    color: #3d3d3d;
    font-size: 14px;
    cursor: pointer;
}

.card-index:hover {
    background: #007bff;
    color: #fff;
}
.card-index.active {
    background: #007bff;
    color: #fff;
}

.fade {
    animation: fadein 1s;
}

@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
