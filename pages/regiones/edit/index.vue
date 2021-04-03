<template lang="pug">
#edit
</template>

<script>
export default {
	name: "Edit",
	asyncData({ redirect }) {
		redirect(301, "/regiones")
	}
}
</script>