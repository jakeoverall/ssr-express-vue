<template>
	<div id="app">
		<navbar :user="user"></navbar>
		<div class="component-mount">
			<slot ref="slotcomponent"></slot>
		</div>
		<footer-comp></footer-comp>
	</div>
</template>

<script>
	import navbar from './navbar.vue'
	import footerComp from './footer.vue'
	export default {
		name: 'main-layout',
		components: { navbar, footerComp },
		data() {
			return {
				user: {}
			}
		},
		mounted() {
			$store.on('user', u => {
				this.user = u
			})
		}
	}
</script>