<template lang="pug">
b-collapse(
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
		form.form(@submit.prevent='add(service)')
			b-field(
				label="Название")
				b-input(
					placeholder="Название. Прим: Скорость"
					v-model='service.name'
					expanded)
				b-input(
					placeholder="Значение. Прим: 300 Мбит/с"
					v-model='service.value'
					expanded)
			b-field(
				label="Детали услуги")
			b-field( 
				v-for='(item, i) in service.description'
				:key='i'
				grouped )
				.control.is-expanded
					b-input(
						v-model='service.description[i].title')
				.control.is-expanded
					.button.is-danger( @click='service.description.splice(i, 1)' ) Убрать
			b-field
				.button.is-success(@click='service.description.push({ title: null })') Добавить
			hr
			b-field(
				label="Цена")
				b-input(
					type="number"
					placeholder="Не обязательно, если услуга будет включена в стоимость"
					v-model='service.price'
					expanded)
				b-input(
					v-model='service.units')
			hr
			b-field(
				label="Тип услуги"
				:grouped='selectedType ? true : false')
				.control( v-if='selectedType' )
					img( :src='selectedType.icon' )
				.control
					b-select(
						v-model='selectedType'
						placeholder="Выбрать...")
						option(
							v-for='(type, i) in types'
							:key='i'
							:value='type') {{ type.name }}
			b-field(
				v-if='selectedType && selectedType.hasConnectionType'
				label="Способ подключения")
				b-select(
					v-model='service.connectionType'
					placeholder="Выбрать...")
					option(
						v-for='(type, i) in connectionTypes'
						:key='i'
						:value='type') {{ type }}
			b-field(
				v-if='selectedType && selectedType.hasChannels')
				template(#label)
					|Каналы, входящие в услугу&nbsp;
					b-tooltip(
						type="is-dark" 
						label="Чтобы выбрать несколько каналов или убрать один из выбранных, обязательно зажми ctrl, иначе выделен будет только один канал"
						position="is-right"
						multilined)
						b-icon(
							size="is-small" 
							icon="question-circle")
					span.tag.is-primary( @click='service.channels = channels' ) Выбрать все
				b-select(
					multiple
					v-model='service.channels')
					optgroup(
						v-for='(type, i) in compChannels'
						:key='i'
						:label='i')
						option( 
							v-for='(channel, i) in compChannels[i]'
							:key='i'
							:value='channel' ) {{ channel.name }}
			hr
			b-field
				button.button.is-primary Добавить
</template>

<script>
export default {
	name: "AddCervice",
	props: ['types', 'channels'],
	data() {
		return {
			isOpen: false,
			service: {
				name: "Скорость",
				value: "300 Мбит/с",
				description: [
					{ title: "Скорость просто бешенная" }
				],
				price: 300,
				units: "руб./мес.",
				type: 0,
				customType: null,
				connectionType: null,
				channels: []
			},
			selectedType: null,
			connectionTypes: [ "xPON", "FTTx", "xDSL" ]
		}
	},
	watch: {
		selectedType(type) {
			if (type) {
				this.service.type = type.id
	
				if (!type.hasConnectionType)
					this.service.connectionType = null
				if (type.hasChannels) {
					this.service.channels = this.channels
				} else {
					this.service.channels = []
				}
			}
		},
		service: {
			handler(service) {
				if (!service.description)
					this.service.description = []
			},
			deep: true
		}
	},
	computed: {
		compChannels() {
			let channels = this.channels,
					result = {}

			if (channels) {
				for (let channel of channels) {
					if (!result[channel.type]) result[channel.type] = []
					result[channel.type].push(channel)
				}
			}

			return result
		}
	},
	methods: {
		add(service) {
			this.$addService(service)
				.then(() => {
					this.$emit('update')
					this.setNull()
				})
		},
		setNull() {
			for (let i in this.service) {
				if (i !== 'units') this.service[i] = null
			}
			this.selectedType = null
			this.isOpen = false
		}
	}
}
</script>