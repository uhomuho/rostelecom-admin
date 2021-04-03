<template lang="pug">
#channels
	TopLine( title="Каналы" )
	.tile.is-ancestor
		.tile.is-vertical
			.tile.is-parent
				.tile.is-child.box
					AddChannel(
						@update='getChannels')
			.tile.is-parent
				.tile.is-child.box( v-if='channels && channels.length > 0' )
					TableChannels(
						:channels='channels')
				.tile.is-child.box.is-info(
					v-else)
					.content
						h2.is-marginless.has-text-centered Каналы не найдены
</template>

<script>
export default {
	name: "Channels",
	async asyncData({ $getChannels }) {
		let { channels } = await $getChannels()

		return { channels }
	},
	methods: {
		getChannels() {
			this.$getChannels()
				.then(({ channels }) => this.channels = channels)
		}
	}
}
</script>