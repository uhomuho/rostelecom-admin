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
		b-table-column(
			field="remove"
			v-slot='props')
			b-tag(
				type="is-primary"
				close-type='is-dark'
				close-icon-type='is-danger'
				attached
				closable
				close-icon='trash'
				aria-close-label="Close tag"
				@close="removePackage(props.row.id)") Удалить
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
	props: ['packages'],
	methods: {
		removePackage(id) {
			this.$removePackage(id)
				.then(() => this.$emit('update'))
		}
	}
}
</script>