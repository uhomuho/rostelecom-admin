<template lang="pug">
#tariffs
	TopLine(
		title="Тарифы")
	.tile.is-ancestor
		.tile.is-vertical
			.tile.is-parent
				.tile.is-child.box
					nuxt-link.content(
						to="/tariffs/add")
						h4.is-marginless
							span Добавить тариф
							b-icon(
								icon="plus"
								size="is-small"
								type="is-primary")
			.tile.is-parent
				.tile.is-child.box.is-light( v-if='tariffs && tariffs.length > 0' )
					TableTariffs(
						:tariffs='tariffs'
						@update='get')
				.tile.is-child.box.is-info( v-else )
					.content
						h2.is-marginless.has-text-centered Тарифы не найдены
</template>

<script>
export default {
	name: "Tariffs",
	async asyncData({ $getTariffs }) {
		let { tariffs } = await $getTariffs()

		return { tariffs }
	},
	methods: {
		get() {
			this.$getTariffs()
				.then(({ tariffs }) => this.tariffs = tariffs)
		}
	}
}
</script>