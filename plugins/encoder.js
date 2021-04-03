import cryptoJS from 'crypto-js'
import moment from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'


moment.extend(utc)
moment.extend(timezone)

const encoding = () => {
	return `${moment().tz("Asia/Yekaterinburg").format('DD-HH+mm\\HH/MM/YYYY')}/${moment().tz("Asia/Yekaterinburg").format('YYYY/MM/DD-HH+mm\\HH')}/${moment().tz("Asia/Yekaterinburg").format('MM/YYYY/DD-HH+mm\\HH')}`
}

export default (context, inject) => {
	inject('decodeData', string => {
		return new Promise((resolve, reject) => {
			try {
				if (string) {
					if (typeof string !== 'string') {
						resolve(string)
					} else {
						let bytes  = cryptoJS.AES.decrypt(string, encoding())
						bytes = bytes.toString(cryptoJS.enc.Utf8)
						bytes = bytes && bytes !== '' ? JSON.parse(bytes) : bytes
						resolve(bytes && bytes !== '' ? JSON.parse(bytes) : {})
					}
				} else {
					resolve(null)
				}
			} catch (err) {
				reject(err)
			}
		})
	})

	inject('encodeData', object => {
		return new Promise(( resolve, reject ) => {
			try {
				if (object) {
					object = JSON.stringify(object)
					resolve(cryptoJS.AES.encrypt(object, encoding()).toString())
				} else {
					resolve(null)
				}
			} catch(err) {
				reject(err)
			}
		})
	})
}