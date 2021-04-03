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
							label="Тип тарифа")
							b-select(
								v-model='tariff.type'
								@input='setIcons'
								expanded)
								option(
									v-for='(type, i) in types'
									:key='i'
									:value='type.id') {{ type.name }}
						hr
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
									p {{ sTypes.filter(item => item.id == props.option.type)[0].name }}, {{ props.option.name }} {{ props.option.value ? ", " + props.option.value : "" }}
						.services(
							v-if='tariff.services.length > 0')
							.wrapper
								.card.service(
									v-for='({ name, value }, i) in tariff.services'
									:key='i')
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
									fallback-input-type="color"
									popover-x="right")
							.control
								label.label Шрифт
								b-switch(
									v-model='tariff.fontColor'
									:true-value='0'
									:false-value='1')
										|{{ tariff.fontColor == 0 ? "Тёмный" : "Светлый" }}
						hr( v-if='tariff.type' )
						b-field( v-if='tariff.type' )
							.control.is-expanded
								b-collapse.card(
									:open='false'
									animation="slide")
									template( #trigger='props' )
										.card-header( role="button" )
											p.card-header-title Иконки
											a.card-header-icon
												b-icon(
													:icon='props.open ? "angle-down" : "angle-up"')
									div
										b-field(
											v-for='({ id }, i) in serviceTypes'
											:key='i'
											:label='`Иконка "${tariff.icons[id].typeName}"`')
											.control.is-expanded.padding-left
												b-switch(
													v-model='tariff.icons[id].dark'
													@input='switchIcon($event, id)') 
													|{{ tariff.icons[id].dark ? "Тёмная" : "Светлая" }}
											.control.is-flex
												span Фон:
												v-swatches(
													:swatches='$swatches()'
													v-model='tariff.icons[id].background'
													inline
													fallback-input-type="color"
													popover-x="left"
													@input='switchColor($event, id)')
						hr( v-if='Object.keys(tariff.commonIcons).length > 0' )
						b-field( v-if='Object.keys(tariff.commonIcons).length > 0' )
							.control.is-expanded
								b-collapse.card(
									:open='false'
									animation="slide")
									template( #trigger='props' )
										.card-header( role="button" )
											p.card-header-title Иконки дополнительных услуг
											a.card-header-icon
												b-icon(
													:icon='props.open ? "angle-down" : "angle-up"')
									div
										b-field(
											v-for='({ typeName }, i) in tariff.commonIcons'
											:key='i'
											:label='`Иконка "${typeName}"`')
											.control.is-expanded.padding-left
												b-switch(
													v-model='tariff.commonIcons[i].dark'
													@input='switchCommonIcon($event, i)') 
													|{{ tariff.commonIcons[i].dark ? "Тёмная" : "Светлая" }}
											.control.is-flex
												span Фон:
												v-swatches(
													:swatches='$swatches()'
													v-model='tariff.commonIcons[i].background'
													inline
													fallback-input-type="color"
													popover-x="left"
													@input='switchCommonColor($event, i)')
						hr
						b-field
							.control.is-expanded
								b-collapse.card(
									:open='false'
									animation="slide")
									template( #trigger='props' )
										.card-header( role="button" )
											p.card-header-title Кнопка
											a.card-header-icon
												b-icon(
													:icon='props.open ? "angle-down" : "angle-up"')
									div
										b-field( label="Текст кнопки" )
											b-input(
												v-model='tariff.buttonText')
										b-field.bordered(grouped)
											.control.is-expanded.is-2
												label.label Цвет кнопки
												v-swatches(
													:swatches='$swatches()'
													v-model='buttonColor'
													inline
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
							.control.is-expanded
								b-collapse.card(
									:open='false'
									animation="slide")
									template( #trigger='props' )
										.card-header( role="button" )
											p.card-header-title Флажок
											a.card-header-icon
												b-icon(
													:icon='props.open ? "angle-down" : "angle-up"')
									div
										b-field
											template(#label)
												|Текст флажка&nbsp;
												b-tooltip(
													type="is-dark" 
													label="Если текст введён, то флажок будет отображаться"
													position="is-right"
													multilined)
													b-icon(
														size="is-small" 
														icon="question-circle")
											b-input(
												v-model='tariff.flagText')
										b-field.bordered(grouped)
											.control.is-expanded
												label.label Цвет флажка
												v-swatches(
													:swatches='$swatches()'
													v-model='flagColor'
													inline
													fallback-input-type="color"
													popover-x="right")
											.control
												label.label Цвет шрифта флажка
												b-switch(
													v-model='tariff.flagTextColor'
													:true-value='0'
													:false-value='1')
														|{{ tariff.flagTextColor == 0 ? "Тёмный" : "Светлый" }}
						hr
						b-field(
							label="Цена")
							b-input(
								v-model='tariff.price'
								expanded)
							b-input(
								v-model='tariff.units')
						hr
						b-field(
							label="Является акцией")
							b-checkbox(
								v-model='tariff.isStock') {{ tariff.isStock ? "Да" : "Нет" }}
						hr
						b-field
							button.button.is-primary Создать
			.tile.is-parent.is-6
				.tile.is-child.box
					TariffsPreview(
						v-if='tariff.type'
						:tariff='tariff'
						:types='serviceTypes')
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
				type: 0,
				name: "Технологии выгоды",
				background: null,
				fontColor: 0,
				buttonColor: '#ff4f12',
				buttonText: "Подключить",
				buttonFontColor: 1,
				flagText: null,
				flagColor: '#ff4f12',
				flagTextColor: 1,
				services: [],
				isStock: false,
				price: null,
				units: "руб./мес.",
				type: null,
				icons: {},
				commonIcons: {}
			},
			flagColor: '#ff4f12',
			buttonColor: '#ff4f12'
		}
	},
	async asyncData({ $getTTypes, $getSTypes }) {
		let { types } = await $getTTypes(),
				data = await $getSTypes()

		return { types, sTypes: data.types }
	},
	computed: {
		serviceTypes() {
			return this.tariff.type ? this.types.filter(item => item.id == this.tariff.type)[0].servicesTypes : []
		}
	},
	watch: {
		service() {
			this.isModal = this.service ? true : false
		},
		buttonColor(color) {
			this.tariff.buttonColor = color
		},
		flagColor(color) {
			this.tariff.flagColor = color
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
			this.setCommonIcons()
		},
		removeService(i) {
			this.tariff.services.splice(i, 1)
		},
		createTariff() {
			this.$createTariff(this.tariff)
				.then(() => this.$router.push('/tariffs'))
		},
		setIcons() {
			let tariff = this.tariff
			if (tariff.type) {
				let type = this.types.filter(item => item.id == tariff.type)

				if (type.length > 0) {
					type = type[0].servicesTypes
					this.tariff.icons = {}

					for (let item of type) {
						this.tariff.icons[item.id] = {
							typeName: item.name,
							icon: item.icon,
							background: null,
							dark: false
						}
					}
				}
			}
			this.setCommonIcons()
		},
		setCommonIcons() {
			let tariff = this.tariff
			if (tariff.services.length > 0) {
				let type = this.types.filter(item => item.id == tariff.type)
				if (type.length > 0) {
					type = type[0].servicesTypes

					let ids = type.map(item => item.id)
					let services = this.tariff.services.filter(item => !ids.includes(item.type) && item.common)
					if (services.length > 0) {
						ids = services.map(item => item.type)
						ids = [...new Set(ids)]

						let types = this.sTypes.filter(item => ids.includes(item.id))
						if (types.length > 0) {
							this.tariff.commonIcons = {}

							for (let type of types) {
								this.tariff.commonIcons[type.id] = {
									typeName: type.name,
									icon: type.icon,
									background: null,
									dark: false
								}
							}
						}
					}
				}
			}
		},
		switchIcon(value, index) {
			let icons = this.tariff.icons
			icons[index].dark = value
			if (value) {
				icons[index].icon = icons[index].icon.replace('_light', '_dark')
			} else {
				icons[index].icon = icons[index].icon.replace('_dark', '_light')
			}
			this.tariff.icons = null
			this.tariff.icons = icons
		},
		switchColor(color, index) {
			let icons = this.tariff.icons
			icons[index].background = color
			this.tariff.icons = null
			this.tariff.icons = icons
		},
		switchCommonIcon(value, index) {
			let icons = this.tariff.commonIcons
			icons[index].dark = value
			if (value) {
				icons[index].icon = icons[index].icon.replace('_light', '_dark')
			} else {
				icons[index].icon = icons[index].icon.replace('_dark', '_light')
			}
			this.tariff.commonIcons = null
			this.tariff.commonIcons = icons
		},
		switchCommonColor(color, index) {
			let icons = this.tariff.commonIcons
			icons[index].background = color
			this.tariff.commonIcons = null
			this.tariff.commonIcons = icons
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