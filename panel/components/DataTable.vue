<script setup lang="ts">
import type { TableHeader, TableData } from '~/interfaces'

const props = defineProps<{
	headers: TableHeader[]
	data: TableData[]
}>()

const emit = defineEmits<{
	edit: [item: TableData]
	delete: [item: TableData]
}>()

const handleEdit = (item: TableData) => {
	emit('edit', item)
}

const handleDelete = (item: TableData) => {
	emit('delete', item)
}
</script>

<template>
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr class="border-b-2 border-gray-200">
					<th v-for="header in headers" :key="header.key"
						class="text-left py-3 px-4 font-medium text-gray-900">
						{{ header.label }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in data" :key="index" :class="[
					'border-l-2 border-transparent hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200',
					index % 2 === 1 ? 'bg-gray-50' : ''
				]">
					<td v-for="header in headers" :key="header.key" class="p-4 text-gray-900">
						<div v-if="header.key === 'actions'" class="flex items-center space-x-2">
							<AppTooltip text="Editar" position="bottom" :delay="100">
								<button @click="handleEdit(item)" class="text-blue-600 hover:text-blue-800">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
										</path>
									</svg>
								</button>
							</AppTooltip>
							<AppTooltip text="Excluir" position="bottom" variant="dark" :delay="100">
								<button @click="handleDelete(item)" class="text-red-600 hover:text-red-800">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
										</path>
									</svg>
								</button>
							</AppTooltip>
						</div>
						<span v-else-if="header.key === 'valor_carteira'">{{ item[header.key].toFixed(8) }}</span>
						<span v-else>{{ item[header.key] }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
