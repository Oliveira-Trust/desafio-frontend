<script setup lang="ts">
import { useUsersStore } from '~/stores/users'
import { usersService } from '~/services/users'
import type { User } from '~/interfaces'
import type { FilterParams } from '~/services/filters'
import type { WalletFormData } from '~/interfaces'

const usersStore = useUsersStore()

const isModalOpen = ref(false)

const searchForm = ref<FilterParams>({
	nome: '',
	sobrenome: '',
	email: ''
})

const tableHeaders = [
	{ key: 'nome', label: 'Nome' },
	{ key: 'sobrenome', label: 'Sobrenome' },
	{ key: 'email', label: 'Email' },
	{ key: 'valor_carteira', label: 'Bitcoin' },
	{ key: 'actions', label: '' }
]

const handleSearch = async () => {
	try {
		await usersStore.searchUsers(searchForm.value)
	} catch (error) {
		console.error('Erro na busca:', error)
	}
}

const handleClearFilters = async () => {
	try {
		await usersStore.clearFilters()
		searchForm.value = {
			nome: '',
			sobrenome: '',
			email: ''
		}
	} catch (error) {
		console.error('Erro ao limpar filtros:', error)
	}
}

const handleAddWallet = () => {
	isModalOpen.value = true
}

const handleModalClose = () => {
	isModalOpen.value = false
}

const handleModalSubmit = (data: WalletFormData) => {
	console.log('Dados da carteira:', data)
}

const handleExportCSV = () => {
	usersService.exportToCSV(usersStore.allUsers)
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
				<div class="flex items-center justify-between px-6 py-6">
					<div class="flex items-center space-x-4">
						<h2 class="text-lg font-semibold text-gray-900">Carteiras</h2>
						<div v-if="usersStore.hasActiveFilters" class="flex items-center space-x-2">
							<span class="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
								Filtros ativos
							</span>
							<button @click="handleClearFilters" class="text-sm text-red-600 hover:text-red-800">
								Limpar
							</button>
						</div>
					</div>
					<AppButton variant="outline" @click="handleExportCSV">
						Exportar CSV
					</AppButton>
				</div>

				<div v-if="usersStore.loading" class="flex justify-center items-center py-8">
					<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
				</div>

				<DataTable class="px-6" v-else :headers="tableHeaders" :data="usersStore.paginatedUsers" @edit="handleEdit" @delete="handleDelete" />

				<Pagination :current-page="usersStore.currentPage" :total-pages="usersStore.totalPages" :total-records="usersStore.totalRecords"
					:items-per-page="usersStore.itemsPerPage" @page-change="handlePageChange" />
			</div>
		</main>
		
		<ModalsAddWalletModal 
			:is-open="isModalOpen"
			@close="handleModalClose"
			@submit="handleModalSubmit"
		/>
	</div>
</template>
