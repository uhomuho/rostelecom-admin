<template lang="pug">
b-collapse#add_tariff_type(
	aria-id="form"
	v-model='isOpen')
	template(
		#trigger)
		.pannel-heading(
			role="button"
			aria-controls="form")
			.content
				h4.is-marginless
					span Добавить тип тарифа
					b-icon(
						icon="plus"
						size="is-small"
						type="is-primary")
	.collapse-container
		form.form( @submit.prevent='addTType' )
			b-field( label="Название" )
				b-input(
					v-model='type.name')
			hr
			b-field
				template(#label)
					|Основные типы услуг&nbsp;
					b-tooltip(
						type="is-dark" 
						position="is-right"
						multilined)
						b-icon(
							size="is-small" 
							icon="question-circle")
						template( v-slot:content )
							|Выставлять в том порядке, в котором они должны отображаться в карточке тарифа
							br
							|Чтобы переместить, просто нажми мышкой на нужный тип услуги и перетащи на необходимую позицию
				b-autocomplete(
					field="name"
					:data='resultSTypes'
					placeholder="Введите название услуги"
					@typing='getSTypes'
					@select='getSType'
					clearable)
					template(
						slot-scope="props")
						p( v-if='props.option' ) {{ props.option.id }}. {{ props.option.name }}
			b-field
				draggable( v-model='type.servicesTypes' )
					transition-group.s_types( tag="ol" )
						li.s_type.media( v-for='({ name, icon }, i) in type.servicesTypes' :key='`${i-1}.`' :data-number='i+1' )
							.media-left
								img( :src='icon' )
							.media-content
								p {{ name }}
								.delete( @click='type.servicesTypes.splice(i, 1)' )
			hr
			b-field
				button.button Добавить
</template>

<script>
import debounce from 'lodash/debounce'
import draggable from 'vuedraggable'

export default {
	name: "AddTariffType",
	components: { draggable },
	data() {
		return {
			isOpen: false,
			type: {
				name: null,
				servicesTypes: []
			},
			resultSTypes: []
		}
	},
	methods: {
		getSTypes: debounce(function(query) {
			if (query) {
				this.$getSTypes({ keyword: query })
					.then(({ types }) => {
						this.resultSTypes = types
					})
			}
		}, 500),
		getSType(type) {
			if (type) {
				this.$getSType({ id: type.id })
					.then(({ type }) => {
						this.type.servicesTypes.push(type)
					})
			}
		},
		addTType() {
			this.$addTType(this.type)
				.then(() => {
					this.$emit('update')
					this.isOpen = false
					this.type = { name: null, servicesTypes: [] }
				})
		}
	}
}
</script>

<style lang="scss" scoped>

</style>