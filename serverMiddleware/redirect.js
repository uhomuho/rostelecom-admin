export default (req, res, next) => {
  const host = req.headers.host
	if (host == 'hui') return res.end()
	next()
}