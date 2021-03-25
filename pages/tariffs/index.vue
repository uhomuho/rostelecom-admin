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
				.tile.is-child.box.is-light
					TableTariffs(
						:tariffs='tariffs')
					//- pre {{ tariffs }}
</template>

<script>
export default {
	name: "Tariffs",
	async asyncData({ $getTariffs }) {
		let { tariffs } = await $getTariffs()

		return { tariffs }
	}
}
</script>