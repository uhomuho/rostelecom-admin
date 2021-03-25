<template lang="pug">
b-modal(
	v-model='isModal'
	:width='600')
	.box
		.content
			h4 {{ tariff.name }}
		hr
		form.form(@submit.prevent='addTariff')
			b-field(
				label="Цена")
				b-input(
					v-model='tariff.price'
					expanded)
				b-input(
					v-model='tariff.units'
					expanded)
			hr
			b-field.bordered(grouped)
				.control
					label.label Основной фон
					v-swatches(
						:swatches='$swatches()'
						v-model='tariff.background'
						show-fallback
						fallback-input-type="color"
						popover-x="right")
				.control
					label.label Шрифт
					b-switch(
						v-model='tariff.fontColor'
						:true-value='0'
						:false-value='1')
							|{{ tariff.fontColor == 0 ? "Тёмный" : "Светлый" }}
			hr
			b-field.bordered(grouped)
				.control
					label.label Цвет кнопки
					v-swatches(
						:swatches='$swatches()'
						v-model='tariff.buttonColor'
						show-fallback
						fallback-input-type="color"
						popover-x="right")
				.control
					label.label Цвет шрифта кнопки
					b-switch(
						v-model='tariff.buttonFontColor'
						:true-value='0'
						:false-value='1')
							|{{ tariff.buttonFontColor == 0 ? "Тёмный" : "Светлый" }}
			hr
			b-field
				button.button.is-primary Добавить
</template>

<script>
export default {
	name: "PackagesTariff",
	data() {
		return {
			isModal: true,
			buttonColor: this.tariff.buttonColor
		}
	},
	props: ['tariff'],
	methods: {
		addTariff() {
			this.$emit('add')
		}
	}
}
</script>