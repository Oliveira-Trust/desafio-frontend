<script setup lang="ts">
const props = defineProps<{
	currentPage: number
	totalPages: number
	totalRecords: number
	itemsPerPage?: number
}>();

const emit = defineEmits<{
	'page-change': [page: number]
}>();

const handlePageChange = (page: number) => {
	if (page >= 1 && page <= props.totalPages) {
		emit('page-change', page)
	}
};

const getVisiblePages = () => {
	const pages = [];
	const maxVisible = 5;

	if (props.totalPages <= maxVisible) {
		for (let i = 1; i <= props.totalPages; i++) {
			pages.push(i);
		}
	} else {
		let start = Math.max(1, props.currentPage - 2);
		let end = Math.min(props.totalPages, start + maxVisible - 1);

		if (end - start < maxVisible - 1) {
			start = Math.max(1, end - maxVisible + 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
	}

	return pages;
};

const getPageInfo = () => {
	const itemsPerPage = props.itemsPerPage || 30;
	const start = (props.currentPage - 1) * itemsPerPage + 1;
	const end = Math.min(props.currentPage * itemsPerPage, props.totalRecords);

	return {
		start,
		end,
		total: props.totalRecords
	};
};
</script>

<template>
	<div class="flex items-center justify-between mt-6 border-t border-gray-200 py-6 px-6">
		<div class="text-sm text-gray-400">
			{{ getPageInfo().end }} registro(s)
		</div>
		<div class="flex items-center space-x-2">
			<button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1"
				class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
			</button>

			<button v-for="page in getVisiblePages()" :key="page" @click="handlePageChange(page)" :class="[
				'w-7 h-7 flex items-center justify-center rounded-lg text-xs py-4',
				page === currentPage
					? 'bg-blue-600 text-white'
					: 'text-gray-600 hover:text-gray-900 border border-gray-200'
			]">
				{{ page }}
			</button>

			<button @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages"
				class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</button>
		</div>
	</div>
</template>
