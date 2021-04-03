export default ({ $axios, isDev, $encodeData, $decodeData, $Snackbar }) => {
	$axios.interceptors.request.use(async config => {
		config.data = config.data && Object.keys(config.data).length > 0 ? { data: await $encodeData(config.data) } : config.data
    return config
  }, err => {
    return Promise.reject(err)
  })

	$axios.interceptors.response.use(async res => {
		res.data = await $decodeData(res.data)
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