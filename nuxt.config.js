export default {
	port: 9000,
	loading: {
		color: "#70f",
	},
	head: {
		title: 'rostelecom-admin',
		htmlAttrs: { lang: 'ru' },
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css' },
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap' },
		]
	},

	build: {
		extend (config, { isDev, isClient }) {
			config.node = {
					fs: 'empty'
			}
		}
	},

	globalName: 'rt_admin',
	globals: {
		id: () => `rt_admin`
	},

	plugins: [
		{ src: '~plugins/encoder' },
		{ src: '~plugins/common' },
		{ src: '~plugins/api' },
		{ src: '~plugins/apiMethods/index' }
	],

	components: {
		dirs: [
			'~/components',
			{ path: '~/components/add', prefix: 'Add' },
			{ path: '~/components/tables', prefix: 'Table' },
			{ path: '~/components/tariffs', prefix: 'Tariffs' },
			{ path: '~/components/packages', prefix: 'Packages' },
		]
	},

	buildModules: [
		'nuxt-compress'
	],
	modules: [
		'@nuxtjs/style-resources',
		'@nuxtjs/axios',
		'@nuxtjs/dayjs',
		'vue-swatches/nuxt',
		['nuxt-lazy-load', {
			directiveOnly: true
		}]
	],

	axios: {
		baseURL: process.env.BACKEND || 'http://localhost:8082'
	},

	css: [
		'~/assets/scss/main.scss'
	],
	styleResources: {
		scss: [ './assets/scss/common/_variables.scss', './assets/scss/common/_mixins.scss' ]
	},

	serverMiddleware: [
		'~/serverMiddleware/redirect.js'
	]
}
