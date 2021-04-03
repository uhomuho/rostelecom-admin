<template lang="pug">
b-table(
	:data='types')
	b-table-column(
		field="id"
		label="Номер"
		v-slot='props')
		| {{ props.row.id }}
	b-table-column(
		field="icon"
		label="Иконка"
		v-slot='props')
		img( :src='props.row.icon' )
	b-table-column(
		field="name"
		label="Название"
		v-slot='props')
		| {{ props.row.name }}
	b-table-column(
		v-slot='props')
		b-tag(
			type="is-primary"
			close-type='is-dark'
			close-icon-type='is-danger'
			attached
			closable
			close-icon='trash'
			aria-close-label="Close tag"
			@close="remove(props.row.id)")
			|Удалить
	b-table-column(
		v-slot='props')
		b-tag(
			type="is-primary"
			close-type='is-dark'
			close-icon-type='is-warning'
			attached
			closable
			close-icon='pen'
			aria-close-label="Close tag")
			|Редактировать
</template>

<script>
export default {
	name: "ServicesTypes",
	props: ['types'],
	methods: {
		remove(id) {
			this.$removeSType(id)
				.then(() => this.$emit('update'))
		}
	}
}
</script>