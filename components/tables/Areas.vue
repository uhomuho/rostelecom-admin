<template lang="pug">
.areas_table
	b-table(
		:class='{ "parent": !nested }'
		:data='areas'
		ref="table"
		:loading='loading'
		@details-open='row => getDistricts(row, nested)'
		:has-detailed-visible='row => row.type !== "city"'
		detailed)
		b-table-column(
			field="id"
			label="ID"
			v-slot='props') {{ props.row.id }}
		b-table-column(
			field="name"
			label="Название"
			v-slot='props') {{ props.row.shortName }}
		b-table-column(
			field="type"
			label="Тип"
			v-slot='props') {{ getType(props.row.type) }}
		b-table-column(
			field="tariffs"
			label="Тарифы"
			v-slot='props')
			a.tag.is-primary.is-light(
				v-if='props.row.tariffs') Просмотр
		b-table-column(
			field="banners"
			label="Баннеры"
			v-slot='props')
			a.tag.is-primary.is-light(
				v-if='props.row.banners') Просмотр
		template( #detail='props' )
			.content.has-text-centered
				p.is-size-5.has-text-weight-bold {{ props.row.fullName }}
			hr
			TableAreas(
				v-if='nestedAreas[props.row.id]'
				@getDistricts='getDistricts'
				:areas='nestedAreas[props.row.id]'
				:nestedAreas='nestedAreas'
				:loading='false'
				nested)
			b-loading(
				v-else
				:is-full-page='false'
				v-model='loader')
</template>

<script>
export default {
	name: "AreasTable",
	data() {
		return {
			loader: true
		}
	},
	props: {
		areas: Array,
		loading: Boolean,
		sticky: Boolean,
		nested: {
			type: Boolean,
			default: false
		},
		nestedAreas: Array
	},
	methods: {
		getDistricts(row, nested) {
			let params = {
				query: nested ? { regionId: row.region_kladr_id, districtId: row.kladr_id } : { regionId: row.kladr_id },
				id: row.id,
				regionID: nested ? row.region_kladr_id : null,
				nested
			}
			if (row.nested) params = row
			this.$emit('getDistricts', params)
		},
		getType(type) {
			switch(type) {
				case "region":
					return "Область"
				case "district":
					return "Район"
				case "city":
					return "Город"
			}
		}
	}
}
</script>