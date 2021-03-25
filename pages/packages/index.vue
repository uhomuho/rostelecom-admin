<template lang="pug">
#tariffs_packages
	TopLine(
		title="Пакеты")
	.tile.is-ancestor
		.tile.is-vertical
			.tile.is-parent
				.tile.is-child.box
					nuxt-link.content(
						to="/packages/create")
						h4.is-marginless
							span Создать пакет
							b-icon(
								icon="plus"
								size="is-small"
								type="is-primary")
			.tile.is-parent
				.tile.is-child.box
					TablePackages(
						:packages='packages')
</template>

<script>
export default {
	name: "TariffsPackages",
	async asyncData({ $getPackages }) {
		let { packages } = await $getPackages()

		return { packages }
	}
}
</script>