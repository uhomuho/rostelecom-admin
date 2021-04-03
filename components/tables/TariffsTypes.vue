<template lang="pug">
b-table(
	:data='types'
	detailed)
	b-table-column(
		field="id"
		label="Номер"
		v-slot='props')
		p {{ props.row.id }}
	b-table-column(
		field="name"
		label="Название"
		v-slot='props')
		p {{ props.row.name }}
	b-table-column(
		field="delete"
		v-slot='props')
		b-tag(
			type="is-primary"
			close-type='is-dark'
			close-icon-type='is-danger'
			attached
			closable
			close-icon='trash'
			aria-close-label="Close tag"
			@close="removeTType(props.row.id)")
			|Удалить
	template( #detail='props' )
		ol.s_types
			li.s_type.media( v-for='({ name, icon }, i) in props.row.servicesTypes' :key='`${i-1}.`' :data-number='i+1' )
				.media-left
					img( :src='icon' )
				.media-content
					p {{ name }}
</template>

<script>
export default {
	name: "TariffsTypesTable",
	props: ['types'],
	methods: {
		removeTType(id) {
			this.$removeTType(id)
				.then(() => this.$emit('update'))
		}
	}
}
</script>