<template lang="pug">
b-modal(
	v-if='service'
	v-model='isModal'
	:width="600")
	.box
		.content
			h4 {{ service.name }}
		hr
		form.form(
			@submit.prevent='addService')
			b-field(
				label='Значение')
				b-input(
					v-model='service.value')
			hr
			b-field(
				label="Детали услуги")
			b-field( 
				v-for='(item, i) in service.description'
				:key='i'
				grouped )
				.control.is-expanded
					b-input(
						v-model='service.description[i].title')
				.control.is-expanded
					.button.is-danger( @click='service.description.splice(i, 1)' ) Убрать
			b-field
				.button.is-success(@click='service.description.push({ title: null })') Добавить
			hr
			b-field(
				label="Цена")
				b-input(
					v-model='service.price'
					expanded)
				b-input(
					v-model='service.units')
			hr
			b-field(
				v-if='service.connectionType'
				label="Технология подключения")
				b-select(v-model='service.connectionType')
					option(value="xPON")  xPON
					option(value="FTTx")  FTTx
					option(value="xDSL")  xDSL
			hr
			b-field(
				v-if='!service.main'
				label="Отображать услугу на карточке тарифа?")
				b-checkbox(
					v-model='service.common') {{ service.common ? "Да" : "Нет" }}
			hr
			b-field(
				grouped)
				.control
					button.button.is-success Добавить
				.control
					.button.is-warning(@click='removeService') Отменить
</template>

<script>
export default {
	name: "AddService",
	data() {
		return {
			isModal: true
		}
	},
	props: ['service', 'tariff'],
	methods: {
		removeService() {
			this.$emit('removeService')
		},
		addService() {
			this.$emit('addService')
		}
	}
}
</script>

<style lang="scss" scoped>
.control {
	.icon {
		box-sizing: content-box;
		border-radius: 50%;
		padding: .25rem;
		&.dark {
			background: $dark;
		}
		img {
			min-width: 1.5rem;
			max-width: 1.5rem;
		}
	}
}
</style>