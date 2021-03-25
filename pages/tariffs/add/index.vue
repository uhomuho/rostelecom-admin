<template lang="pug">
#add_tariff
	TopLine(
		title="Добавить тариф")
	.tile.is-ancestor
		.tile
			.tile.is-parent.is-6
				.tile.is-child.box
					.content
						h4 Состав тарифа
					hr
					form.form(@submit.prevent='createTariff')
						b-field(
							label="Название тарифа")
							b-input(
								v-model='tariff.name')
						hr
						b-field(
							label="Услуги тарифа")
							b-autocomplete(
								field="name"
								:data='resultServices'
								placeholder="Введите название услуги"
								@typing='getServices'
								@select='getService'
								clearable)
								template(
									slot-scope="props")
									p {{ props.option.name }}, {{ props.option.value }}
						.services(
							v-if='tariff.services.length > 0')
							.wrapper
								.card.service(
									v-for='({ name, value, icon, icon_background }, i) in tariff.services'
									:key='i')
									.card-image
										.image-wrapper(
											:style='`background: ${icon_background ? icon_background : icon.includes("_dark") ? "#101828" : ""}`')
											img(
												:src='icon')
									.card-content
										p.has-text-centered
											|{{ name }}
											br
											|{{ value }}
									.card-footer
										.card-footer-item.has-text-danger(
											@click='removeService(i)') Убрать
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
									v-model='buttonColor'
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
						b-field(
							label="Цена")
							b-input(
								v-model='tariff.price'
								expanded)
							b-input(
								v-model='tariff.units')
						hr
						b-field
							button.button.is-primary Создать
			.tile.is-parent.is-6
				.tile.is-child.box
					TariffsPreview(
						:tariff='tariff')
	TariffsService(
		v-if='service'
		:service='service'
		:tariff='tariff'
		@removeService='service = null'
		@addService='addService')
</template>

<script>
import debounce from 'lodash/debounce'

export default {
	name: "AddTariff",
	data() {
		return {
			service: null,
			resultServices: [],
			tariff: {
				name: "Технологии выгоды",
				background: null,
				fontColor: 0,
				buttonColor: '#ff4f12',
				buttonFontColor: 1,
				services: [],
				price: null,
				units: "руб/мес"
			},
			buttonColor: '#ff4f12'
		}
	},
	watch: {
		service() {
			this.isModal = this.service ? true : false
		},
		buttonColor(color) {
			this.tariff.buttonColor = color
		}
	},
	methods: {
		getServices: debounce(function (query) {
			this.service = null
			if (query) {
				this.$getServices(`keyword=${query}`)
					.then(({ services }) => this.resultServices = services)
			} else {
				this.resultServices = []
			}
		}, 500),
		getService(service) {
			if (service) {
				this.$getService(service.id)
					.then(({ service }) => this.service = service )
			}
		},
		addService() {
			this.tariff.services.push(this.service)
			this.service = null
		},
		removeService(i) {
			this.tariff.services.splice(i, 1)
		},
		createTariff() {
			this.$createTariff(this.tariff)
				.then(() => this.$router.push('/tariffs'))
		}
	}
}
</script>

<style lang="scss" scoped>
.services {
	width: 100%;
	max-width: 100%;
	.wrapper {
		@include flex(stretch, flex-start);
		@include _scrollbar();
		padding-bottom: .5rem;
		.service {
			@include flex(center, space-between, column);
			border: 2px dashed $grey;
			border-radius: 4px;
			min-width: 8rem;
			max-width: 9rem;
			padding: .5rem 0 0;
			.image-wrapper {
				padding: 50% 0;
				width: 3rem;
				border-radius: 50%;
				position: relative;
				img {
					width: 90%;
					margin: auto;
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
				}
			}
			.card-content {
				padding: .5rem 1rem;
			}
			.card-footer {
				width: 100%;
				border-top-style: dashed;
				cursor: pointer;
				.card-footer-item {
					padding: .5rem .75rem;
				}
			}
			&+.service {
				margin-left: 1rem;
			}
		}
	}
}
</style>