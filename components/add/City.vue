<template lang="pug">
form.form(
	@submit.prevent='addCity()')
	b-field(
		label="Добавить город")
		b-autocomplete(
			field="name"
			:data='resultCities'
			placeholder="Прим: Челябинск"
			@typing='getCities'
			@select='setCity'
			clearable)
			template(
				slot-scope="props")
				.content
					p.title.is-size-6.has-text-weight-semibold {{ props.option.name }}
					p.subtitle.is-size-7
						span(
							v-for='({ name }, i) in props.option.parents') {{ name }}{{ `${i+1 < props.option.parents.length ? ", " : ""}` }}
	b-field
		button.button.is-primary(
			:class='{ "is-loading": loading }') Добавить
		
</template>

<script>
import debounce from 'lodash/debounce'

export default {
	name: "AddCity",
	data() {
		return {
			resultCities: [],
			city: null,
			loading: false
		}
	},
	methods: {
		getCities: debounce(function (query) {
			this.city = null
			if (query) {
				this.$getCities(query)
					.then(res => this.resultCities = res.results)
			} else {
				this.resultCities = []
			}
		}, 500),
		setCity(option) {
			if (option) {
				this.city = option
			}
		},
		addCity() {
			if (this.city && !this.loading) {
				this.loading = true
				this.$addCity(this.city)
					.then(() => {
						this.loading = false
						this.$emit('added')
					})
					.catch(() => this.loading = false)
			}
			if (!this.city) {
				this.$Snackbar('Сначала выберите город!')
			}
		}
	}
}
</script>