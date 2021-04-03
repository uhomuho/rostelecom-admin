<template lang="pug">
#tariff_preview
	.content
		h4 Предпросмотр
	hr
	code
		.box
			//- 
			//- pre {{ types.indexOf(types.filter(item => item.id == 1)[0]) }}
			//- pre {{ types }}
			.head(
				:class='{ light: tariff.fontColor == 1 }'
				:style='`background: ${tariff.background}`')
				.flag#flag( 
					v-if='tariff.flagText'
					:style='`background: ${tariff.flagColor}; color: ${tariff.flagTextColor == 0 ? "#363636" : "#fff"}`' ) {{ tariff.flagText }}
				.content
					h3#title {{ tariff.name }}
				.media(
					v-if='types.length > 0'
					v-for='({ id, name }, i) in types'
					:class='{ single: serviceValue(id).length == 0 }')
					.media-left
						.wrapper(
							:style='`background: ${tariff.icons[id].background ? tariff.icons[id].background : tariff.icons[id].icon.includes("_dark") ? "#101828" : ""}`')
							img(
								:src='tariff.icons[id].icon')
					.media-content
						.content
							h5 {{ name }}
							p.is-inline(v-if='serviceValue(id).length > 0') {{ serviceValue(id) }}
			.bottom
				.media(
					v-if='commonTypes.length > 0'
					v-for='({ id, name, icon }, i) in commonTypes'
					:class='{ single: serviceValue(id).length == 0 }')
					.media-left
						.wrapper(
							:style='`background: ${tariff.commonIcons[id].background ? tariff.commonIcons[id].background : tariff.commonIcons[id].icon.includes("_dark") ? "#101828" : ""}`')
							img(
								:src='tariff.commonIcons[id].icon')
					.media-content
						.content
							h5 {{ name }}
							p.is-inline( v-if='serviceValue(id).length > 0' ) {{ serviceValue(id) }}
				.price(v-if='tariff.price')
					.value {{ tariff.price }} 
					.units
						span {{ units[0] }}
						span(v-if='units.length > 0') {{ units[1] }}
				.button(
					:style='`background: ${tariff.buttonColor}; border-color: ${tariff.buttonColor}; color: ${tariff.buttonFontColor == 0 ? "#363636" : "#fff"};`') {{ tariff.buttonText }}
</template>

<script>
export default {
	name: "TariffPreview",
	data() {
		return {
			commonTypes: []
		}
	},
	props: ['tariff', 'types'],
	watch: {
		tariff: {
			handler() {
				if (this.tariff.flagText) {
					setTimeout(() => {
						let flag = document.querySelector('#flag')
						document.querySelector('#title').style.paddingRight = `${flag.offsetWidth - 30}px`
					}, 100)
				}
				if (this.tariff.services.length > 0) {
					let services = this.tariff.services,
					types = this.types.map(item => item.id)

					services = services.filter(item => !types.includes(item.type) && item.common)

					let ids = services.map(item => item.type)
					if (ids.length > 0) {
						ids = ids.join(',')

						this.$getSTypes({ ids })
							.then(({ types }) => this.commonTypes = types)
					}
				} else {
					this.commonTypes = []
				}
			},
			deep: true
		}
	},
	computed: {
		units() {
			let { units } = this.tariff
			units = units.split("/")
			return units
		}
	},
	methods: {
		serviceValue(id) {
			let services = this.tariff.services,
					result = ''
			services = services.filter(item => item.type == id)
			if (services.length > 0) {
				for (let service of services) {
					if (result.length == 0) 
						result = service.value
					else
						result += `, ${service.value}`
				}
			}
			return result
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
		max-width: 22rem;
		margin: 0 auto;
		padding: 0;
		.head {
			padding: 1.25rem;
			border-bottom: 1px solid rgba($grey, .2);
			position: relative;
			&.light {
				* {
					color: #fff!important;
					border-color: rgba(255, 255, 255, .3)!important;
				}
			}
			.content {
				h3 {
					font-size: 1.25rem;
				}
			}
			.flag {
				font-size: .75rem;
				padding: .1rem 1rem;
				position: absolute;
				right: -12px;
				top: 1.25rem;
				&::before {
					display: block;
					content: "";
					border-style: solid;
					border-width: 12px 12px 0 0;
					border-color: #273a64 transparent transparent transparent;
					position: absolute;
					top: 100%;
					right: 0;
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
			&.single {
				@include flex(center, flex-start);
				.media-content {
					h5 {
						margin-bottom: 0;
					}
				}
			}
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