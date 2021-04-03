<template lang="pug">
b-collapse#add_service_type(
	aria-id="form"
	v-model='isOpen')
	template(
		#trigger)
		.pannel-heading(
			role="button"
			aria-controls="form")
			.content
				h4.is-marginless
					span Добавить тип услуги
					b-icon(
						icon="plus"
						size="is-small"
						type="is-primary")
	.collapse-container
		form.form(
			@submit.prevent='addSType')
			b-field(
				label="Название")
				b-input(
					v-model='type.name')
			hr
			b-field(
				:message='!type.icon ? "Для загрузки допускается только .png формат!" : ""'
				type="is-danger")
				template(#label)
					|Загрузите иконку&nbsp;
					b-tooltip(
						type="is-dark" 
						label="Чтобы заменить добавленное изображение просто кликните на него или перетащите новое"
						position="is-right"
						multilined)
						b-icon(
							size="is-small" 
							icon="question-circle")
				canvas#canvas.is-hidden
				b-upload(
					v-model='type.icon'
					@input='createImage'
					drag-drop)
					.wrapper(v-if='!type.icon')
						.file-cta.button.is-primary
							b-icon.file-icon(
								icon="upload")
							span Загрузить
						.content
							p 
								|Перетащи сюда картинку
								br
								|или нажми кнопку для загрузки 
					.images(
						v-else)
						.image
							img#icon_preview(
								:src='iconPreview')
						.image
							img#dark_icon_preview

			b-field(v-if='iconPreview && type.icon')
				b-button(
					type="is-primary"
					@click='deleteImage') Удалить
			hr
			b-field
				button.button Добавить
</template>

<script>
export default {
	name: "AddServiceType",
	data() {
		return {
			isOpen: false,
			type: {},
			iconPreview: null
		}
	},
	methods: {
		addSType() {
			this.$addSType(this.type)
				.then(() => {
					this.$emit('update')
					this.type = null
					this.deleteImage()
				})
		},
		createImage(file) {
			if (file.type !== 'image/png') {
				this.type.icon = null
				return this.$Snackbar("Допускаются только изображения .png формата")
			}
      var reader = new FileReader()

      reader.onload = (e) => {
        this.iconPreview = e.target.result
				setTimeout(() => {
					this.createDarkImage()
				}, 50)
      }
      reader.readAsDataURL(file)
    },
		createDarkImage() {
			let type = this.type
			if (type.icon) {
				let canvas = document.getElementById('canvas'),
						ctx = canvas.getContext('2d'),
						image = document.getElementById('icon_preview')
				
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				ctx.drawImage(image, 0, 0)
				
				let imgd = ctx.getImageData(0, 0, canvas.width, canvas.height),
						pix = imgd.data,
						uniqueColor = [255, 255, 255]

				for (var i = 0, n = pix.length; i < n; i += 4) {
					pix[i] = uniqueColor[0]
					pix[i+1] = uniqueColor[1]
					pix[i+2] = uniqueColor[2]
				}
				ctx.putImageData(imgd, 0, 0)

				canvas = this.trim(canvas)

				let savedImageData = document.getElementById("dark_icon_preview")
				savedImageData.src = null
				canvas.toBlob(blob => {
					this.type.darkIcon = new File([blob], type.icon.name.replace(".png", "_dark.png"), { type: "image/png" })

					let iconBlob = this.type.icon.slice(0, this.type.icon.size, 'image/png'); 
					this.type.icon = new File([iconBlob], this.type.icon.name.replace(".png", "_light.png"), {type: 'image/png'})
				})
				savedImageData.src = canvas.toDataURL("image/png")
			}
		},
		trim(c) {
			var ctx = c.getContext('2d'),
				copy = document.createElement('canvas').getContext('2d'),
				pixels = ctx.getImageData(0, 0, c.width, c.height),
				l = pixels.data.length,
				i,
				bound = {
					top: null,
					left: null,
					right: null,
					bottom: null
				},
				x, y;

			for (i = 0; i < l; i += 4) {
				if (pixels.data[i+3] !== 0) {
					x = (i / 4) % c.width
					y = ~~((i / 4) / c.width)
			
					if (bound.top === null) {
						bound.top = y
					}
					
					if (bound.left === null) {
						bound.left = x
					} else if (x < bound.left) {
						bound.left = x
					}
					
					if (bound.right === null) {
						bound.right = x 
					} else if (bound.right < x) {
						bound.right = x
					}
					
					if (bound.bottom === null) {
						bound.bottom = y
					} else if (bound.bottom < y) {
						bound.bottom = y
					}
				}
			}

			bound.right += 1
			bound.bottom += 1
				
			var trimHeight = bound.bottom - bound.top,
					trimWidth = bound.right - bound.left,
					trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight)
			
			copy.canvas.width = trimWidth
			copy.canvas.height = trimHeight
			copy.putImageData(trimmed, 0, 0)
			
			return copy.canvas
		},
		deleteImage() {
			this.type.icon = null
			this.type.darkIcon = null
			this.iconPreview = null
		}
	}
}
</script>

<style lang="scss" scoped>
.control {
	&.icon {
		border-radius: 50%;
		padding: .5rem;
		box-sizing: content-box;
		&.dark {
			background: #101828;
		}
		img {
			min-width: 2rem;
		}
	}
	.images {
		@include flex(center, flex-start);
		.image {
			padding: 1rem;
			box-sizing: content-box;
			&+.image {
				margin-left: .5rem;
			}
			&:last-of-type {
				background: $dark;
				border-radius: 50%;
			}
			img {
				max-width: 4rem;
			}
		}
	}
}
</style>