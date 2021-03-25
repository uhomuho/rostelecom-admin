<template lang="pug">
#services
	TopLine(
		title="Услуги")
	.tile.is-ancestor
		.tile.is-vertical
			.tile.is-parent
				.tile.is-child.box
					AddService(
						@added='getServices')
			.tile.is-parent
				.tile.is-child.box
					.content
						h4 Фильтр
			.tile.is-parent
				.tile.is-child.box(
					v-if='services && services.length > 0')
					TableServices(
						:services='services'
						@updateServices='getServices')
				.tile.is-child.box.is-info(
					v-else)
					.content
						h2.is-marginless.has-text-centered Услуги не найдены
</template>

<script>
export default {
	name: "Services",
	async asyncData({ $getServices }) {
		let { services } = await $getServices()
		return { services }
	},
	methods: {
		getServices() {
			this.$getServices()
				.then(({ services }) => this.services = services)
		}
	}
}
</script>