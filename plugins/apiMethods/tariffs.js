export default ({ $axios, $Snackbar, $query }, inject ) => {
	inject('createTariff', tariff => {
		return $axios.post('/tariff/create', { tariff })
			.then(({ data }) => {
				$Snackbar(data.message)
				return true
			})
	})
	inject('deleteTariff', id => {
		return $axios.delete(`/tariff/${id}`)
			.then(res => res.data)
	})
	inject('getTariff', id => {
		return $axios.get(`/tariff/${id}`)
			.then(res => res.data)
	})
	inject('getTariffs',  params => {
		return $axios.get(`/tariff?${$query(params)}`)
			.then(res => res.data)
	})

	inject('getTTypes', params => {
		return $axios.get(`/tariff/types?${$query(params)}`)
			.then(res => res.data)
	})
	inject('addTType', type => {
		return $axios.post('/tariff/types', { type })
			.then(({ data }) => {
				$Snackbar(data.message)
				return true
			})
	})
	inject('removeTType', id => {
		return $axios.delete(`/tariff/types/${id}`)
	})
}