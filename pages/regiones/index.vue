<template lang="pug">
	#regiones
		TopLine(
			title="Все регионы")
		.tile.is-ancestor
			.tile.is-vertical
				.tile.is-parent
					.tile.is-child.box
						AddCity(
							@added='getAreas')
				.tile.is-parent
					.tile.is-child.box
						TableAreas(
							:areas='areas'
							:loading='loading'
							:sticky='true'
							:nestedAreas='nestedAreas'
							@getDistricts='getDistricts')
</template>

<script>
export default {
	name: "Regiones",
	data() {
		return {
			loading: false,
			nestedAreas: []
		}
	},
	async asyncData({ $getAreas }) {
		let { areas } = await $getAreas()
		return { areas }
	},
	methods: {
		getAreas() {
			this.loading = true
			this.$getAreas()
				.then(({ areas }) => {
					this.loading = false
					this.areas = areas
				})
				.catch(() => this.loading = false)
		},
		getDistricts({ query, id }) {
			this.$getAreas(query)
				.then(({ areas }) => {
					this.$set(this.nestedAreas, id, areas)
				})
		}
	}
}
</script>