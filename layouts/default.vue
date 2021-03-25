<template lang="pug">
	div#main.hero.is-fullheight
		Header#header.hero-head
		#wrap.hero-body
			Aside#aside
			.section
				nuxt
</template>

<script>
export default {
	name: 'DefaultLayout'
}
</script>

<style lang="scss" scoped>
#header {
	width: 100%;
	height: 3rem;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
}
#wrap {
	width: 100%;
	height: 100%;
	display: block;
	padding: {
		top: 3rem;
		left: 16rem;
		right: 0;
		bottom: 0;
	}
	position: relative;
	#aside {
		width: 16rem;
		height: 100%;
		padding-top: 3rem;
		background: #2e323a;
		position: fixed;
		top: 0;
		left: 0;
	}
	.section {
		width: 100%;
		padding: 3rem 1.5rem 1rem;
	}
}
</style>