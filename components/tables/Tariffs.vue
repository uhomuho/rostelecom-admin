<template lang="pug">
.tariffs_table
	TariffsView.is-marginless(
		v-for='(tariff, i) in tariffs'
		:key='i'
		:tariff='tariff'
		tag="router-link")
</template>

<script>
export default {
	name: "TariffsTable",
	props: ["tariffs"]
}
</script>

<style lang="scss" scoped>
.tariffs_table {
	@include _grid(3);
}
// .box {
// 	&:not(:last-child) {
// 		margin-bottom: ;
// 	}
// }
</style>