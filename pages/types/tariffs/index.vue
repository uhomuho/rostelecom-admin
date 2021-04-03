<template lang="pug">
#tariffs_types
	TopLine( title="Типы тарифов" )
	.tile.is-ancestor
		.tile.is-vertical
			.tile.is-parent
				.tile.is-child.box
					AddTariffType(
						@update='getTTypes')
			.tile.is-parent
				.tile.is-child.box( v-if='types && types.length > 0' )
					TableTariffsTypes(
						:types='types'
						@update='getTTypes')
				.tile.is-child.box.is-info( v-else )
					.content
						h2.is-marginless.has-text-centered Типы тарифов не найдены
</template>

<script>
export default {
	name: "TariffsTypes",
	async asyncData({ $getTTypes }) {
		let { types } = await $getTTypes()
		return { types }
	},
	methods: {
		getTTypes() {
			this.$getTTypes()
				.then(({ types }) => this.types = types)
		}
	}
}
</script>