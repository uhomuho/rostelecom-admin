import Areas from './areas'
import Services from './services'
import Tariffs from './tariffs'
import Packages from './packages'
import Channels from './channels'

export default (context, inject) => {
	Areas(context, inject)
	Services(context, inject)
	Tariffs(context, inject)
	Packages(context, inject)
	Channels(context, inject)
}