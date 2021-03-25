<template lang="pug">
.table_packages
	b-table(
		:data='packages'
		detailed
		detail-key="id")
		b-table-column(
			field="id"
			label="ID"
			v-slot="props")
			p {{ props.row.id }}
		b-table-column(
			field="name"
			label="Название"
			v-slot="props")
			p {{ props.row.name }}
		template(
			#detail="props")
			.tariffs
				TariffsView.tariff(
					v-for='(tariff, i) in props.row.tariffs'
					:key='i'
					:tariff='tariff')
</template>

<script>
export default {
	name: "TablePackages",
	props: ['packages']
}
</script>