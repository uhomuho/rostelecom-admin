export { default as AddCity } from '../../components/add/City.vue'
export { default as AddService } from '../../components/add/Service.vue'
export { default as TableAreas } from '../../components/tables/Areas.vue'
export { default as TablePackages } from '../../components/tables/Packages.vue'
export { default as TableServices } from '../../components/tables/Services.vue'
export { default as TableTariffs } from '../../components/tables/Tariffs.vue'
export { default as TariffsPreview } from '../../components/tariffs/Preview.vue'
export { default as TariffsService } from '../../components/tariffs/Service.vue'
export { default as TariffsView } from '../../components/tariffs/View.vue'
export { default as PackagesTariff } from '../../components/packages/Tariff.vue'
export { default as Aside } from '../../components/Aside.vue'
export { default as Auth } from '../../components/Auth.vue'
export { default as Header } from '../../components/Header.vue'
export { default as TopLine } from '../../components/TopLine.vue'

export const LazyAddCity = import('../../components/add/City.vue' /* webpackChunkName: "components/add-city" */).then(c => c.default || c)
export const LazyAddService = import('../../components/add/Service.vue' /* webpackChunkName: "components/add-service" */).then(c => c.default || c)
export const LazyTableAreas = import('../../components/tables/Areas.vue' /* webpackChunkName: "components/table-areas" */).then(c => c.default || c)
export const LazyTablePackages = import('../../components/tables/Packages.vue' /* webpackChunkName: "components/table-packages" */).then(c => c.default || c)
export const LazyTableServices = import('../../components/tables/Services.vue' /* webpackChunkName: "components/table-services" */).then(c => c.default || c)
export const LazyTableTariffs = import('../../components/tables/Tariffs.vue' /* webpackChunkName: "components/table-tariffs" */).then(c => c.default || c)
export const LazyTariffsPreview = import('../../components/tariffs/Preview.vue' /* webpackChunkName: "components/tariffs-preview" */).then(c => c.default || c)
export const LazyTariffsService = import('../../components/tariffs/Service.vue' /* webpackChunkName: "components/tariffs-service" */).then(c => c.default || c)
export const LazyTariffsView = import('../../components/tariffs/View.vue' /* webpackChunkName: "components/tariffs-view" */).then(c => c.default || c)
export const LazyPackagesTariff = import('../../components/packages/Tariff.vue' /* webpackChunkName: "components/packages-tariff" */).then(c => c.default || c)
export const LazyAside = import('../../components/Aside.vue' /* webpackChunkName: "components/aside" */).then(c => c.default || c)
export const LazyAuth = import('../../components/Auth.vue' /* webpackChunkName: "components/auth" */).then(c => c.default || c)
export const LazyHeader = import('../../components/Header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c)
export const LazyTopLine = import('../../components/TopLine.vue' /* webpackChunkName: "components/top-line" */).then(c => c.default || c)
