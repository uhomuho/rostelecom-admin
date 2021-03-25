export default ({ $axios, $Snackbar }, inject) => {
	inject('createPackage', data => {
		return $axios.post('/packages/create', { package: data })
			.then(({ data }) => {
				$Snackbar(data.message)
				return true
			})
	})
	inject('getPackages', query => {
		return $axios.get('/packages')
			.then(res => res.data)
	})
}