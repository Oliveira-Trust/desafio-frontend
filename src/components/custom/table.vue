<template>
    <table class="fade">
        <thead>
            <tr class="tr-head">
                <th class="title" :key="index" v-for="(header, index) in headers">{{ header.label }}</th>
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
}
tr:nth-child(odd) {
    background: #fff;
}
.tr-head {
    color: #000;
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
