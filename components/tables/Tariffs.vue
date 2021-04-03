<template lang="pug">
.tariffs_table
	.card(
		v-for='(tariff, i) in tariffs'
		:key='i' )
		.card-content.is-paddingless
			TariffsView.is-marginless(
				:tariff='tariff'
				tag="router-link")
		.card-footer
			a.card-footer-item.has-text-danger( @click='remove(tariff.id)' ) Удалить
</template>

<script>
export default {
	name: "TariffsTable",
	props: ["tariffs"],
	methods: {
		remove(id) {
			this.$deleteTariff(id)
				.then(() => this.$emit('update'))
		}
	}
}
</script>

<style lang="scss" scoped>
.tariffs_table {
	@include _grid(3);
	.card {
		@include flex(center, space-between, column);
	}
}
// .box {
// 	&:not(:last-child) {
// 		margin-bottom: ;
// 	}
// }
</style>