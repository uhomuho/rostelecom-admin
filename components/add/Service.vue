<template lang="pug">
b-collapse(
	aria-id="form"
	v-model='isOpen')
	template(
		#trigger)
		.pannel-heading(
			role="button"
			aria-controls="form")
			.content
				h4.is-marginless
					span Добавить услугу
					b-icon(
						icon="plus"
						size="is-small"
						type="is-primary")
	.collapse-container
		form.form(@submit.prevent='add(service)')
			b-field(
				label="Название")
				b-input(
					placeholder="Название. Прим: Скорость"
					v-model='service.name'
					expanded)
				b-input(
					placeholder="Значение. Прим: 300 Мбит/с"
					v-model='service.value'
					expanded)
			b-field
				b-input(
					v-model='service.description'
					type="textarea"
					placeholder="Описание услуги")
			b-field(
				label="Цена")
				b-input(
					type="number"
					placeholder="Не обязательно, если услуга будет включена в стоимость"
					v-model='service.price'
					expanded)
				b-input(
					v-model='service.units')
			hr
			b-field(
				:message='!service.icon ? "Для загрузки допускается только .png формат!" : ""'
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
					v-model='service.icon'
					@input='createImage'
					drag-drop)
					.wrapper(v-if='!service.icon')
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

			b-field(v-if='iconPreview && service.icon')
				b-button(
					type="is-primary"
					@click='deleteImage') Удалить
			b-field(grouped)
				template(#label)
					|или выберите из стандартных&nbsp;
					b-tooltip(
						type="is-dark" 
						label="Если загружена иконка и выбрана одна из списка, будет добавлена загруженная"
						position="is-right"
						multilined)
						b-icon(
							size="is-small" 
							icon="question-circle")
				b-select(
					v-model='service.iconLink')
					option(
						v-for='({ name, value }, i) in icons'
						:key='i'
						:value='value') {{ name }}
				.control.icon(
					v-if='service.iconLink'
					:class='{ dark: service.iconLink.includes("_dark") }')
					img(:src='service.iconLink')
			hr
			b-field(
				label="Тип услуги")
				b-select(
					v-model='service.type'
					placeholder="Выбрать...")
					option(
						v-for='({ name, value }, i) in types'
						:key='i'
						:value='value') {{ name }}
			b-field(
				label="Название типа услуги"
				v-if='service.type == 5')
				b-input(
					v-model='service.customType')
			hr
			b-field
				button.button.is-primary Добавить
</template>

<script>
export default {
	name: "AddCervice",
	data() {
		return {
			isOpen: false,
			service: {
				name: "Скорость",
				value: "300 Мбит/с",
				description: "Описание услуги",
				price: 300,
				units: "руб/мес",
				type: 0,
				customType: null,
				icon: null,
				darkIcon: null,
				iconLink: null
			},
			iconPreview: null,
			types: [
				{
					name: 'Интернет',
					value: 0
				},
				{
					name: 'Телевидение',
					value: 1
				},
				{
					name: 'Мобильная связь',
					value: 2
				},
				{
					name: 'Дополнительные опции',
					value: 3
				},
				{
					name: 'Оборудование',
					value: 4
				},
				{
					name: 'Другой',
					value: 5
				}
			],
			icons: [
				{
					name: "Интернет",
					value: this.$storage('internet_light.png')
				},
				{
					name: "Телевидение",
					value: this.$storage('tv_light.png')
				},
				{
					name: "Wink",
					value: this.$storage('movie_light.png')
				},
				{
					name: "Мобильные услуги",
					value: this.$storage('mobile_light.png')
				},
				{
					name: "Игры",
					value: this.$storage('gamepad_light.png')
				},
				{
					name: "Палец вверх",
					value: this.$storage('nice_light.png')
				},
				{
					name: "Оборудование",
					value: this.$storage('equip_light.png')
				}
			]
		}
	},
	methods: {
    createImage(file) {
			if (file.type !== 'image/png') {
				this.service.icon = null
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
		deleteImage() {
			this.service.icon = null
			this.service.darkIcon = null
			this.iconPreview = null
		},
		add(service) {
			this.$addService(service)
				.then(() => {
					this.$emit('added')
					this.setNull()
				})
		},
		setNull() {
			for (let i in this.service) {
				if (i !== 'units') this.service[i] = null
			}
			this.isOpen = false
		},
		createDarkImage() {
			let service = this.service
			if (service.icon) {
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
					this.service.darkIcon = new File([blob], service.icon.name.replace(".png", "_dark.png"), { type: "image/png" })

					let iconBlob = this.service.icon.slice(0, this.service.icon.size, 'image/png'); 
					this.service.icon = new File([iconBlob], this.service.icon.name.replace(".png", "_light.png"), {type: 'image/png'})
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
					x = (i / 4) % c.width;
					y = ~~((i / 4) / c.width);
			
					if (bound.top === null) {
						bound.top = y;
					}
					
					if (bound.left === null) {
						bound.left = x; 
					} else if (x < bound.left) {
						bound.left = x;
					}
					
					if (bound.right === null) {
						bound.right = x; 
					} else if (bound.right < x) {
						bound.right = x;
					}
					
					if (bound.bottom === null) {
						bound.bottom = y;
					} else if (bound.bottom < y) {
						bound.bottom = y;
					}
				}
			}
				
			var trimHeight = bound.bottom - bound.top,
					trimWidth = bound.right - bound.left,
					trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
			
			copy.canvas.width = trimWidth;
			copy.canvas.height = trimHeight;
			copy.putImageData(trimmed, 0, 0);
			
			// open new window with trimmed image:
			return copy.canvas;
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