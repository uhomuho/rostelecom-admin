<template lang="pug">
#services_types
	TopLine( title="Типы услуг" )
	.tile.is-ancestor
		.tile.is-vertical
			.tile.is-parent
				.tile.is-child.box
					AddServiceType(
						@update='getSTypes')
			.tile.is-parent
				.tile.is-child.box( v-if='types && types.length > 0' )
					TableServicesTypes( 
						:types='types'
						@update='getSTypes' )
				.tile.is-child.box.is-info( v-else )
					.content
						h2.is-marginless.has-text-centered Типы услуг не найдены
</template>

<script>
export default {
	name: "ServicesTypes",
	async asyncData({ $getSTypes }) {
		let { types } = await $getSTypes()

		return { types }
	},
	methods: {
		getSTypes() {
			this.$getSTypes()
				.then(({ types }) => this.types = types)
		}
	}
}
</script>