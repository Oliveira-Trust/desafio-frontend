<template>
    <div>
		<user-search-form />
		<user-search-table v-if="userCollection !== null" />
	</div>
</template>

<script>

import http from '@/http'
import UserSearchForm from '@/views/Home/components/UserSearchForm'
import UserSearchTable from '@/views/Home/components/UserSearchTable'
import { mapGetters } from 'vuex'

export default {
	components: {
		UserSearchForm,
		UserSearchTable,
	},
	computed: {
		...mapGetters({
			userCollection: 'users/userCollection'
		}) 
	},
}
</script>

<style>
</style>