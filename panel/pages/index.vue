<script setup lang="ts">
const searchForm = ref({
	nome: '',
	sobrenome: '',
	email: ''
})

const currentPage = ref(1)
const totalRecords = 30
const totalPages = 3

const tableHeaders = [
	{ key: 'nome', label: 'Nome' },
	{ key: 'sobrenome', label: 'Sobrenome' },
	{ key: 'email', label: 'Email' },
	{ key: 'bitcoin', label: 'Bitcoin' },
	{ key: 'actions', label: '' }
]

const tableData = ref([
	{ nome: 'Alfreds', sobrenome: 'Futterkiste', email: 'email@email.com', bitcoin: '0,008000' },
	{ nome: 'Alfreds', sobrenome: 'Futterkiste', email: 'email@email.com', bitcoin: '0,008000' },
	{ nome: 'Alfreds', sobrenome: 'Futterkiste', email: 'email@email.com', bitcoin: '0,008000' },
	{ nome: 'Alfreds', sobrenome: 'Futterkiste', email: 'email@email.com', bitcoin: '0,008000' },
	{ nome: 'Alfreds', sobrenome: 'Futterkiste', email: 'email@email.com', bitcoin: '0,008000' },
	{ nome: 'Alfreds', sobrenome: 'Futterkiste', email: 'email@email.com', bitcoin: '0,008000' },
	{ nome: 'Alfreds', sobrenome: 'Futterkiste', email: 'email@email.com', bitcoin: '0,008000' },
	{ nome: 'Alfreds', sobrenome: 'Futterkiste', email: 'email@email.com', bitcoin: '0,008000' },
	{ nome: 'Alfreds', sobrenome: 'Futterkiste', email: 'email@email.com', bitcoin: '0,008000' },
	{ nome: 'Alfreds', sobrenome: 'Futterkiste', email: 'email@email.com', bitcoin: '0,008000' }
])

const handleSearch = () => {
	console.log('Buscar:', searchForm.value)
}

const handleAddWallet = () => {
	console.log('Adicionar carteira')
}

const handleExportCSV = () => {
	console.log('Exportar CSV')
}

const handleEdit = (item: any) => {
	console.log('Editar:', item)
}

const handleDelete = (item: any) => {
	console.log('Deletar:', item)
}

const handlePageChange = (page: number) => {
	currentPage.value = page
	console.log('Página:', page)
}
</script>

<template>
	<div class="min-h-screen bg-gray-50 pt-20">
		<main class="container mx-auto px-4 py-8">
			<div class="bg-white rounded-lg shadow-sm border border-gray-200">
				<div class="p-6 border-b border-gray-200">
					<div class="flex items-center justify-between">
						<h1 class="text-2xl font-bold text-gray-900">BTC Carteiras</h1>
						<AppButton @click="handleAddWallet">
							Adicionar Carteira
						</AppButton>
					</div>
				</div>

				<div class="p-6">
					<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
						<AppInput v-model="searchForm.nome" label="Nome" />
						<AppInput v-model="searchForm.sobrenome" label="Sobrenome" />
						<AppInput v-model="searchForm.email" label="E-mail" type="email" />
						<AppButton @click="handleSearch" class="flex items-center justify-center space-x-2">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							</svg>
							<span>Buscar</span>
						</AppButton>
					</div>

					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-semibold text-gray-900">Carteiras</h2>
						<AppButton variant="outline" @click="handleExportCSV">
							Exportar CSV
						</AppButton>
					</div>

					<DataTable :headers="tableHeaders" :data="tableData" @edit="handleEdit" @delete="handleDelete" />

					<Pagination :current-page="currentPage" :total-pages="totalPages" :total-records="totalRecords"
						@page-change="handlePageChange" />
				</div>
			</div>
		</main>
	</div>
</template>
