export default ({ $axios, $Snackbar, $query }, inject) => {

	inject('addChannel', channel => {
		return $axios.post('/channels', { channel })
			.then(({ data }) => {
				$Snackbar(data.message)
				return true
			})
	})

	inject('getChannels', params => {
		return $axios.get(`/channels?${$query(params)}`)
			.then(res => res.data)
	})

	inject('getChannelsTypes', params => {
		return $axios.get(`/channels/types?${$query(params)}`)
			.then(res => res.data)
	})

	inject('getChannel', id => {
		return $axios.get(`/channels/${id}`)
			.then(res => res.data)
	})
}