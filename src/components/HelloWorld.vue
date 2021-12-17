<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<div>
			<ot-input v-model="email" :rules="rules" placeholder-text="E-mail" />
			<ot-button @click="modal = true">Enviar</ot-button>
			<ot-modal @close="modal = false" :show="modal">
				<div class="modalzin" slot="body">
					<div>
						<ot-input></ot-input>
					</div>
					<div>naruto</div>
					<div>naruto</div>
					<div>naruto</div>
					<div>naruto</div>
					<div>naruto</div>
					<div>naruto</div>
					<div>naruto</div>
					<div>naruto</div>
					<div>naruto</div>
					<div>naruto</div>
					<div>naruto</div>
				</div>
			</ot-modal>
			<ot-table
				:headers="headers"
				:items="users.results"
				:totalOfItems="users.total"
				:pages="users.count"
				:loading="loading"
				@select-page="users.activePage = $event"
				:activePage="users.activePage"
			/>
		</div>
	</div>
</template>

<script>
import { getUsersList } from "@/services"
export default {
	name: 'HelloWorld',
	data: () => ({
		rules: {
			type: 'email',
			required: true,
			name: 'E-mail'
		},
		headers: [
			{
				value: 'nome',
				label: 'Nome'
			},
			{
				value: 'sobrenome',
				label: 'Sobrenome'
			},
			{
				value: 'email',
				label: 'E-mail'
			},
			{
				value: 'valorCarteira',
				label: 'Bitcoin'
			},
		],
		users: {
			results: [],
			count: 0,
			total: 0,
			activePage: 1

		},
		email: '',
		modal: false,
		loading: false,
	}),
	props: {
		msg: String
	},
	async created () {
		this.loading = !this.loading;
		const { results, count, total } = await getUsersList('?_page=1')
		this.users = { ...this.users, results, count, total };
		this.loading = !this.loading;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
