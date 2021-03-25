import Areas from './areas'
import Services from './services'
import Tariffs from './tariffs'
import Packages from './packages'

export default (context, inject) => {
	Areas(context, inject)
	Services(context, inject)
	Tariffs(context, inject)
	Packages(context, inject)
}