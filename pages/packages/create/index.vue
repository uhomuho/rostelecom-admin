<template lang="pug">
#create_package
	TopLine(
		title="Создать пакет")
	.tile.is-ancestor
		.tile
			.tile.is-parent
				.tile.is-child.box
					form.form(@submit.prevent='createPackage')
						b-field(
							label="Название пакета (необязательно)")
							b-input(
								v-model='package.name')
						b-field(
							label="Тарифы, входящие в пакет")
							b-autocomplete(
								field="name"
								:data='resultTariffs'
								placeholder="Введите название тарифа"
								@typing='getTariffs'
								@select='getTariff'
								clearable)
								template(
									slot-scope="props")
									p {{ props.option.name }}
						b-field
							.tariffs
								.tariff.box(
									v-for='(tariff, i) in package.tariffs'
									:key='i') 
									.content
										h4 {{ tariff.name }}
									.colors
										.background
											p Фон
											.color(
												:style='`background: ${tariff.background}`')
										.btn
											p Цвет кнопки
											.color(
												:style='`background: ${tariff.buttonColor}`')
									.price.content
										p.is-size-6.has-text-weight-bold {{ tariff.price }} {{ tariff.units }}
									.button.is-danger(
										@click='package.tariffs.splice(i, 1)') Убрать
						b-field
							button.button Создать
	PackagesTariff(
		v-if='tariff'
		:tariff='tariff'
		@add='addTariff')
</template>

<script>
import debounce from 'lodash/debounce'

export default {
	name: "CreatePackage",
	data() {
		return {
			tariff: null,
			resultTariffs: [],
			package: {
				tariffs: []
			}
		}
	},
	methods: {
		getTariffs: debounce(function (query) {
			this.tariff = null
			if (query) {
				this.$getTariffs({ keyword: query })
					.then(({ tariffs }) => this.resultTariffs = tariffs)
			} else {
				this.resultTariffs = []
			}
		}, 500),
		getTariff(tariff) {
			if (tariff) {
				this.$getTariff(tariff.id)
					.then(({ tariff }) => this.tariff = tariff)
			}
		},
		addTariff() {
			this.package.tariffs.push(this.tariff)
			this.tariff = null
		},
		createPackage() {
			this.$createPackage(this.package)
				.then(() => this.$router.push('/packages'))
		}
	}
}
</script>

<style lang="scss" scoped>
.tariffs {
	@include flex(flex-start, flex-start);
	.tariff {
		max-width: 20rem;
		min-width: 20rem;
		&+.tariff {
			margin-left: .5rem;
		}
		.colors {
			@include flex(center, flex-start);
			.background,
			.btn {
				flex: 1;
			}
			p {
				margin-bottom: .5rem;
			}
			.color {
				width: 3rem;
				height: 3rem;
				border: 1px solid $grey;
				border-radius: 4px;
			}
		}
		.price {
			margin-top: 1rem;
		}
	}
}
</style>