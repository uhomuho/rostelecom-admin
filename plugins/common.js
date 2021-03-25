import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy, {
	materialDesignIcons: false,
  defaultIconPack: 'fas'
})

export default (context, inject) => {
	inject('Snackbar', ( message, duration = 2500, type = 'is-primary', actionText = 'OK', position = 'is-bottom-right' ) => {
		Vue.prototype.$buefy.snackbar.open({ message, duration, type, actionText, position })
	})
	inject('getType', number => {
		switch(number) {
			case 0:
				return "Интернет"
			case 1:
				return "Телевидение"
			case 2:
				return "Мобильная связь"
			case 3:
				return "Доп. опции"
			case 4:
				return "Оборудование"
		}
	})
	inject('storage', path => {
		return process.env.NODE_ENV == 'development' ? `http://storage.captain.localhost/default/${path}` : `${path}`
	})
	inject('swatches', () => {
		return ['#101828', '#ff4f12', '#70f', '#fff']
	})
}