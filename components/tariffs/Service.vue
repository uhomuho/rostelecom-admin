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
				label="Описание")
				b-input(
					type="textarea"
					v-model='service.description')
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
				:label="`Является основной услугой '${ service.type !== 4 ? $getType(service.type) : service.customType }' в тарифе '${ tariff.name }'`")
				b-checkbox(
					v-model='service.main') {{ service.main ? "Да" : "Нет" }}
			b-field(
				v-if='!service.main'
				label="Отображать услугу на карточке тарифа?")
				b-checkbox(
					v-model='service.common') {{ service.common ? "Да" : "Нет" }}
			hr
			b-field(
				grouped)
				template(#label)
					|Цвет иконки&nbsp;
					b-tooltip(
						type="is-dark" 
						label="Фон для светлой иконки добавлен только для видимости"
						position="is-right"
						multilined)
						b-icon(
							size="is-small" 
							icon="question-circle")
				.control.is-flex
					b-switch(
						v-model='service.icon'
						:true-value='service.icon.replace("_light", "_dark")'
						:false-value='service.icon.replace("_dark", "_light")')
						|{{ service.icon.includes("_dark") ? "Светлая" : "Тёмная" }}
				.control
					.icon(
						:class='{ dark: service.icon.includes("_dark") }'
						:style='`background: ${service.icon_background}`')
						img(
							:src='service.icon')
			b-field(
				label="Фон иконки")
				v-swatches(
					:swatches='$swatches()'
					v-model='service.icon_background'
					show-fallback
					fallback-input-type="color"
					popover-x="right")
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