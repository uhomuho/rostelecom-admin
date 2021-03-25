export default ({ $axios, isDev, $encodeData, $decodeData, $Snackbar }) => {
	$axios.interceptors.request.use(async config => {
		if (!isDev) {
			config.data = config.data ? { data: await $encodeData(config.data) } : null
		}
    return config
  }, err => {
    return Promise.reject(err)
  })

	$axios.interceptors.response.use(async res => {
		if (!isDev) {
			res.data = await $decodeData(res.data)
		}
    return res
  }, err => {
    return Promise.reject(err)
  })

	$axios.onError(err => {
		if (process.client && err.response) {
			$Snackbar( `Response failed with status <b>${err.response.status}</b>`, 3000, 'is-danger' )
		}
		return console.error(err)
	})
}