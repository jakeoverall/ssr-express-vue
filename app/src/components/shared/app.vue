<template>
	<div id="app">
		<navbar :user="user"></navbar>
		<div class="component-mount">
			<slot ref="slotcomponent"></slot>
		</div>
		<div>FOOTER {{user.name}}</div>
	</div>
</template>

<script>
	import navbar from './navbar.vue'
	export default {
		name: 'main-layout',
		components: { navbar },
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