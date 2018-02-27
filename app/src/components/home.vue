<template>
	<div id="home">
		<main-layout>
			<h1>THE HOME </h1>
			<ul>
				<li v-for="(prop, val) in user">{{prop}}: {{user[prop]}}</li>
			</ul>
		</main-layout>
	</div>
</template>

<script>
	import mainLayout from './shared/app.vue'
	export default {
		name: 'home',
		components: { mainLayout },
		data() {
			return {
				user: {}
			}
		},
		mounted() {
			$store.hydrate(this)
		}
	}
</script>