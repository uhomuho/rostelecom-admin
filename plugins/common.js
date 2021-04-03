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
				return "Домашний интернет"
			case 1:
				return "Интерактивное ТВ Wink"
			case 2:
				return "Мобильная связь"
			case 3:
				return "Доп. опции"
			case 4:
				return "Оборудование"
			case 6:
				return "Онлайн-кинотеатр Wink"
			case 7:
				return "Умный дом"
			case 8:
				return "Домашний телефон"
		}
	})
	inject('storage', path => {
		return process.env.NODE_ENV == 'development' ? `http://storage.captain.localhost/default/${path}` : `https://storage.rt-provider.ru/default/${path}`
	})
	inject('swatches', () => {
		return ['#101828', '#ff4f12', '#7700FF', '#FFFFFF']
	})

	inject('query', params => {
		let esc = encodeURIComponent
		return params ? Object.keys(params)
			.map(k => esc(k) + '=' + esc(params[k]))
			.join('&') : ""
	})
}