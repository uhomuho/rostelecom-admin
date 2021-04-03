export default ({ $axios, $Snackbar, $query }, inject) => {
	inject('createPackage', data => {
		return $axios.post('/packages/create', { package: data })
			.then(({ data }) => {
				$Snackbar(data.message)
				return true
			})
	})
	inject('getPackages', params => {
		return $axios.get(`/packages?${$query(params)}`)
			.then(res => res.data)
	})
	inject('removePackage', id => {
		return $axios.delete(`/packages/${id}`)
	})
}