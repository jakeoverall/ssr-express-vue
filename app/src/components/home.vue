<template>
	<div id="home">
		<main-layout>
			<h1>THE HOME</h1>
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
			}
		},
		mounted() {
			$store.hydrate(this)
		}
	}
</script>