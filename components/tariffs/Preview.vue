<template lang="pug">
#tariff_preview
	.content
		h4 Предпросмотр
	hr
	code
		.box
			.head(
				:class='{ light: tariff.fontColor == 1 }'
				:style='`background: ${tariff.background}`')
				.content
					h3 {{ tariff.name }}
				.media(
					v-if='services.length > 0'
					v-for='(service, i) in services')
					.media-left
						.wrapper(
							:style='`background: ${service && service.icon_background ? service.icon_background : service && service.icon.includes("_dark") ? "#101828" : ""}`')
							img(
								:src='service ? service.icon : "https://dummyimage.com/80x80/000000/fff.png&text=icon"')
					.media-content
						.content
							h5 {{ service ? service.title : result[i] }}
							p.is-inline(v-if='service') {{ service.value }}
			.bottom
				.media(
					v-if='commonServices.length > 0'
					v-for='(service, i) in commonServices')
					.media-left
						.wrapper(
							:style='`background: ${service && service.icon_background ? service.icon_background : service && service.icon.includes("_dark") ? "#101828" : ""}`')
							img(
								:src='service ? service.icon : "https://dummyimage.com/80x80/000000/fff.png&text=icon"')
					.media-content
						.content
							h5 {{ service ? service.title : result[i] }}
							p.is-borderless(
								v-if='service'
								v-html='service.value')
				.price(v-if='tariff.price')
					.value {{ tariff.price }} 
					.units
						span {{ units[0] }}
						span(v-if='units.length > 0') {{ units[1] }}
				.button(
					:style='`background: ${tariff.buttonColor}; border-color: ${tariff.buttonColor}; color: ${tariff.buttonFontColor == 0 ? "#363636" : "#fff"};`') Подключить
				//- pre {{ commonServices }}
</template>

<script>
export default {
	name: "TariffPreview",
	data() {
		return {
			result: ['Домашний интернет', 'Телевидение', 'Мобильная связь', 'Доп. опции', 'Оборудование']
		}
	},
	props: ['tariff'],
	computed: {
		units() {
			let { units } = this.tariff
			units = units.split("/")
			return units
		},
		services() {
			let tariffServices = this.tariff.services
			if (tariffServices.length > 0) {
				let services = tariffServices.filter(item => item.type < 3 && item.main)
				let result = []
				services = services.map(item => {
					result[item.type] = {
						title: this.result[item.type],
						icon: result[item.type] && result[item.type].icon ? result[item.type].icon : item.icon,
						icon_background: result[item.type] && result[item.type].icon_background ? result[item.type].icon_background : item.icon_background,
						value: result[item.type] && result[item.type].value ? `${result[item.type].value}, ${item.value}` : item.value
					}
				})
				return result
			}
			return []
		},
		commonServices() {
			let tariffServices = this.tariff.services
			if (tariffServices.length > 0) {
				let services = tariffServices.filter(item => item.type >= 3 && item.main)
				let result = []
				services = services.map(item => {
					if (item.type !== 5) {
						result[item.type] = {
							title: result[item.type] ? result[item.type].title : this.result[item.type],
							icon: result[item.type] && result[item.type].icon ? result[item.type].icon : item.icon,
							icon_background: result[item.type] && result[item.type].icon_background ? result[item.type].icon_background : item.icon_background,
							value: result[item.type] && result[item.type].value ? `${result[item.type].value}${item.name}, +${item.price}${item.units}<br>` : `${item.name}, +${item.price}${item.units}<br>`
						}
					} else {
						result.push({
							title: item.customType,
							icon: item.icon,
							icon_background: item.icon_background,
							value: `+${item.price}${item.units}`
						})
					}
				})
				result = result.filter(item => item)
				return result
			}
		}
	}
}
</script>

<style lang="scss" scoped>
code {
	font-family: 'Roboto';
	display: block;
	padding: .5rem;
	.box {
		max-width: 25rem;
		margin: 0 auto;
		padding: 0;
		overflow: hidden;
		.head {
			padding: 1.25rem;
			border-bottom: 1px solid rgba($grey, .2);
			&.light {
				* {
					color: #fff!important;
					border-color: rgba(255, 255, 255, .3)!important;
				}
			}
		}
		.bottom {
			padding: 1.25rem;
			.price {
				@include flex(center, flex-end);
				margin: {
					top: 2rem;
					bottom: 2rem;
				}
				.value {
					font-size: 3.5rem;
					font-weight: 500;
					padding-right: .5rem;
				}
				.units {
					@include flex(center, flex-start, column);
					span {
						display: inline-block;
						&+span {
							border-top: 1px solid $dark;
						}
					}
				}
			}
			.button {
				@include flex();
				padding: 1.5rem;
			}
		}
		.media {
			.media-left {
				.wrapper {
					width: 3rem;
					padding: 50% 0;
					border-radius: 50%;
					position: relative;
					img {
						max-width: 90%;
						margin: auto;
						position: absolute;
						top: 0;
						right: 0;
						left: 0;
						bottom: 0;
					}
				}
			}
			.media-content {
				h5 {
					margin-bottom: .25rem;
				}
				p {
					color: $grey;
					display: inline-block;
					border-bottom: 1px dashed rgba($grey, .3);
					position: relative;
				}
			}
			&+.media {
				margin-top: .5rem;
				border-top: unset;
			}
		}
	}
}
</style>