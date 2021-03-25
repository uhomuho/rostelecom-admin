export default ({ $axios, $Snackbar }, inject) => {
	inject('addService', service => {
		let formData = new FormData()
		formData.append('files', service.icon)
		formData.append('files', service.darkIcon)
		delete service.icon
		for (let key in service) {
			if (typeof service[key] == 'object') {
				for (let y in service[key]) {
					formData.append(`${key}_${y}`, service[key][y])
				}
			} else {
				formData.append(key, service[key])
			}
		}

		return $axios.post('/services', formData)
			.then(({ data }) => {
				$Snackbar(data.message)
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
		return $axios.post(`/services/${id}`)
	})
}