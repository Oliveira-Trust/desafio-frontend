<template>
	<main class="home-layout">
		<header-component />
		<content-component />
		<footer-component />
	</main>
</template>

<script>

import HeaderComponent from '@/layouts/HomeLayout/components/Header'
import ContentComponent from '@/layouts/HomeLayout/components/Content'
import FooterComponent from '@/layouts/HomeLayout/components/Footer'

export default {
	name: 'HomeLayout',
	components: {
		HeaderComponent,
		ContentComponent,
		FooterComponent,
	},
}
</script>

<style>

</style>