import Vue from 'vue'

const components = {
  AddChannel: () => import('../../components/add/Channel.vue' /* webpackChunkName: "components/add-channel" */).then(c => c.default || c),
  AddCity: () => import('../../components/add/City.vue' /* webpackChunkName: "components/add-city" */).then(c => c.default || c),
  AddService: () => import('../../components/add/Service.vue' /* webpackChunkName: "components/add-service" */).then(c => c.default || c),
  AddServiceType: () => import('../../components/add/ServiceType.vue' /* webpackChunkName: "components/add-service-type" */).then(c => c.default || c),
  AddTariffType: () => import('../../components/add/TariffType.vue' /* webpackChunkName: "components/add-tariff-type" */).then(c => c.default || c),
  TableAreas: () => import('../../components/tables/Areas.vue' /* webpackChunkName: "components/table-areas" */).then(c => c.default || c),
  TableChannels: () => import('../../components/tables/Channels.vue' /* webpackChunkName: "components/table-channels" */).then(c => c.default || c),
  TablePackages: () => import('../../components/tables/Packages.vue' /* webpackChunkName: "components/table-packages" */).then(c => c.default || c),
  TableServices: () => import('../../components/tables/Services.vue' /* webpackChunkName: "components/table-services" */).then(c => c.default || c),
  TableServicesTypes: () => import('../../components/tables/ServicesTypes.vue' /* webpackChunkName: "components/table-services-types" */).then(c => c.default || c),
  TableTariffs: () => import('../../components/tables/Tariffs.vue' /* webpackChunkName: "components/table-tariffs" */).then(c => c.default || c),
  TableTariffsTypes: () => import('../../components/tables/TariffsTypes.vue' /* webpackChunkName: "components/table-tariffs-types" */).then(c => c.default || c),
  TariffsPreview: () => import('../../components/tariffs/Preview.vue' /* webpackChunkName: "components/tariffs-preview" */).then(c => c.default || c),
  TariffsService: () => import('../../components/tariffs/Service.vue' /* webpackChunkName: "components/tariffs-service" */).then(c => c.default || c),
  TariffsView: () => import('../../components/tariffs/View.vue' /* webpackChunkName: "components/tariffs-view" */).then(c => c.default || c),
  PackagesTariff: () => import('../../components/packages/Tariff.vue' /* webpackChunkName: "components/packages-tariff" */).then(c => c.default || c),
  Aside: () => import('../../components/Aside.vue' /* webpackChunkName: "components/aside" */).then(c => c.default || c),
  Auth: () => import('../../components/Auth.vue' /* webpackChunkName: "components/auth" */).then(c => c.default || c),
  Header: () => import('../../components/Header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c),
  TopLine: () => import('../../components/TopLine.vue' /* webpackChunkName: "components/top-line" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
