export default ({ $axios, $Snackbar }, inject ) => {
	inject('createTariff', tariff => {
		return $axios.post('/tariff/create', { tariff })
			.then(({ data }) => {
				$Snackbar(data.message)
				return true
			})
	})
	inject('deleteTariff', id => {
		return $axios.post(`/tariff/delete/${id}`)
			.then(res => res.data)
	})
	inject('getTariff', id => {
		return $axios.get(`/tariff/${id}`)
			.then(res => res.data)
	})
	inject('getTariffs',  params => {
		let esc = encodeURIComponent,
				query = params ? Object.keys(params)
					.map(k => esc(k) + '=' + esc(params[k]))
					.join('&') : ""

		return $axios.get(`/tariff?${query}`)
			.then(res => res.data)
	})
}