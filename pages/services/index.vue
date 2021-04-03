<template lang="pug">
#services
	TopLine(
		title="Услуги")
	.tile.is-ancestor
		.tile.is-vertical
			.tile.is-parent
				.tile.is-child.box
					AddService(
						v-if='channels'
						@update='getServices'
						:types='types'
						:channels='channels')
			.tile.is-parent
				.tile.is-child.box
					.content
						h4 Фильтр
			.tile.is-parent
				.tile.is-child.box(
					v-if='services && services.length > 0')
					TableServices(
						:services='services'
						:types='compTypes'
						@updateServices='getServices')
				.tile.is-child.box.is-info(
					v-else)
					.content
						h2.is-marginless.has-text-centered Услуги не найдены
</template>

<script>
export default {
	name: "Services",
	async asyncData({ $getServices, $getSTypes, $getChannels }) {
		let { services } = await $getServices(),
				{ types } = await $getSTypes(),
				{ channels } = await $getChannels()

		return { services, types, channels }
	},
	computed: {
		compTypes() {
			let result = {},
					types = this.types
			if (types) {
				for (let type of types) {
					result[type.id] = type
				}
			}
			return result
		}
	},
	methods: {
		getServices() {
			this.$getServices()
				.then(({ services }) => this.services = services)
		}
	}
}
</script>