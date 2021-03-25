<template lang="pug">
	div
		b-menu
			b-menu-list(
				v-for='({ title, items }, i) in menu'
				:key='i'
				:label='title')
				b-menu-item(
					v-for='({ name, to, icon }, i) in items'
					:class='{ active: isCurrent(to) }'
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
					title: 'Тарификация',
					items: [
						{
							name: 'Услуги',
							to: '/services',
							icon: 'list'
						},
						{
							name: 'Тарифы',
							to: '/tariffs',
							icon: 'cube'
						},
						{
							name: 'Пакеты тарифов',
							to: '/packages',
							icon: 'cubes'
						}
					]
				}
			]
		}
	},
	methods: {
		isCurrent(route) {
			return this.$route.fullPath.includes(route)
		}
	}
}
</script>