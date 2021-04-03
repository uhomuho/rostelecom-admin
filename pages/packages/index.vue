<template lang="pug">
#tariffs_packages
	TopLine(
		title="Группы тарифов")
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
				.tile.is-child.box( v-if='packages && packages.length > 0' )
					TablePackages(
						:packages='packages'
						@update='getPackages')
				.tile.is-child.box.is-info( v-else )
					.content
						h2.is-marginless.has-text-centered Типы тарифов не найдены
</template>

<script>
export default {
	name: "TariffsPackages",
	async asyncData({ $getPackages }) {
		let { packages } = await $getPackages()

		return { packages }
	},
	methods: {
		getPackages() {
			this.$getPackages()
		}
	}
}
</script>