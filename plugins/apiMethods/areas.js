export default ({ $Snackbar, $axios }, inject) => {
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
		let esc = encodeURIComponent,
				query = params ? Object.keys(params)
					.map(k => esc(k) + '=' + esc(params[k]))
					.join('&') : ""
		return $axios.get(`/areas?${query}`)
			.then(res => res.data)
	})
}