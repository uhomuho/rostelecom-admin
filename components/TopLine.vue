<template lang="pug">
	#top_line
		h1 {{ title }}
</template>

<script>
export default {
	name: "TopLine",
	props: ['title']
}
</script>

<style lang="scss" scoped>
#top_line {
	width: calc(100% + #{$section-paddding-horizontal * 2});
	padding: 1rem 1.75rem;
	margin: {
		left: -1.5rem;
		bottom: 3rem;
	}
	background: #fff;
	h1 {
		font-size: 2.5rem;
		font-weight: bold;
	}
}
</style>