<template lang="pug">
b-collapse#add_channel(
	aria-id="form"
	v-model='isOpen')
	template(
		#trigger)
		.pannel-heading(
			role="button"
			aria-controls="form")
			.content
				h4.is-marginless
					span Добавить услугу
					b-icon(
						icon="plus"
						size="is-small"
						type="is-primary")
	.collapse-container
		form.form( @submit.prevent='addChannel' )
			b-field(
				label="Название канала")
				b-input(
					v-model='channel.name')
			hr
			b-field
				template(#label)
					|Тип канала&nbsp;
					b-tooltip(
						type="is-dark" 
						label="Введи название типа канала, либо выбери из списка"
						position="is-right"
						multilined)
						b-icon(
							size="is-small" 
							icon="question-circle")
				b-autocomplete(
					field="type"
					v-model='channel.type'
					:data='resultTypes'
					@typing='getTypes'
					@select='getChannel'
					clearable)
					template(
						slot-scope="props")
						p {{ props.option.type }}
			hr
			b-field
				button.button Добавить
</template>

<script>
import debounce from 'lodash/debounce'

export default {
	name: "AddChannel",
	data() {
		return {
			isOpen: true,
			channel: {},
			resultTypes: []
		}
	},
	methods: {
		getTypes: debounce(function(query) {
			this.$getChannelsTypes({ keyword: query })
				.then(({ types }) => this.resultTypes = types)
		}, 500),
		getChannel(channel) {
			if (channel) {
				this.$getChannel(channel.id)
					.then(({ channel }) => {
						this.channel.type = channel.type
						this.channel.color = channel.color
					})
			}
		},
		addChannel() {
			this.$addChannel(this.channel)
				.then(() => {
					this.$emit('update')
					this.channel = {}
				})
		}
	}
}
</script>