<template lang="pug">
.services_table(v-if='services')
	b-table(
		v-if='types'
		:data='services'
		detailed
		detail-key="id")
		b-table-column(
			field="type"
			label="Тип услуги"
			v-slot='props')
			p {{ types[props.row.type].name }}
		b-table-column(
			field="icon"
			label="Иконка"
			v-slot='props')
			img( :src='types[props.row.type].icon' )
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
		template( #detail='props' )
			table.table( v-if='props.row.connectionType' )
				tbody
					tr
						td Тип подключения
						td {{ props.row.connectionType }}
			b-collapse.card(
				animation="slide"
				aria-id="collapse"
				v-if='Object.keys(channels(props.row.channels)).length > 0'
				v-for='(type, i) of channels(props.row.channels)'
				:key='i'
				:open='isOpen == i'
				@open='isOpen = i')
				template( #trigger='props' )
					.card-header(
						role="button"
						aria-controls="collapse")
						p.card-header-title {{ i }}
						a.card-header-icon
							b-icon( :icon="props.open ? 'angle-down' : 'angle-up'" )
				.card-content
					.content
						ol
							li( v-for='(channel, i) in type' ) {{ channel.name }}
</template>

<script>
export default {
	name: "ServicesTable",
	props: {
		services: {
			type: Array,
			default: null
		},
		types: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			isOpen: null
		}
	},
	methods: {
		deleteService(id) {
			this.$deleteService(id)
				.then(() => this.$emit('updateServices'))
		},
		channels(channels) {
			let result = {}

			if (channels) {
				for (let channel of channels) {
					if (!result[channel.type]) result[channel.type] = []
					result[channel.type].push(channel)
				}
			}

			return result
		}
	}
}
</script>