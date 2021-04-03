<template lang="pug">
b-table#channels_table(
	:data='channels')
	b-table-column(
		field="name"
		label="Название"
		v-slot='props')
		p {{ props.row.name }}
	b-table-column(
		field="type"
		label="Тип канала"
		v-slot='props')
		p {{ props.row.type }}
</template>

<script>
export default {
	name: "ChannelsTable",
	props: ['channels']
}
</script>