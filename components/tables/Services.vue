<template lang="pug">
.services_table(v-if='services')
	b-table(
		:data='services'
		detailed
		detail-key="id"
		@details-open="row => $router.push(`/services/${row.id}`)")
		b-table-column(
			field="type"
			label="Тип услуги"
			v-slot='props')
			p {{ props.row.type !== 5 ? $getType(props.row.type) : props.row.customType }}
		b-table-column(
			field="icon"
			label="Иконка"
			v-slot='props')
			img( 
				v-if='props.row.icon'
				:src='props.row.icon' )
		b-table-column(
			field="name"
			label="Название"
			v-slot='props')
			p 
				|{{ props.row.name }}
				br
				|{{ props.row.value }}
		b-table-column(
			field="price"
			label="Цена"
			v-slot='props')
			p(v-if='props.row.price && props.row.units')
				|{{ props.row.price }} {{ props.row.units }}
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
				@close="deleteService(props.row.id)")
				|Удалить
</template>

<script>
export default {
	name: "ServicesTable",
	props: {
		services: {
			type: Array,
			default: null
		}
	},
	methods: {
		deleteService(id) {
			this.$deleteService(id)
				.then(() => this.$emit('updateServices'))
		}
	}
}
</script>