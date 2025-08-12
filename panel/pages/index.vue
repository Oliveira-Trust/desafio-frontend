<script setup lang="ts">
import { useUsersStore } from '~/stores/users'
import type { User } from '~/interfaces'

const usersStore = useUsersStore()

const searchForm = ref({
	nome: '',
	sobrenome: '',
	email: ''
})

const tableHeaders = [
	{ key: 'nome', label: 'Nome' },
	{ key: 'sobrenome', label: 'Sobrenome' },
	{ key: 'email', label: 'Email' },
	{ key: 'valor_carteira', label: 'Valor Carteira' },
	{ key: 'actions', label: '' }
]

const handleSearch = async () => {
	try {
		await usersStore.searchUsers({
			nome: searchForm.value.nome || undefined,
			sobrenome: searchForm.value.sobrenome || undefined,
			email: searchForm.value.email || undefined
		})
	} catch (error) {
		console.error('Erro na busca:', error)
	}
}

const handleAddWallet = () => {
	// Implementar adicionar carteira
}

const handleExportCSV = () => {
	// Implementar exportar CSV
}

const handleEdit = (item: User) => {
	// Implementar editar usuário
}

const handleDelete = (item: User) => {
	// Implementar deletar usuário
}

const handlePageChange = (page: number) => {
	usersStore.setCurrentPage(page)
}

onMounted(() => {
	usersStore.loadUsers()
})
</script>

<template>
	<div class="min-h-screen bg-gray-100 pt-20">
		<main class="container mx-auto px-4 py-8">
			<div class="pb-8">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-bold text-gray-900">BTC Carteiras</h2>

					<AppButton @click="handleAddWallet">
						Adicionar Carteira
					</AppButton>
				</div>
			</div>

			<div
				class="bg-white rounded-lg shadow-lg shadow-gray-200 p-6 flex flex-col md:flex-row gap-4 mb-6">
				<div class="w-full flex flex-row gap-4">
					<AppInput v-model="searchForm.nome" label="Nome" class="w-1/3"/>
					<AppInput v-model="searchForm.sobrenome" label="Sobrenome" class="w-1/3"/>
					<AppInput v-model="searchForm.email" label="E-mail" type="email" class="w-1/3"/>
				</div>
				<AppButton @click="handleSearch" class="flex items-center justify-center space-x-2 w-1/6" variant="outline">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
					<span>Buscar</span>
				</AppButton>
			</div>

			<div class="bg-white rounded-lg shadow-lg shadow-gray-200">
				<div class="p-6">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-semibold text-gray-900">Carteiras</h2>
						<AppButton variant="outline" @click="handleExportCSV">
							Exportar CSV
						</AppButton>
					</div>

					<div v-if="usersStore.loading" class="flex justify-center items-center py-8">
						<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
					</div>
					<DataTable v-else :headers="tableHeaders" :data="usersStore.paginatedUsers" @edit="handleEdit" @delete="handleDelete" />

					<Pagination :current-page="usersStore.currentPage" :total-pages="usersStore.totalPages" :total-records="usersStore.currentPageRecordsCount"
						@page-change="handlePageChange" />
				</div>
			</div>
		</main>
	</div>
</template>
