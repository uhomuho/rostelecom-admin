export default ({ $axios, $Snackbar, $query }, inject) => {
	inject('addService', service => {
		return $axios.post('/services', { service })
			.then(({ data }) => {
				$Snackbar(data.message)
				return true
			})
	})
	inject('getServices', query => {
		return $axios.get(`/services?${query}`)
			.then(res => res.data)
	})
	inject('getService', id => {
		return $axios.get(`/services/${id}`)
			.then(res => res.data)
	})
	inject('deleteService', id => {
		return $axios.delete(`/services/${id}`)
	})

	inject('getSTypes', params => {
		return $axios.get(`/services/types?${$query(params)}`)
			.then(res => res.data)
	})
	inject('getSType', ({ id, params }) => {
		return $axios.get(`/services/types/${id}?${$query(params)}`)
			.then(res => res.data)
	})
	inject('removeSType', id => {
		return $axios.delete(`/services/types/${id}`)
	})
	inject('addSType', type => {
		let formData = new FormData()
		formData.append('files', type.icon)
		formData.append('files', type.darkIcon)
		formData.append('name', type.name)

		return $axios.post('/services/types', formData)
			.then(({ data }) => {
				$Snackbar(data.message)
				return true
			})
	})
}