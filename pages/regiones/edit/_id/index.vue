<template lang="pug">
#edit_region
	TopLine( :title='`Редактировать ${area.name}`' )
	.tile.is-ancestor
		.tile.is-vertical
			.tile.is-parent
				.tile.is-child.box
					.content
						h5 Прикрепить группу тарифов
					form.form( @submit.prevent='save' )
						b-field(
							label="Введи название или номер группы")
							b-autocomplete(
								:field='searchBy == "keyword" ? "name" : "id"'
								:data='resultPackages'
								v-model='keyword'
								@typing='getPackages'
								@select='setPackage'
								clearable
								expanded)
							//- b-input(
								v-model='keyword'
								expanded)
							b-select(
								v-model='searchBy')
								option( value="keyword" ) Название
								option( value="id" ) Номер
						b-field(
							v-if='package'
							label="Группа тарифов")
							p 
								b {{ package.name }}
								span.delete( @click='removePackage' )
						b-field
							button.button Сохранить
</template>

<script>
import debounce from 'lodash/debounce'

export default {
	name: "EditRegion",
	data() {
		return {
			keyword: null,
			searchBy: 'keyword',
			resultPackages: [],
			package: null
		}
	},
	async asyncData({ $getArea, params }) {
		let { area } = await $getArea(params.id)

		return { area }
	},
	watch: {
		searchBy() {
			this.getPackages(this.keyword)
		}
	},
	methods: {
		getPackages: debounce(function(query) {
			if (query) {
				let params = { [this.searchBy]: query }
				this.$getPackages(params)
					.then(({ packages }) => this.resultPackages = packages)
			}
		}, 500),
		setPackage(pack) {
			this.area.tariffs = pack.id
			this.package = pack
		},
		removePackage() {
			this.area.tariffs = null
			this.package = null
		},
		save() {
			this.$saveArea(this.area)
				.then(() => {
					this.$router.push("/regiones")
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.delete {
	display: inline-block;
	margin-left: .5rem;
}
</style>