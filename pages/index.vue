<template lang="pug">
	#wrapper.centered.fullheight
		Auth
</template>

<script>
export default {
	name: 'HomePage',
	asyncData({ redirect }) {
		redirect(302, '/services')
	}
}
</script>
