<script setup lang="ts">
import type { TableHeader, TableData } from '~/interfaces';

const props = defineProps<{
	headers: TableHeader[]
	data: TableData[]
}>();

const emit = defineEmits<{
	edit: [item: TableData]
	delete: [item: TableData]
}>();

const handleEdit = (item: TableData) => {
	emit('edit', item);
};

const handleDelete = (item: TableData) => {
	emit('delete', item);
};

const formatValue = (value: any, key: string) => {
	if (value === null || value === undefined) return '-';
	
	if (key === 'valor_carteira') {
		if (typeof value === 'number') {
			return value.toFixed(7).replace(/\.?0+$/, '').replace('.', ',');
		}
		return '0';
	}
	
	return value;
};

const getDisplayHeaders = () => {
	return props.headers.filter(header => header.key !== 'actions');
};
</script>

<template>
	<div>
		<div v-if="!data || data.length === 0" class="text-center py-8 text-gray-500">
			Nenhum registro encontrado
		</div>
		
		<div v-else>
			<div class="hidden sm:block overflow-x-auto">
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
							<td v-for="header in headers" :key="header.key" class="text-sm p-4 text-gray-900">
								<div v-if="header.key === 'actions'" class="flex items-center space-x-4">
									<AppTooltip text="Editar" position="bottom" :delay="100">
										<button @click="handleEdit(item)" class="text-gray-600 hover:text-blue-800">
											<IconPencil />
										</button>
									</AppTooltip>
									<AppTooltip text="Excluir" position="bottom" variant="dark" :delay="100">
										<button @click="handleDelete(item)" class="text-gray-600 hover:text-red-800">
											<IconDelete />
										</button>
									</AppTooltip>
								</div>
								<span v-else>{{ formatValue(item[header.key], header.key) }}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="sm:hidden space-y-4">
				<div v-for="(item, index) in data" :key="index" 
					class="bg-gray-50 rounded-lg p-4 border border-gray-200">
					<div class="space-y-3">
						<div v-for="header in getDisplayHeaders()" :key="header.key" class="flex justify-between items-center">
							<span class="text-sm font-medium text-gray-600">{{ header.label }}:</span>
							<span class="text-sm text-gray-900">{{ formatValue(item[header.key], header.key) }}</span>
						</div>
						<div class="flex items-center justify-end space-x-4 pt-2 border-t border-gray-200">
							<AppTooltip text="Editar" position="bottom" :delay="100">
								<button @click="handleEdit(item)" class="text-gray-600 hover:text-blue-800 p-2">
									<IconPencil />
								</button>
							</AppTooltip>
							<AppTooltip text="Excluir" position="bottom" variant="dark" :delay="100">
								<button @click="handleDelete(item)" class="text-gray-600 hover:text-red-800 p-2">
									<IconDelete />
								</button>
							</AppTooltip>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
