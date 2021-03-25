export default (req, res, next) => {
  const host = req.headers.host
	if (host == 'rt-admin.rt-provider.ru') return res.end()
	next()
}