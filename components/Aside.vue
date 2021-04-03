<template lang="pug">
	div
		b-menu
			b-menu-list(
				v-for='({ title, items }, i) in menu'
				:key='i'
				:label='title')
				b-menu-item(
					v-for='({ name, to, icon }, i) in items'
					:icon='icon'
					:key='i'
					:label='name'
					tag="nuxt-link"
					:to='to')
</template>

<script>
export default {
	name: "Aside",
	data() {
		return {
			menu: [
				{
					title: 'География',
					items: [
						{
							name: 'Регионы',
							to: '/regiones',
							icon: 'globe'
						}
					]
				},
				{
					title: 'Типы услуг и тарифов',
					items: [
						{
							name: 'Типы услуг',
							to: '/types/services',
							icon: 'screwdriver'

						},
						{
							name: 'Типы тарифов',
							to: '/types/tariffs',
							icon: 'wrench'
						}
					]
				},
				{
					title: 'Тарификация',
					items: [
						{
							name: 'Услуги',
							to: '/services',
							icon: 'list'
						},
						{
							name: 'ТВ Каналы',
							to: '/channels',
							icon: 'tv'
						},
						{
							name: 'Тарифы',
							to: '/tariffs',
							icon: 'cube'
						},
						{
							name: 'Группы тарифов',
							to: '/packages',
							icon: 'cubes'
						}
					]
				}
			]
		}
	}
}
</script>