<template>
	<div id="navbar">
		I AM THE NAVBAR {{user.name}}
	</div>
</template>

<script>
	export default {
		name: 'navbar',
		props: {
			user: {
				type: Object
			}
		}
	}
</script>