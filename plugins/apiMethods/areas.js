export default ({ $Snackbar, $axios, $query }, inject) => {
	inject('getCities', query => {
		return $axios.get(`/areas/new?contentType=region&query=${query}`)
			.then(res => res.data)
	})
	inject('addCity', city => {
		return $axios.post('/areas/add', city)
			.then(res => {
				if (process.client) {
					$Snackbar( res.data.message, 3000, null )
				}
				return true
			})
	})
	inject('getAreas', params => {
		return $axios.get(`/areas?${$query(params)}`)
			.then(res => res.data)
	})
	inject('getArea', id => {
		return $axios.get(`/areas/${id}`)
			.then(res => res.data)
	})
	inject('saveArea', area => {
		return $axios.put('/areas', { area })
			.then(({ data }) => {
				$Snackbar(data.message)
				return true
			})
	})
}