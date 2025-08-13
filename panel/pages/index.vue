<script setup lang="ts">
import { useUsersStore } from '~/stores/users'
import { usersService } from '~/services/users'
import type { User } from '~/interfaces'
import type { FilterParams } from '~/services/filters'
import type { WalletFormData } from '~/interfaces'
import { getItemsPerPage } from '~/utils/screen'

const usersStore = useUsersStore()

const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditModalOpen = ref(false)
const userToDelete = ref<User | null>(null)
const userToEdit = ref<User | null>(null)

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

const handleModalSubmit = async (data: WalletFormData) => {
	try {
		await usersStore.loadUsers(1);
	} catch (error) {
		console.error('Erro ao recarregar usuários:', error);
	}
}

const handleExportCSV = () => {
	usersService.exportToCSV(usersStore.allUsers)
}

const handleEdit = (item: User) => {
	userToEdit.value = item;
	isEditModalOpen.value = true;
}

const handleEditModalClose = () => {
	isEditModalOpen.value = false;
	userToEdit.value = null;
}

const handleEditSubmit = async (data: WalletFormData) => {
	try {
		await usersStore.loadUsers(usersStore.currentPage);
	} catch (error) {
		console.error('Erro ao recarregar usuários:', error);
	}
}

const handleDelete = (item: User) => {
	userToDelete.value = item;
	isDeleteModalOpen.value = true;
}

const handleDeleteModalClose = () => {
	isDeleteModalOpen.value = false;
	userToDelete.value = null;
}

const handleDeleteConfirm = async (user: User) => {
	try {
		await usersStore.loadUsers(usersStore.currentPage);
	} catch (error) {
		console.error('Erro ao recarregar usuários:', error);
	}
}

const handlePageChange = (page: number) => {
	usersStore.setCurrentPage(page)
}

const handleResize = async () => {
	const currentItemsPerPage = getItemsPerPage()
	if (currentItemsPerPage !== usersStore.itemsPerPage) {
		await usersStore.loadUsers(1)
	}
}

onMounted(() => {
	usersStore.loadUsers()
	window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
	window.removeEventListener('resize', handleResize)
})
</script>

<template>
	<div class="min-h-screen bg-gray-100 pt-20">
		<main class="container mx-auto px-4 py-4 sm:py-8">
			<div class="pb-6 sm:pb-8">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<h2 class="text-xl sm:text-2xl font-bold text-gray-900">BTC Carteiras</h2>

					<AppButton size="lg" @click="handleAddWallet" class="w-full sm:w-auto">
						Adicionar Carteira
					</AppButton>
				</div>
			</div>

			<div
				class="bg-white rounded-lg shadow-lg shadow-gray-200 p-4 sm:p-6 flex flex-col md:flex-row gap-4 mb-6">
				<div class="w-full flex flex-col md:flex-row gap-4">
					<AppInput v-model="searchForm.nome" label="Nome" class="w-full md:w-1/3"/>
					<AppInput v-model="searchForm.sobrenome" label="Sobrenome" class="w-full md:w-1/3"/>
					<AppInput v-model="searchForm.email" label="E-mail" type="email" class="w-full md:w-1/3"/>
				</div>

				<AppButton @click="handleSearch" class="flex items-center justify-center space-x-2 w-full md:w-[125px]" variant="outline">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
					<span>Buscar</span>
				</AppButton>
			</div>

			<div class="bg-white rounded-lg shadow-lg shadow-gray-200">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 sm:py-6 gap-4">
					<div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
						<h2 class="text-lg font-semibold text-gray-900">Carteiras</h2>
						<div v-if="usersStore.hasActiveFilters" class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
							<span class="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
								Filtros ativos
							</span>
							<button @click="handleClearFilters" class="text-sm text-red-600 hover:text-red-800 w-fit">
								Limpar
							</button>
						</div>
						<div v-if="usersStore.hasActiveFilters && usersStore.totalRecords > 0" class="text-sm text-gray-600">
							{{ usersStore.totalRecords }} resultado{{ usersStore.totalRecords !== 1 ? 's' : '' }} encontrado{{ usersStore.totalRecords !== 1 ? 's' : '' }}
						</div>
					</div>
					<AppButton variant="outline" size="lg" @click="handleExportCSV" class="w-full sm:w-auto">
						Exportar CSV
					</AppButton>
				</div>

				<div v-if="usersStore.loading" class="flex justify-center items-center py-8">
					<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
				</div>

				<DataTable class="px-4 sm:px-6" v-else :headers="tableHeaders" :data="usersStore.paginatedUsers" @edit="handleEdit" @delete="handleDelete" />

				<Pagination :current-page="usersStore.currentPage" :total-pages="usersStore.totalPages" :total-records="usersStore.totalRecords"
					:items-per-page="usersStore.itemsPerPage" @page-change="handlePageChange" />
			</div>
		</main>
		
		<ModalsAddWalletModal 
			:is-open="isModalOpen"
			@close="handleModalClose"
			@submit="handleModalSubmit"
		/>
		
		<ModalsDeleteWalletModal 
			:is-open="isDeleteModalOpen"
			:user="userToDelete"
			@close="handleDeleteModalClose"
			@confirm="handleDeleteConfirm"
		/>
		
		<ModalsEditWalletModal 
			:is-open="isEditModalOpen"
			:user="userToEdit"
			@close="handleEditModalClose"
			@submit="handleEditSubmit"
		/>
	</div>
</template>
